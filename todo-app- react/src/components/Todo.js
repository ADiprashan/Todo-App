import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "../AuthenticationService";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD")
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    if (this.state.id === -1) return;

    TodoDataService.getTodo(
      AuthenticationService.getLoggedInUser(),
      this.props.match.params.id
    ).then(response =>
      this.setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
      })
    );
  }

  onSubmit(values) {
    if (this.state.id === -1) {
      TodoDataService.createTodo(AuthenticationService.getLoggedInUser(), {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate
      }).then(() => this.props.history.push("/todos"));
    } else {
      TodoDataService.updateTodo(
        AuthenticationService.getLoggedInUser(),
        this.props.match.params.id,
        {
          id: this.state.id,
          description: values.description,
          targetDate: values.targetDate
        }
      ).then(() => this.props.history.push("/todos"));
    }
  }

  validate(values) {
    let errors = {};

    if (!values.description) {
      errors.description = "Description can not be empty";
    }
    if (!values.targetDate) {
      errors.targetDate = " Date can not be empty";
    }
    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Date is not valid";
    }

    return errors;
  }

  render() {
    let { description, targetDate } = this.state;

    return (
      <div>
        <h2>Todo - {this.props.match.params.id}</h2> <hr />
        <div className="container">
          <Formik
            initialValues={{
              description,
              targetDate
            }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default Todo;
