import axios from "axios";
import { API_URL } from "../../Constants";
class HelloWorldService {
  executeHelloWorldService() {
    return axios.get(`${API_URL}/hello-world`);
  }

  executeHelloWorldServiceWithPathVariable(name) {
    return axios.get(`${API_URL}/hello-world-bean/path-variable/${name}`);
  }
}

export default new HelloWorldService();
