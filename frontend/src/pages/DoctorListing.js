import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors, fetchCities, fetchSpecialities, resetList } from '../features/doctorSlice';
import DoctorCard from '../components/DoctorCard';
import './Pages.css';

const DoctorListing = () => {
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();

   const { list, cities, specialities, status } = useSelector((state) => state.doctors);

   const [search, setSearch] = useState(searchParams.get('search') || '');
   const [city, setCity] = useState(searchParams.get('city') || '');
   const [speciality, setSpeciality] = useState(searchParams.get('speciality') || '');
   const [page, setPage] = useState(1);

   useEffect(() => {
      dispatch(fetchCities());
      dispatch(fetchSpecialities());

      dispatch(resetList());
      dispatch(fetchDoctors({
         search: searchParams.get('search') || '',
         city: searchParams.get('city') || '',
         speciality: searchParams.get('speciality') || '',
         page: 1
      }));
   }, [dispatch]);

   const handleNameSearch = () => {
      dispatch(resetList());
      setPage(1);
      setSearchParams({ search, city, speciality });
      dispatch(fetchDoctors({ search, city, speciality, page: 1 }));
   };

   const handleFilterSearch = () => {
      dispatch(resetList());
      setPage(1);
      setSearchParams({ search, city, speciality });
      dispatch(fetchDoctors({ search, city, speciality, page: 1 }));
   };

   const handleClear = () => {
      setSearch(''); setCity(''); setSpeciality('');
      setSearchParams({});
      dispatch(resetList());
      setPage(1);
      dispatch(fetchDoctors({ search: '', city: '', speciality: '', page: 1 }));
   }

   const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(fetchDoctors({ search, city, speciality, page: nextPage }));
   };

   return (
      <div className="page-container">

         {/* HEADER */}
         <div className="search-header-container">
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

               <button className="btn-search" style={{ background: '#101828' }} onClick={handleFilterSearch}>
                  Apply Filters
               </button>

               <button className="btn-filter-action" onClick={handleClear} style={{ background: 'transparent', color: '#666', border: '1px solid #ddd' }}>
                  Clear
               </button>
            </div>
         </div>

         {/* DOCTOR GRID */}
         {list.length > 0 ? (
            <div className="doctor-grid">
               {list.map(doc => <DoctorCard key={doc.id} doc={doc} />)}
            </div>
         ) : (
            <div style={{ textAlign: 'center', width: '100%', padding: '50px', color: '#888' }}>
               <h3>No doctors found based on your filters.</h3>
            </div>
         )}

         {/* Load More Button */}
         {list.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
               <button
                  className="hero-btn"
                  onClick={handleLoadMore}
                  disabled={status === 'loading'}
               >
                  {status === 'loading' ? 'Loading...' : 'Load More'}
               </button>
            </div>
         )}

      </div>
   );
};

export default DoctorListing;