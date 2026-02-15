import { useNavigate } from 'react-router-dom';
import './Components.css';

const DoctorCard = ({ doc }) => {
  const navigate = useNavigate();

  if (!doc) return null;

  const imgUrl = doc.profile_picture_url
    ? `http://localhost:5000${doc.profile_picture_url}`
    : 'https://via.placeholder.com/100';

  return (
    <div className="doctor-card" onClick={() => navigate(`/doctors/${doc.id}`)}>
      <img src={imgUrl} alt={doc.full_name || 'Doctor'} className="card-img" />
      <div className="card-name">{doc.full_name}</div>
      <div className="card-spec">{doc.speciality_name}</div>
      <div className="card-stats">
        <span>⭐ {doc.experience_years} Yrs</span>
        <span>💰 ₹{doc.consultation_fee}</span>
      </div>
      <button className="card-btn">View Profile</button>
    </div>
  );
};

export default DoctorCard;