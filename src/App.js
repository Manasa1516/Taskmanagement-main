import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTaskForm from './Components/AddTask';
import TaskList from './Components/TaskList';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/AddUser'; // Assuming Register component is in a file named Register.js
import TaskDetails from './Components/TaskDetails';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userData) => {
    setLoggedInUser(userData);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="App">
      <Router>
      <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Login onLogin={handleLogin} />} />
            <Route path='/TaskList' element={<TaskList user={loggedInUser} onLogout={handleLogout} />} />
            <Route path="/taskdetails/:taskId" element={<TaskDetails />} />
            <Route path='/add' element={<AddTaskForm user={loggedInUser} />} />
            <Route path='/update/:id' element={<AddTaskForm user={loggedInUser} />} />
            <Route path='/delete/:id' element={<TaskList user={loggedInUser} />} />
            <Route path='/register' element={<Register />} /> // Register route
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
