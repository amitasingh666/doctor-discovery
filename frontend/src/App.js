import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DoctorListing from './pages/DoctorListing';
import DoctorDetail from './pages/DoctorDetail';
import DoctorRegister from './pages/DoctorRegister';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorListing />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/register" element={<DoctorRegister />} />
      </Routes>
    </Router>
  );
}

export default App;