
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext.jsx';
import DebugRollbar from './DebugRollbar.jsx';

const Header = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('header.brand')}
        </Navbar.Brand>
        <DebugRollbar />
        {user && (
          <Button variant="primary" onClick={handleLogout}>
            {t('header.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header
