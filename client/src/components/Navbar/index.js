import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isMenuShown: false,
            isSmallScreen: false
        };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize = () => {
        this.setState({ isSmallScreen: window.innerWidth < 530 });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
    };

    onHomeButtonClick = e => {
        e.preventDefault();
        this.props.history.push("/");
    };

    onShowMenuClick = e => {
        console.log(this.state.isSmallScreen);
      this.setState({
          isMenuShown: !this.state.isMenuShown
      })
    };
    
    render() {
        return (
            <nav className="navbar">
                <button style={{borderWidth: 0, backgroundColor: "white", width: "50px"}}>
                    <img id="home-image" src="https://image.flaticon.com/icons/svg/884/884183.svg" alt="Main page" onClick={this.onHomeButtonClick}/>
                </button>

                <button className="hamburger-menu" style={{borderWidth: 0, backgroundColor: "white", width: "50px"}}>
                    <img id="home-image" src="https://image.flaticon.com/icons/svg/883/883806.svg" alt="Main page" onClick={this.onShowMenuClick}/>
                </button>

                {/*// If user is authenticated then show home, post*/}
                {this.props.auth.isAuthenticated && (
                    <ul id="menu"
                        style={{height: `${this.state.isSmallScreen ? (this.state.isMenuShown ? "auto" : 0) : "auto"}`,
                            visibility: `${this.state.isSmallScreen ? (this.state.isMenuShown ? "visible" : "hidden") : "visible"}`}}>
                        <li>
                            <Link to="/"
                                className={
                                    window.location.pathname === "/"
                                    ? "nav-link active"
                                    : "nav-link"
                            }>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/post"
                                className={
                                    window.location.pathname === "/post"
                                    ? "nav-link active"
                                    : "nav-link"
                            }> 
                                Post   
                            </Link>
                        </li>
                        <li style={{ float:"right" }}>
                            <Link to="/"
                                onClick={this.onLogoutClick}
                                className={
                                    window.location.pathname === "/"
                                    ? "nav-link active"
                                    : "nav-link"
                            }>
                                Log Out
                            </Link>
                        </li>
                    </ul>
                )}

                {/*// If user isn"t authenticated*/}
                {!this.props.auth.isAuthenticated && (
                    <ul id="menu">
                        <li>
                            <Link to="/"
                                className={
                                    window.location.pathname === "/"
                                    ? "nav-link active"
                                    : "nav-link"
                            }>
                                Home
                            </Link>
                        </li>
                        <li style={{ float:"right" }}>
                            <Link to="/login"
                                className={
                                    window.location.pathname === "/login"
                                    ? "nav-link active"
                                    : "nav-link"
                            }>
                                Log In
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(withRouter(Navbar));
