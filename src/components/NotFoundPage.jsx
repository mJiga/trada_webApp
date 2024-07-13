import { useAuthContext } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { auth } from "../config/firebase";

const NotFoundPage = () => {
  const { currentUser } = useAuthContext();

  return (
    <div >
      <h1> 404 - Page Not Found</h1>
      {/* add implementation to check if signed in or not to change routing back */}
      <Link to={`${auth.currentUser ? '/home' : '/'}`}>Home</Link>
    </div>
  );
};

export default NotFoundPage;
