import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromUpcoming from "../components/cardIcons/removeFromUpcoming";



const PlaylistMoviesPage = () => {
  const { upcoming: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const upcomingMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });

  // Check if any of the parallel queries is still loading.
  const isPending = upcomingMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = upcomingMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Movies To Watch Later"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromUpcoming movie={movie} />
          </>
        );
      }}
    />
  );

};

export default PlaylistMoviesPage;