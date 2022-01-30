import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Lists from './features/todo/Lists';
import CreateList from './features/todo/CreateListForm';
import SingleList from './features/todo/SingleList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/create-list" element={<CreateList />} />
        <Route path="/list/:listId" element={<SingleList />} />
      </Routes>
    </div>
  );
}

export default App;
