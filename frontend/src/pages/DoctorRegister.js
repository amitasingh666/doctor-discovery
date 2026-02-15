import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctor, fetchCities, fetchSpecialities } from '../features/doctorSlice';
import './Pages.css';

const DoctorRegister = () => {
   const dispatch = useDispatch();
   const { cities, specialities } = useSelector((state) => state.doctors);
   const [formData, setFormData] = useState({});
   const [file, setFile] = useState(null);

   useEffect(() => { dispatch(fetchCities()); dispatch(fetchSpecialities()); }, [dispatch]);

   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
   const handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();
      Object.keys(formData).forEach(k => data.append(k, formData[k]));
      if (file) data.append('profile_picture', file);
      dispatch(registerDoctor(data)).then(() => alert("Saved!"));
   };

   return (
      <div className="page-container" style={{ maxWidth: '600px' }}>
         <h1>Doctor Registration</h1>
         <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>

            <label>Profile Picture</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-input" />

            <input name="full_name" placeholder="Full Name" onChange={handleChange} className="form-input" />

            <div className="grid-2">
               <input name="age" type="number" placeholder="Age" onChange={handleChange} className="form-input" />
               <select name="gender" onChange={handleChange} className="form-input">
                  <option>Male</option><option>Female</option>
               </select>
            </div>

            <div className="grid-2">
               <input name="email" placeholder="Email" onChange={handleChange} className="form-input" />
               <input name="phone_number" placeholder="Phone" onChange={handleChange} className="form-input" />
            </div>

            <div className="grid-2">
               <select name="city_id" onChange={handleChange} className="form-input">
                  <option>Select City</option>{cities.map(c => <option value={c.id}>{c.name}</option>)}
               </select>
               <select name="speciality_id" onChange={handleChange} className="form-input">
                  <option>Select Speciality</option>{specialities.map(s => <option value={s.id}>{s.name}</option>)}
               </select>
            </div>

            <input name="institute_name" placeholder="Institute" onChange={handleChange} className="form-input" />
            <input name="degree_name" placeholder="Degree (MBBS, MD)" onChange={handleChange} className="form-input" />

            <div className="grid-2">
               <input name="experience_years" type="number" placeholder="Exp (Years)" onChange={handleChange} className="form-input" />
               <input name="consultation_fee" type="number" placeholder="Fee (₹)" onChange={handleChange} className="form-input" />
            </div>

            <button type="submit" className="form-btn">Register Doctor</button>

         </form>
      </div>
   );
};
export default DoctorRegister;