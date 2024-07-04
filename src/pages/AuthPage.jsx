import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useState } from 'react';
import { GoogleLogo } from '../assets/icons/GoogleLogo.jsx';
import { SparklesCore } from "@/components/ui/sparkles";
import { FlipWords } from "@/components/ui/flip-words";

function AuthPage() {
  const navigation = useNavigate();
  const { googleSignIn } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await googleSignIn();
      setLoading(false);
      navigation('/home');
    } catch (err) {
      setError('Unable to sign in with Google');
      console.error(error);
    }
    setLoading(false);
  };
  // add signout
  const words = ["strong", "powerful", "profitable"];

  return (
    <div className="font-Poppins text-white bg-black p-6 flex flex-col h-screen">
      <header className="text-center hover:text-zinc-400 transition duration-300 ease-in-out">
        <Link to="/" className="text-lg font-bold">TRADA</Link>
      </header>

      <div className="relative flex-grow flex">
        <div className="flex items-center justify-center flex-grow ml-8">
          <div className="relative">
            <div className="h-[40rem] m-auto w-full dark:bg-black bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <p className="text-3xl sm:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b text-white py-8">
                  Build 
                <FlipWords words={words} className="text-fuchsia-500" /> <br />
                stock portfolios <br /> with our AI Tech
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex-grow flex items-center">
          <div className="flex flex-col items-center justify-center ml-52">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.2}
              maxSize={1}
              particleDensity={50}
              className="w-full h-full absolute inset-0 z-0"
              particleColor="#FFFFFF"
            />

            <div className="relative z-10 flex flex-col items-center space-y-4">
              <div className="m-4">
                <span className="text-7xl font-light">
                  Get Started
                </span>
              </div>

              <div className="m-4">
                <span className="font-light">
                  Join the Trada community
                </span>
              </div>

              <div className="m-4">
                <button
                  type="submit"
                  onClick={handleGoogleSubmit}
                  disabled={loading}
                  className="flex items-center justify-center w-full border border-zinc-800 font-bold px-8 text-white p-2 rounded-full mb-6 hover:text-white hover:border hover:border-gray-300 hover:bg-zinc-900 duration-300 ease-in-out"
                >
                  <GoogleLogo className='h-6 w-6 mr-2' /> Continue with Google
                </button>
                <Link to='/signup' className="flex items-center justify-center w-full border border-zinc-800 font-bold px-8 text-white p-2 rounded-full mb-6 hover:text-white hover:border hover:border-zinc-800 hover:bg-fuchsia-600 duration-300 ease-in-out">
                  Create Account
                </Link>
                <Link to='/signin' className="flex items-center justify-center w-full border border-zinc-800 font-bold px-8 text-white p-2 rounded-full mb-6 hover:text-white hover:border hover:border-zinc-800 hover:bg-fuchsia-600 duration-300 ease-in-out">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
