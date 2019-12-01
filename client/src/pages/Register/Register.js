import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "./style.css";
// import dog from "../SignIn/dog.png";
// import ImageSVG from "./ImageSVG";

class Register extends Component  {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

  this.props.registerUser(newUser, this.props.history); 
  };

  render() {
  const { errors } = this.state;

  return (
      <form noValidate onSubmit={this.onSubmit} className="signup-outer">
          {/* <div className="image-div">
              <ImageSVG style={{width: "80%"}}/>
          </div> */}
          <div className='signin-div'>
              <div id="image-outer">
                  {/* <img className='pup-image' src={dog} alt=''/> */}
              </div>
              <h4 className="welcome-text">Welcome Korgi's New Member !</h4>
                <input className={`input-style ${errors.firstName && "input-error"}`} type="firstName"  placeholder="First Name" name="firstName" 
                  onChange={this.onChange} 
                  value={this.state.firstName} 
                  error={errors.firstName} 
                  id="firstName"
                />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName}</p>
                )}
                <input className="input-style" type="lastName"  placeholder="Last Name" name="lastName" 
                  onChange={this.onChange} 
                  value={this.state.lastName} 
                  error={errors.lastName} 
                  id="lastName"
                />
                {errors.lastName && (
                  <p className="error-text">{errors.lastName}</p>
                )}
                <input className={`input-style ${errors.email && "input-error"}`} type="email" placeholder="Email" name="email" 
                  onChange={this.onChange} 
                  value={this.state.email} 
                  error={errors.email} 
                  id="email"
                />
                {errors.email && (
                  <p className="error-text">{errors.email}</p>
                )}
                <input className="input-style" type="password"  placeholder="Password" name="password" 
                  onChange={this.onChange} 
                  value={this.state.password} 
                  error={errors.password} 
                  id="password"
                />
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              <button className="sign-in sign-up" type="submit" onClick={this.onSubmit}>Sign Up</button>
              <div className="divider-div"/>
              <h6>Just in case...</h6>
              <h5 style={{marginTop: '30px'}}>Already have an account? <Link to={'/login'}>Login</Link></h5>
              <p style={{fontSize: '0.7em', color: '#a9a9a9', bottom: 0, position: 'absolute'}}>Copyright © Korgi Inc 2019</p>
          </div>
      </form>
  );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
