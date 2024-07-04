import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { TypewriterEffectSmooth } from './ui/type-writer-effect';
import { HoverBorderGradient } from './ui/hover-border-gradient';

function Landing() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('showx');
                } else {
                    entry.target.classList.remove('showx');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hiddenx');
        hiddenElements.forEach((el) => observer.observe(el));
    }, []);

    return (
      <div className="bg-black min-h-screen font-Poppins text-white flex grow flex-col justify-center shadow-lg text-center">
        <header className='hiddenx font-bold text-2xl p-6 fixed top-0 w-full text-center hover:text-zinc-400 transition duration-300 ease-in-out'>
            <Link to='/'>TRADA</Link>
        </header>
        <div className='flex flex-col items-center justify-center flex-grow'>
            <h1 className='hiddenx font-bold text-8xl'>
                TRADING: <span className="text-fuchsia-600">REINVENTED</span>
            </h1>
            <div>
                <p className='hiddenx'>
                    <TypewriterEffectSmooth words={[
                        { text: 'Trade Smart, Trade Together, ', className: 'text-white text-2xl' },
                        { text: 'Powered with AI.', className: 'text-fuchsia-400 text-2xl' }
                    ]}/>
                </p>
            </div>
        <HoverBorderGradient
          containerClassName="hiddenx rounded-full"
          as= {Link}
          to='/auth'
          className="hiddenx flex items-center space-x-2 px-8 py-2 rounded-full text-lg"
          duration={0.5}
        >
          <span>Get Started</span>
        </HoverBorderGradient>
        </div>
        <footer className='hiddenx font-light text-xs mt-auto'>© 2024 GJG & OGC</footer>
    </div>
    )
}

export default Landing;
