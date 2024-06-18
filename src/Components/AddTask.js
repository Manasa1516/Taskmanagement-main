import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddTaskForm = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    userId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7010/AddTask', task)
      .then((response) => {
        console.log('Task added successfully:', response.data);
        navigate('/TaskList');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={task.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={task.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={task.status} onChange={handleChange} required>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label>User ID:</label>
          <input type="text" name="userId" value={task.userId} onChange={handleChange} required />
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
