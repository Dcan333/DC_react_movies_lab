import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";


const Header = (props) => {
  const title = props.title
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
      }}
    >

      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon color="primary" fontSize="large" />
      </IconButton>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIosIcon color="primary" fontSize="large" />
      </IconButton>


    </Paper>
  );
};

export default Header;
