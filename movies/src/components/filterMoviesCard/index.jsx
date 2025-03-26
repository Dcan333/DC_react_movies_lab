import React from "react";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../api/tmdb-api";
import theme from "../../theme";

const formControl =
{
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const ratings = [
        { id: "0", name: "Ratings" },
        { id: "7", name: "7+" },
        { id: "8", name: "8+" },
        { id: "9", name: "9+" },
    ]

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };

    const handleRatingChange = (e) => {
        handleChange(e, "rating", e.target.value);
    };




    return (
        <Card
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
            }}
            variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />

                <FormControl sx={{ ...formControl }}>

                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <FormControl sx={{ ...formControl }}>

                    <Select
                        labelId="rating-label"
                        id="rating-select"
                        defaultValue="0"
                        value={props.ratingFilter}
                        onChange={handleRatingChange}
                    >
                        {ratings.map((rating) => {
                            return (
                                <MenuItem key={rating.id} value={rating.id}>
                                    {rating.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </CardContent>
            <CardMedia
                sx={{ height: 300 }}
                image={img}
                title="Filter"
            />
        </Card>
    );
}
