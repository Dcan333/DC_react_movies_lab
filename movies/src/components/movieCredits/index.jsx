import React from "react";
import { getMovieCredits } from "../../api/tmdb-api";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import placeholderImage from '../../images/film-poster-placeholder.png'; // Make sure this path is correct



const MovieCredits = ({ movie }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['credits', { id: movie.id }],
        queryFn: getMovieCredits,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

 
    const cast = data.cast.slice(0, 10);
  
    return (
        <>
            <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
                Cast Members
            </Typography>
            <Grid container spacing={[1, 5]} sx={{ marginTop: 1 }}>
                {/*  same as in movieList */}
                {cast.map((actor) => (
                    <Grid key={actor.id} xs={6} sm={4} md={3} lg={2}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="210"
                                image={
                                    // ternary operator 
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : placeholderImage
                                }
                                alt={actor.name}
                            />
                            {/* actor info for their name and the character theyre playing */}
                            <CardContent>
                                <Typography variant="body2" component="p" fontWeight="bold">
                                    {actor.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {actor.character}
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>
        </>
            );
};

            export default MovieCredits;