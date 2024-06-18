import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [task, setTask] = useState(null);

  useEffect(() => {
    console.log('Task ID:', taskId);

    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7010/GetTaskById?id=${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Task Details</h1>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Completed Date:</strong> {task.completedDate ? new Date(task.completedDate).toLocaleString() : 'N/A'}</p>
      <p><strong>User ID:</strong> {task.userID}</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default TaskDetails;
