import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../api/todo/HelloWorldService";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.getCustomeWelcome = this.getCustomeWelcome.bind(this);
    this.handleSucdessfulResponse = this.handleSucdessfulResponse.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
    this.state = {
      welcomMessge: ""
    };
  }

  getCustomeWelcome() {
    HelloWorldService.executeHelloWorldServiceWithPathVariable("dehi")
      .then(response => this.handleSucdessfulResponse(response))
      .catch(error => this.handleErrorResponse(error));
  }

  handleSucdessfulResponse({ data }) {
    this.setState({
      welcomMessge: data.message
    });
  }

  handleErrorResponse(error) {
    let errorMessage = "";
    if (error.message) errorMessage += error.message;

    if (error.response && error.response.data)
      errorMessage += error.response.data.message;

    this.setState({
      welcomMessge: errorMessage
    });
  }
  render() {
    return (
      <>
        <h1>Welcome</h1>
        <div className="container">
          Welcome dev dehi Manage Todos <Link to="/todos">here</Link>
        </div>
        <div className="container">
          Click here to customize welcome message.
          <button className="btn btn-success" onClick={this.getCustomeWelcome}>
            Get Welcome Message
          </button>
        </div>
        <div className="conatiner">{this.state.welcomMessge}</div>
      </>
    );
  }
}

export default Welcome;
