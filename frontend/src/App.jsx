import { Routes, Route } from 'react-router-dom'
import ChatPage from './components/chat/ChatPage.jsx'
import LoginPage from './components/auth/LoginPage.jsx'
import SignupPage from './components/auth/SignupPage.jsx'
import NotFoundPage from './components/common/NotFoundPage.jsx'
import PrivateRoute from './components/chat/PrivateRoute.jsx'
import Header from './components/common/Header.jsx'

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
)

export default App
