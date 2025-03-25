import React from "react";
import { getMovieCredits } from "../../api/tmdb-api";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import MovieList from "../movieList";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'



const MovieCredits = ({ movie }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['credits', {id: movie.id}],
        queryFn: getMovieCredits,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    // slice method in javascript to take a portion of the generated array
    const credits = data.results.slice(0, 10);

    return (
        <>
            <Typography variant="h7" component="h3" sx={{ marginTop: 2 }}>
                Cast
            </Typography>
            <Grid container spacing={[1,35]} sx={{ marginTop: 1 }} >
                <MovieList
                    movies={credits}
                />
            </Grid>
        </>
    );
};

export default MovieCredits;