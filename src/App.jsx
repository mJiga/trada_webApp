import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './components/NotFoundPage';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import HomePage from './pages/HomePage';
import MainLayout from './pages/MainLayout';
import TradePage from './pages/TradePage';
import SimulatorPage from './pages/SimulatorPage';
import ProfilePage from './pages/ProfilePage';
import { FirestoreProvider } from './contexts/FirestoreContext';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage/>,
      errorElement: <NotFoundPage/>
    },
    {
      path: '/auth',
      element: <AuthPage/>,
      errorElement: <NotFoundPage/>
    },
    {
      path: '/signup',
      element: <SignUp/>,
      errorElement: <NotFoundPage/>
    },
    {
      path: '/signin',
      element: <SignIn/>,
      errorElement: <NotFoundPage/>
    },
    {
      // add changing home page depending on auth status
      path: '/home',
      element: (
        <MainLayout>
          <HomePage/>
        </MainLayout>
      ),
      errorElement: <NotFoundPage/>
    },
    {
      path: '/simulator',
      element: (
        <MainLayout>
          <SimulatorPage/>
        </MainLayout>
      ),
      errorElement: <NotFoundPage/>
    },
    {
      path: '/trade',
      element: (
        <MainLayout>
          <TradePage/>
        </MainLayout>
      ),
      errorElement: <NotFoundPage/>
    },
    {
      path: '/profile',
      element: (
        <MainLayout>
          <ProfilePage/>
        </MainLayout>
      ),
      errorElement: <NotFoundPage/>
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ]);
  return (
    <>
      <AuthProvider>
        <FirestoreProvider>
          <RouterProvider router={ router }/>
        </FirestoreProvider>
      </AuthProvider>
    </>
  )
}

export default App
