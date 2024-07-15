import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import { IoIosClose } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [changeForm, setChangeForm] = useState(false);

  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const handleChangeForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setChangeForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp(email, password, name, username);
      navigate('/home');
    } catch (err) {
      setError('Unable to create account');
    }
    setLoading(false);
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4 text-white">
      <div className="relative flex flex-col space-y-6 bg-zinc-950 shadow-2xl rounded-2xl p-6 w-full max-w-md">
        <div className='flex'>
          {changeForm && (
            <MdKeyboardArrowLeft onClick={(e) => {e.preventDefault(); setChangeForm(false)}} className='w-7 h-7 text-gray-400 hover:text-gray-500 transition-all duration-300 ease-in-out cursor-pointer'/>
          )}
          <div className='flex-grow'></div>
          <Link to='/auth'><IoIosClose className="w-7 h-7 text-gray-400 hover:text-gray-500 transition-all duration-300 ease-in-out" /></Link>
        </div>

        <header className="text-center">
          <Link to="/" className="text-lg font-bold hover:text-zinc-400 transition duration-300 ease-in-out">TRADA</Link>
        </header>

        {error && <span className="mb-3 text-center text-red-500 text-xl">{error}</span>}
        
        <div className="text-center">
          <span className="text-4xl font-light">Create Account</span>
        </div>

        <div className="relative overflow-hidden h-[280px]">
          <div className={`absolute w-full transform transition-all duration-500 ease-in-out ${changeForm ? '-translate-x-full' : 'translate-x-0'}`}>
            <form onSubmit={handleChangeForm} className="flex flex-col gap-4 mt-8">
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 text-md w-full p-2 border border-black rounded-md bg-zinc-900 text-white"
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
                containerClassName="rounded-full self-center"
                as='button'
                disabled={loading}
                className="flex items-center space-x-2 px-10 py-1.5 rounded-full text-lg"
                duration={0.5}
              >
                <span>Next</span>
              </HoverBorderGradient>
            </form>
          </div>
          <div className={`absolute w-full transform transition-all duration-500 ease-in-out ${changeForm ? 'translate-x-0' : 'translate-x-full'}`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2 text-md w-full p-2 border border-black rounded-md bg-zinc-900 text-white"
                required
              />
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 text-md w-full p-2 border border-black rounded-md bg-zinc-900 text-white"
                required
              />
              <div className='flex flex-col mt-14 flex-grow'></div>
              <HoverBorderGradient
                containerClassName="rounded-full self-center"
                as='button'
                disabled={loading}
                className="flex items-center space-x-2 px-10 py-1.5 rounded-full text-lg"
                duration={0.5}
              >
                <span>Sign up</span>
              </HoverBorderGradient>
            </form>
          </div>
        </div>

        <div className="text-center text-white-400">
          Already have an account?
          <Link to="/signin" className="font-bold text-fuchsia-500 hover:text-fuchsia-700 transition duration-300 ease-in-out"> Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;