import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { GoogleLogo } from '../../assets/icons/GoogleLogo.jsx';
import { Close } from '../../assets/icons/Close.jsx';
import { HoverBorderGradient } from '../ui/hover-border-gradient';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  
  const navigation = useNavigate();

  const { signIn, googleSignIn } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      setLoading(false);
      navigation('/home');
    } catch(err){
      setError('Unable to sign in');
      console.error(error);
    }
    setLoading(false);
  };
  
  const handleGoogleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await googleSignIn();
      setLoading(false);
      navigation('/home');
    } catch(err){
      setError('Unable to sign in with Google');
      console.error(error);
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
          <span className="text-4xl font-light mb-8">Sign in</span>
        </div>

        <button
            type="submit"
            onClick={handleGoogleSubmit}
            disabled={loading}
            className="flex items-center justify-center w-full border border-transparent font-bold text-white bg-zinc-900 p-2 rounded-lg mb-6  hover:text-white hover:border hover:border-gray-300 hover:bg-zinc-950 duration-300 ease-in-out"
          >
            <GoogleLogo className='h-5 w-5 mr-2'/> Continue with Google
          </button>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <input
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mb-2 text-md w-full p-2 border border-black  rounded-md bg-zinc-900 text-white'
              required
            />
            <input
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mb-2 text-md w-full p-2 border border-black rounded-md bg-zinc-900 text-white'
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
              Need an account?
              <Link to="/signup" className="font-bold text-fuchsia-500 hover:text-fuchsia-700 transition duration-300 ease-in-out"> Let's create one for you</Link>
            </div>
          </form>
        </div>
    </div>
  );
}

export default SignIn;