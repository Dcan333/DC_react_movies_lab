import React from "react";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import MovieList from "../movieList";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import AddToUpcomingIcon from "../cardIcons/addToUpcoming";


const MovieRecommendations = ({ movie }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['recommendations', {id: movie.id}],
        queryFn: getMovieRecommendations,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    // slice method in javascript to take a portion of the generated array
    const recommendations = data.results.slice(0, 2);

    return (
        <>
            <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
                Viewers also enjoyed...
            </Typography>
            <Grid container spacing={[1,35]} sx={{ marginTop: 1 }} >
                <MovieList
                    movies={recommendations}
                    action={(movie) => (
                        <>
                            <AddToFavoritesIcon movie={movie} />
                            <AddToUpcomingIcon movie={movie} />
                        </>
                    )}
                />
            </Grid>
        </>
    );
};

export default MovieRecommendations;