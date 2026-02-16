import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTopDoctors, fetchCities, fetchSpecialities } from '../features/doctorSlice';
import DoctorCard from '../components/DoctorCard';
import './Pages.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topDoctors, cities, specialities } = useSelector((state) => state.doctors);

  // Separate State for Name Search
  const [nameSearch, setNameSearch] = useState('');

  // Separate State for Filters
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');

  useEffect(() => {
    dispatch(fetchTopDoctors());
    dispatch(fetchCities());
    dispatch(fetchSpecialities());
  }, [dispatch]);

  // 1. Search by Name Only
  const handleNameSearch = () => {
    if (!nameSearch.trim()) return; // Don't search empty string
    navigate(`/doctors?search=${nameSearch}`);
  };

  // 2. Search by Filters Only (City + Speciality)
  const handleFilterSearch = () => {
    if (!selectedCity && !selectedSpec) {
      alert("Please select at least one filter!");
      return;
    }
    navigate(`/doctors?city=${selectedCity}&speciality=${selectedSpec}`);
  };

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Find Your Expert Doctor</h1>

      <div className="hero-box" style={{ maxWidth: '600px', margin: '0 auto 20px' }}>
        <input
          className="hero-input"
          placeholder="Search Doctor by Name..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <button className="hero-btn" onClick={handleNameSearch}>
          Search Name
        </button>
      </div>

      <div className="hero-box" style={{ maxWidth: '800px', margin: '0 auto 40px', background: '#f8f9fa' }}>

        <select
          className="hero-input"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map(c => (
            <option key={c.id} value={c.name}> {c.name} </option>
          ))}
        </select>

        <select
          className="hero-input"
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
        >
          <option value="">Select Speciality</option>
          {specialities.map(s => (
            <option key={s.id} value={s.name}> {s.name} </option>
          ))}
        </select>

        <button className="hero-btn" onClick={handleFilterSearch} style={{ background: '#101828' }}>
          Find Doctor
        </button>
      </div>

      <div className="section-title">Specialities</div>
      <div className="pills-row">
        {specialities.map(s => (
          <button key={s.id} className="pill-btn" onClick={() => navigate(`/doctors?speciality=${s.name}`)}>{s.name}</button>
        ))}
      </div>

      <div className="section-title">Most Searched Doctors</div>
      <div className="pills-row">
        {topDoctors.map(doc => <DoctorCard key={doc.id} doc={doc} />)}
      </div>

    </div>
  );
};

export default Home;