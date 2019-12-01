import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './style.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import dog from './dog.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to about when they login
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div className="signin-outer" style={{ fontFamily: 'Gloria Hallelujah' }}>
        <div className="image-div">
          <div id="theimage" />
        </div>
        <form noValidate onSubmit={this.onSubmit} className='signin-div'>
        <containter-top>
          <div id="image-outer">
            <img className='pup-image' src={dog} alt='' />
          </div>
          <h4 className="welcome-text" style={{ fontFamily: 'Gloria Hallelujah', fontSize: '50px'}}>Welcome Back!</h4>
        </containter-top>
          <input 
            className="input-style" 
            type="email"  
            placeholder="Email" 
            name="email" 
            id="email" 
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />
          {errors.email && (
            <p className="error-text">{errors.email}</p>
          )}
          <input 
            className="input-style" 
            type="password"  
            placeholder="Password" 
            name="password" 
            id="password" 
            value={this.state.password} 
            onChange={this.onChange}
            error={errors.password}
          />
          {errors.password && (
            <p className="error-text">{errors.password}</p>
          )}
          <button className="sign-in" onClick={this.onSubmit}>Enter</button>
          <div className="divider-div"/>
          <h6>Just in case...</h6>
          <h5 style={{marginTop: '30px'}}>Don't have an account? <Link to={'/register'}>Create one</Link></h5>
          <p style={{fontSize: '0.7em', color: '#a9a9a9', bottom: 0, position: 'absolute'}}>Copyright © Korgi Inc 2019</p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
