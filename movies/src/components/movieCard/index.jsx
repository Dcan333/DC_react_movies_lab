import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarsIcon from '@mui/icons-material/Stars';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';




export default function MovieCard({ movie, action }) {

  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const changeStyle = (mouseEvent, mouseIsOver) => {
    const buttonElement = document.getElementById(`more-info-button-${movie.id}`);
    if (buttonElement) {
      if (mouseIsOver) {
        buttonElement.style.opacity = "1"
      }
      else {
        buttonElement.style.opacity = "0"
      }
    }
  }



  return (
    <Link to={`/movies/${movie.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card sx={{ minWidth: "300px" }} onMouseEnter={(mouseEvent) => changeStyle(mouseEvent, true)}
        onMouseLeave={(mouseEvent) => changeStyle(mouseEvent, false)} >
        <CardHeader
          avatar={
            movie.favorite ? (
              <Avatar sx={{ backgroundColor: 'red' }}>
                <FavoriteIcon />
              </Avatar>
            ) : null
          }
          title={
            <Typography variant="h5" component="p">
              {movie.title}{" "}
            </Typography>
          }
        />
        <CardMedia
          sx={{ pt: "150%" }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
        />
        <CardContent>
          <Grid container>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h6" component="p">
                <StarsIcon fontSize="small" />
                {"  "} {movie.vote_average}{" "}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>

          {action(movie)}

          <Button variant="outlined"  size="large" color="primary"
            style={{ opacity: "0", transition: "0.3s" }} id={`more-info-button-${movie.id}`}>
             Details <SwitchAccessShortcutIcon size="large"/>
          </Button>



        </CardActions>

      </Card>
    </Link>
  );
}
