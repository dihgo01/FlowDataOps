// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlowList from './components/FlowList';
import './index.css';
import FlowEditor from './components/FlowEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FlowList />} />
        <Route path="/flows" element={<FlowList />} />
        <Route path="/flow/:id" element={<FlowEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
