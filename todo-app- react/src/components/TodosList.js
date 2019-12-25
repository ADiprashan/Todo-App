import React, { Component } from "react";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "../AuthenticationService";
import moment from "moment";
class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null
    };

    this.todoDeleteClicked = this.todoDeleteClicked.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.todoUpdatelicked = this.todoUpdatelicked.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos() {
    TodoDataService.fetchAllTodos(AuthenticationService.getLoggedInUser()).then(
      response =>
        this.setState({
          todos: response.data
        })
    );
  }

  todoDeleteClicked(id) {
    TodoDataService.deleteTodo(
      AuthenticationService.getLoggedInUser(),
      id
    ).then(response => {
      this.setState({
        message: `todo ${id} delete successful`
      });
      this.fetchTodos();
    });
  }

  todoUpdatelicked(id) {
    this.props.history.push(`/todos/${id}`);
  }

  addTodo(id) {
    this.props.history.push(`/todos/-1`);
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="conatiner">
          <table className="table">
            <thead>
              <tr>
                <th>description</th>
                <th>states</th>
                <th>date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                  <td>
                    <button
                      onClick={() => this.todoUpdatelicked(todo.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => this.todoDeleteClicked(todo.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button onClick={this.addTodo} className="btn btn-success">
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodosList;
