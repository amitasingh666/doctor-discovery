import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDoctorById } from '../features/doctorSlice';
import './Pages.css';

const DoctorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedDoctor } = useSelector((state) => state.doctors);

  useEffect(() => { dispatch(fetchDoctorById(id)); }, [dispatch, id]);

  if (!selectedDoctor) return <div>Loading...</div>;

  return (
    <div className="page-container" style={{ maxWidth: '600px' }}>
      <div className="detail-header">
        <img src={`http://localhost:5000${selectedDoctor.profile_picture_url}`} className="detail-img" />
        <h1>{selectedDoctor.full_name}</h1>
        <div style={{ color: '#F26E21', fontWeight: 'bold' }}>{selectedDoctor.speciality_name}</div>
        <div style={{ color: '#666' }}>{selectedDoctor.city_name} • {selectedDoctor.institute_name}</div>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
        <h3 className="section-title" style={{ marginTop: 0 }}>Details</h3>
        <div className="info-row"><span className="info-label">Degree</span><span className="info-val">{selectedDoctor.degree_name}</span></div>
        <div className="info-row"><span className="info-label">Experience</span><span className="info-val">{selectedDoctor.experience_years} Year+</span></div>
        <div className="info-row"><span className="info-label">Fee</span><span className="info-val">₹{selectedDoctor.consultation_fee}</span></div>
        <div className="info-row"><span className="info-label">Contact</span><span className="info-val">{selectedDoctor.phone_number}</span></div>
      </div>
    </div>
  );
};
export default DoctorDetail;