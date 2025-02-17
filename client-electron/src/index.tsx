import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // הוספת BrowserRouter
import App from './App'; // טוען את כל האפליקציה
export interface Device {
  id: string;
  name: string;
  status: string;
  cpuUsage?: number;
  ramUsage?: number;
  networkUsage?: number;
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>  {/* הוספת BrowserRouter */}
    <App /> {/* כל הקוד שנמצא ב-App.tsx יופעל כאן */}
  </BrowserRouter>
);