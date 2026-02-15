/* src/pages/DoctorListing.js */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors, fetchCities, fetchSpecialities, resetList } from '../features/doctorSlice';
import DoctorCard from '../components/DoctorCard';
import './Pages.css';

const DoctorListing = () => {
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();

   const { list, cities, specialities } = useSelector((state) => state.doctors);

   const [search, setSearch] = useState(searchParams.get('search') || '');
   const [city, setCity] = useState(searchParams.get('city') || '');
   const [speciality, setSpeciality] = useState(searchParams.get('speciality') || '');
   const [page, setPage] = useState(1);

   useEffect(() => {
      dispatch(fetchCities());
      dispatch(fetchSpecialities());

      // Initial Fetch
      dispatch(resetList());
      dispatch(fetchDoctors({
         search: searchParams.get('search') || '',
         city: searchParams.get('city') || '',
         speciality: searchParams.get('speciality') || '',
         page: 1
      }));
   }, [dispatch]);

   // 1. Search by Name ONLY
   const handleNameSearch = () => {
      // We keep city/speciality empty or current? Usually separate searches mean exclusive.
      // But for a listing page, usually you might want to search "Dr. Smith" in "Mumbai".
      // I will keep all params to be safe, but focus on the action.

      dispatch(resetList());
      setSearchParams({ search, city, speciality });
      dispatch(fetchDoctors({ search, city, speciality, page: 1 }));
   };

   // 2. Search by Filters ONLY
   const handleFilterSearch = () => {
      dispatch(resetList());
      setSearchParams({ search, city, speciality });
      dispatch(fetchDoctors({ search, city, speciality, page: 1 }));
   };

   const handleClear = () => {
      setSearch(''); setCity(''); setSpeciality('');
      setSearchParams({}); // Clear URL params
      dispatch(resetList());
      dispatch(fetchDoctors({ search: '', city: '', speciality: '', page: 1 }));
   }

   const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(fetchDoctors({ search, city, speciality, page: nextPage }));
   };

   return (
      <div className="page-container">

         <div className="search-header-container">

            {/* ROW 1: Name Search */}
            <div className="search-row">
               <input
                  className="search-input"
                  placeholder="Search Doctor by Name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
               <button className="btn-search" onClick={handleNameSearch}>
                  Search Name
               </button>
            </div>

            {/* ROW 2: Filters */}
            <div className="filter-row">
               <select
                  className="hero-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
               >
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
               </select>

               <select
                  className="hero-input"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
               >
                  <option value="">Select Speciality</option>
                  {specialities.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
               </select>

               {/* NEW BUTTON FOR FILTER SEARCH */}
               <button className="btn-search" style={{ background: '#101828' }} onClick={handleFilterSearch}>
                  Apply Filters
               </button>

               <button className="btn-filter-action" onClick={handleClear} style={{ background: 'transparent', color: '#666', border: '1px solid #ddd' }}>
                  Clear
               </button>
            </div>

         </div>

         {list.length > 0 ? (
            <div className="doctor-grid">
               {list.map(doc => <DoctorCard key={doc.id} doc={doc} />)}
            </div>
         ) : (
            <div style={{ textAlign: 'center', width: '100%', padding: '50px', color: '#888' }}>
               <h3>No doctors found.</h3>
            </div>
         )}

         {list.length >= 10 && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
               <button className="hero-btn" onClick={handleLoadMore}>Load More</button>
            </div>
         )}

      </div>
   );
};

export default DoctorListing;