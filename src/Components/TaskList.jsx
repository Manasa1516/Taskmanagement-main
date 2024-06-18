import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskService from '../Services/TaskService';
import EditTaskModal from './EditTaskModal'; // Import the EditTaskModal component
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    TaskService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleDelete = (taskId) => {
    TaskService.deleteTask(taskId)
      .then(() => {
        setTasks(tasks.filter(task => task.taskID !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleShowDetails = (taskId) => {
    TaskService.getTaskById(taskId)
      .then((response) => {
        navigate(`/taskdetails/${taskId}`);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task.taskID === taskId);
    setSelectedTask(taskToEdit);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (updatedTask) => {
    TaskService.updateTask(updatedTask.taskID, updatedTask)
      .then(() => {
        setTasks(tasks.map(task => (task.taskID === updatedTask.taskID ? updatedTask : task)));
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Task List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Completed Date</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.taskID}>
              <td>{task.taskID}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleString()}</td>
              <td>{task.status}</td>
              <td>{task.completedDate ? new Date(task.completedDate).toLocaleString() : 'N/A'}</td>
              <td>{task.userID}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleShowDetails(task.taskID)}>Details</button>
                <button className="btn btn-warning" onClick={() => handleEdit(task.taskID)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(task.taskID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right' }}>
        <Link to="/add">
          <button className="btn btn-primary" style={{ marginRight: '10px' }}>Add Task</button>
        </Link>
      </div>

      {showEditModal && (
        <EditTaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onSave={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskList;
