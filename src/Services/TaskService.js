// src/Services/TaskService.js
import axios from 'axios';


class TaskService {
  getAllTasks() {
    return axios.get(`https://localhost:7010/GetAllTasks`);
  }
  deleteTask(taskId) {
    return axios.delete(`https://localhost:7010/DeleteTask?id=${taskId}`);
  }
  updateTask(taskId, taskData) {
    return axios.put(`https://localhost:7010/UpdateTaskById?id=${taskId}`, taskData);
  }
  getTaskById(taskId) {
    return axios.get(`https://localhost:7010/GetTaskById?id=${taskId}`);
  }
}

export default new TaskService();
