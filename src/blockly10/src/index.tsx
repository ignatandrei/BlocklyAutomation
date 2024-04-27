import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './Components/GUI/NotFound';
import About from './Components/GUI/about';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <BrowserRouter>
     <Routes>
        <Route path="/blocklyAutomation" element={<App />} />
        <Route path="/blocklyAutomation/automation/loadexample/:idBlock" element={<App />} />
        <Route path="/blocklyAutomation/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      {/* <App /> */}
    </BrowserRouter>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
