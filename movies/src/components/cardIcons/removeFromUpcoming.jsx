import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromUpcomingIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromUpcoming = (e) => {
    e.preventDefault();
    context.removeFromUpcoming(movie);
  };
  return (
    <IconButton
      aria-label="remove from upcoming"
      onClick={handleRemoveFromUpcoming}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromUpcomingIcon;