import React, { Component } from "react";
import AuthenticationService from "../AuthenticationService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "devdehi",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  loginClicked() {
    const { userName, password } = this.state;
    // if (userName === "devdehi" && password === "devdehi") {
    //   AuthenticationService.registerSuccessfulLogin(userName, password);
    //   this.props.history.push("/welcome");
    // } else {
    //   this.setState({
    //     showSuccessMessage: false
    //   });
    //   this.setState({
    //     hasLoginFailed: true
    //   });
    // }
    // AuthenticationService.executeBasicAuthenticationService(userName, password)
    //   .then(() => {
    //     AuthenticationService.registerSuccessfulLogin(userName, password);
    //     this.props.history.push("/welcome");
    //   })
    //   .catch(() => {
    //     this.setState({
    //       showSuccessMessage: false
    //     });
    //     this.setState({
    //       hasLoginFailed: true
    //     });
    //   });

    AuthenticationService.executeJwtAuthenticationService(userName, password)
      .then(response => {
        AuthenticationService.registerSuccessfulLoginForJwt(
          userName,
          response.data.token
        );
        this.props.history.push("/welcome");
      })
      .catch(() => {
        this.setState({
          showSuccessMessage: false
        });
        this.setState({
          hasLoginFailed: true
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/* <ShowInValidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Creddentials</div>
          )}
          {/* <ShowLoginSuccesful
          showSuccessMessage={this.state.showSuccessMessage}
        /> */}
          {this.state.showSuccessMessage && <div>Login successful</div>}
          User Name :
          <input
            type="text"
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange}
          />
          Password :
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className=" btn btn-success" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

// function ShowInValidCredentials({ hasLoginFailed }) {
//   if (hasLoginFailed) {
//     return <div>Invalid Creddentials</div>;
//   } else {
//     return null;
//   }
// }

// function ShowLoginSuccesful({ showSuccessMessage }) {
//   if (showSuccessMessage) {
//     return <div>Login successful</div>;
//   } else {
//     return null;
//   }
// }
export default Login;
