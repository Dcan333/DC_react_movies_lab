import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  // Add new state for upcoming movies
  const [upcoming, setUpcoming] = useState([]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ));
  };

  // Add new function to add movies to upcoming list
  const addToUpcoming = (movie) => {
    let newUpcoming = [];
    if (!upcoming.includes(movie.id)) {
      newUpcoming = [...upcoming, movie.id];
    }
    else {
      newUpcoming = [...upcoming];
    }
    setUpcoming(newUpcoming);
  };

  // Add new function to remove movies from upcoming list
  const removeFromUpcoming = (movie) => {
    setUpcoming(upcoming.filter(
      (mId) => mId !== movie.id
    ));
  };

  const [myReviews, setMyReviews] = useState({});

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        upcoming,
        addToUpcoming,
        removeFromUpcoming,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;