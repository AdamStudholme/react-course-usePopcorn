import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating messages={['terrible', 'bad', 'ok', 'good', 'excellent']} />
    <StarRating color={'red'} size={20} defaultRating={3} maxRating={4} />
  <Test /> */}
  </React.StrictMode>
);

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={10} onSetRating={setMovieRating} />
//       <p> Current movie rating {movieRating}</p>
//     </div>
//   );
// }
