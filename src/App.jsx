import Navbar from './components/Navbar';
import Home from './pages/Home';

/**
 * App Root Component
 *
 * Assembles the layout shell (Navbar) and page content.
 * When routing is added later, Home can be swapped via a router.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}
