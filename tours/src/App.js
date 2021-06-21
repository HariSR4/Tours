import React, { useState, useEffect } from 'react';
import Tours from './Tours.jsx';
import Loading from './Loading';
import './index.css';
const URL = 'https://course-api.com/react-tours-project';

function App() {
   useEffect(() => {
      fetchTours();
   }, []);

   const removeTour = (id) => {
      const newTours = tours.filter((tour) => tour.id !== id);
      setTours(newTours);
   };
   const [tours, setTours] = useState([]);
   const [loading, setLoading] = useState(false);

   const fetchTours = async () => {
      try {
         setLoading(true);
         const response = await fetch(URL);
         const tours = await response.json();
         setTours(tours);
         setLoading(false);
      } catch (err) {
         console.log(err);
      }
   };

   if (loading) {
      return (
         <main>
            <Loading />
         </main>
      );
   }

   if (tours.length === 0) {
      return (
         <main>
            <div className='title'>
               <h2>no tours left</h2>
               <button className='btn' onClick={() => fetchTours()}>
                  refresh
               </button>
            </div>
         </main>
      );
   }

   return (
      <main>
         <Tours props={tours} removeTour={removeTour} />
      </main>
   );
}

export default App;
