import React from 'react'
import Spinner from '../Spinner/Spinner';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isActive: false,
      failedmessage: ''
    }
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  onUserChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onSubmitRegister = () => {
    this.setState({isActive:true});
    fetch('https://pacific-anchorage-53440.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(res=>res.json())
    .then(user =>{
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home')
      }
      else {
        this.setState({isActive:false});
        this.setState({failedmessage:"one or both fields are empty"})
      }
    });
  } 
 
  render() {
    return (
      <main className="pa4 pb3 black-80 br3 ba shadow-5 b--black-10  bg-white-10 mt6 mb2 w-100 w-70-m w-30-l mw6 center ">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw3 ph0 mh0">Register</legend>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="user">User</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white mw5 w-100" type="text" name="user" id="user" autoComplete="off" required  onChange={this.onUserChange} />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white mw5 w-100" type="password" name="password" id="password" required onChange={this.onPasswordChange} />
            </div>
          </fieldset>
          <div className="relative flex items-center justify-center">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onSubmitRegister} />
            <Spinner isActive={this.state.isActive}/>
          </div>
          <p className="f6">{this.state.failedmessage}</p>
        </div>
      </main>
    );
  }
}

export default Register;