import axios from "axios";
import { JPA_API_URL } from "../../Constants";
const TODO_URL = `${JPA_API_URL}/users`;

class TodoDataService {
  fetchAllTodos(username) {
    return axios.get(`${TODO_URL}/${username}/todos`);
  }

  getTodo(username, id) {
    return axios.get(`${TODO_URL}/${username}/todos/${id}`);
  }

  deleteTodo(username, id) {
    return axios.delete(`${TODO_URL}/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    return axios.put(`${TODO_URL}/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo) {
    return axios.post(`${TODO_URL}/${username}/todos`, todo);
  }
}

export default new TodoDataService();
