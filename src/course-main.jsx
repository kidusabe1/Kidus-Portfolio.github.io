import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CoursePage from './components/course/CoursePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoursePage />
  </StrictMode>,
);
