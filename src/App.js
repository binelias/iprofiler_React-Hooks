import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';


// const initialState = {
//   input: '',
//   box: [],
//   route: 'login',
//   user: {
//     id: '',
//     name: '',
//     email: '',
//     entries: 0,
//     joined: ''
//   }
// };
// const { useGlobalState } = createGlobalState(initialState);

// class App extends Component {
//   constructor() {
//     super();
//     this.state = initialState;
//   }
function App() {
  const [input, setInput] = useState('');
  const [box, setBoxes] = useState([]);
  const [isLoggedIn, setLogIn] = useState(false);
  const [isProfileOpen, setProfile] = useState(false);
  const [route, setRoute] = useState('login');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: ''
  });
  

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  };

  const calculateFaceLocation = (data) => {
    const faces = [];
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    for (let i = 0; i < data.outputs[0].data.regions.length; i++) {
    const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
    faces.push({
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    });
  }
  return faces;
};

  // const displayFaceBox = (box) => {
  //   setBoxes(box); 
  // };

  //input property of the app
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    fetch('https://fast-ravine-77412.herokuapp.com/imageurl/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input
      })
    })
    
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://fast-ravine-77412.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response =>  response.json())
        .then(count => {
          setUser(Object.assign({...user, entries: count}));
        });
      }
      setBoxes(calculateFaceLocation(response));
    })
    .catch(error => console.log("error", error));
  };

  const onRouteChange = (route) => {
    if (route === 'login') {//login page
      setLogIn(false);
      setInput('');
      setBoxes([]);
    }else if(route === 'home') {
      setLogIn(true);
    }
    setRoute(route);
  };

  const toggleModal = () => setProfile((prevState) => !prevState);

  return (
    <div className='App'>
      <Navigation  isLoggedIn={isLoggedIn} onRouteChange={onRouteChange} toggleModal={toggleModal}/>
      {isProfileOpen &&
        <Modal>
          <Profile isProfileOpen={isProfileOpen} toggleModal={toggleModal} loadUser ={loadUser} user={user}/>
        </Modal>
      }
      { route === 'home' 
        ? <div>
            <Logo />
            <Rank 
            name={user.name} 
            entries={user.entries} />
            <ImageLinkForm 
            onInputChange = {onInputChange}
            onButtonSubmit = {onButtonSubmit}/>
            <FaceRecognition 
            box= {box} 
            imageUrl = {input}/>
          </div>
        : (
          route === 'login'
          ? <Login loadUser={loadUser} onRouteChange={onRouteChange}/>
          : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        )
      }
    </div>
  );
}

export default App;
