import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './components/chat/ChatPage.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import NotFoundPage from './components/common/NotFoundPage.jsx';
import PrivateRoute from './components/chat/PrivateRoute.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

