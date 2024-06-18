import React, { useState } from 'react';
import axios from 'axios';

const GetTaskById = () => {
  const [taskId, setTaskId] = useState('');
  const [task, setTask] = useState(null);

  const fetchTaskById = async () => {
    try {
      const response = await axios.get(`https://localhost:7010/GetTaskById?id=${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task by ID:', error);
    }
  };

  return (
    <div>
      <h2>Get Task By ID</h2>
      <label htmlFor="taskId">Enter Task ID:</label>
      <input
        type="number"
        id="taskId"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button onClick={fetchTaskById}>Fetch Task</button>
      
      {task && (
        <div>
          <h3>Task Details:</h3>
          <p>Task ID: {task.taskID}</p>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Status: {task.status}</p>
          <p>Created Date: {task.createdDate}</p>
          <p>Completed Date: {task.completedDate}</p>
          <p>User ID: {task.userID}</p>
          {task.user && (
            <div>
              <h4>User Details:</h4>
              <p>User ID: {task.user.userID}</p>
              <p>Username: {task.user.username}</p>
              <p>Email: {task.user.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetTaskById;
