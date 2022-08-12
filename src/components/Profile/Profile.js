import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.user.name,
      age: props.user.age,
      pet: props.user.pet
    }
  }
  
  onFormChange = (event) => {
    this.setState({name: event.target.value})
  }

  render() {
    const {user, toggleModal} = this.props;
    return (
      <div className="profile-modal">
        <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
          <main className='pa4 w-90'>
            <img
              src="https://raw.githubusercontent.com/binelias/binelias.github.io/main/assets/profile.png"
              className="br-100 pa1 ba b--black-10 h3 w3" alt="http://tachyons.io/img/logo.jpg"/>
            <h1>{this.state.name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr />
  
            <label className="mt2 fw6" htmlFor='user-name'>Name:</label>
            <input 
              onChange={this.onFormChange}
              className="pa2 ba w-100" 
              placeholder={this.state.name}
              type="text"
              id='user-name'/>
            <label className="mt2 fw6" htmlFor='user-age'>Age:</label>
            <input 
              onChange={this.onFormChange}
              className="pa2 ba w-100" 
              placeholder={this.state.age}
              type="text"
              id='user-age'/>
            <label className="mt2 fw6" htmlFor='user-pet'>Pet:</label>
            <input 
              onChange={this.onFormChange}
              className="pa2 ba w-100" 
              placeholder={this.state.pet}
              type="text"
              id='user-pet'/>
  
            <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <button 
                className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
                Save
              </button>
              <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </main>
          <div className='modal-close' onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
