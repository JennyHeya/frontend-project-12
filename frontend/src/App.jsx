// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import ChatPage from './components/chat/ChatPage.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import NotFoundPage from './components/common/NotFoundPage.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<ChatPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
