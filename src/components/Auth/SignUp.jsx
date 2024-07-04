import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { Close } from '../../assets/icons/Close.jsx';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    // add comparing with e=mail database to check for dupes
    // add username implementation with firestore
    try {
      await signUp(email, password);
      navigate('/home');
    } catch (err) {
      setError('Unable to create account');
    }
    setLoading(false);
  };

  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4 text-white">
      <div className="relative flex flex-col space-y-6 bg-zinc-950 shadow-2xl rounded-2xl p-6 w-full max-w-md">

        <Link to='/auth'><Close color={hovered ? 'fuchsia' : '#e8eaed'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}/></Link>
        <header className="text-center hover:text-zinc-400 transition duration-300 ease-in-out">
          <Link to="/" className="text-lg font-bold">TRADA</Link>
        </header>

        {error && <span className="mb-3 flex flex-col items-center text-red-500 text-xl">{error}</span>}
        
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light mb-8">Create Account</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 text-md w-full p-2 border border-black  rounded-md bg-zinc-900 text-white"
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 text-md w-full p-2 border border-black rounded-md bg-zinc-900 text-white"
            required
          />
          <input
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 text-md w-full p-2 border border-black rounded-md bg-zinc-900 text-white"
            required
          />
          <HoverBorderGradient
            containerClassName="rounded-full"
            as= 'button'
            disabled={loading}
            className="flex items-center space-x-2 px-10 py-1.5 rounded-full text-lg"
            duration={0.5}
          >
            <span>Sign up</span>
          </HoverBorderGradient>

          <div className="text-center text-white-400">
            Already have an account?
            <Link to="/signin" className="font-bold text-fuchsia-500 hover:text-fuchsia-700 transition duration-300 ease-in-out"> Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
