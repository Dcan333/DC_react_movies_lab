import React from "react";
import { getMovieCredits } from "../../api/tmdb-api";
import Grid from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import placeholderImage from "../../images/film-poster-placeholder.png";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Link from "@mui/material/Link";




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

    // Render gender function (It rhymes!) for displaying an actors gender (it's the only other information they have really)  
    const renderGender = (gender) => {
        if (gender === 1) {
            return <FemaleIcon fontSize="small" sx={{ color: "pink", display: "inline" }} />
        }
        else if (gender === 2) {
            return < MaleIcon fontSize="small" sx={{ color: "blue", display: "-ms-inline-grid" }} />
        }
        else {
            return <PersonIcon fontSize="small" sx={{ color: "grey", display: "inline" }} />
        }
    }

    const renderPopularity = (popularity) => {
        if (popularity >= 2) {
            return <>
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
            </>
        }
        else if (popularity >= 1 && popularity < 2) {
            return <>
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
            </>
        }
        else if (popularity < 1 && popularity >= 0.5) {
            return <>
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
            </>
        }
        else if (popularity >= 0.5 && popularity <= 1) {
            return <>
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
            </>
        }
        else {
            return <>
                <StarIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
                <StarOutlineIcon fontSize="small" sx={{ display: 'inline', color: 'gold' }} />
            </>
        }
    }

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
                                    <Link
                                        component="button">{actor.name}</Link>{renderGender(actor.gender)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Popularity: {renderPopularity(actor.popularity)}
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