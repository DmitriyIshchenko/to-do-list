import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Lists from './features/todo/Lists';
import CreateList from './features/todo/CreateListForm';
import SingleList from './features/todo/SingleList';
import AddTaskForm from './features/todo/AddTaskForm';
import EditTaskForm from './features/todo/EditTaskForm';
import Error from './features/todo/Error';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/create-list" element={<CreateList />} />
        <Route path="/:listId" element={<SingleList />} />
        <Route path="/:listId/new-task" element={<AddTaskForm />} />
        <Route path="/:listId/:taskId/edit" element={<EditTaskForm />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
