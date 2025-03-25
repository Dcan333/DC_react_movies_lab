import {createTheme} from "@mui/material/styles";

const theme = createTheme ({
    palette: {
        primary: {
            main: "#0b0e23",
            dark: "#212121",
            contrastText: "#fcfcfc"
        },
        secondary: {
            main: "#aa2132"
        },
        background:{
            default: "#eedac8",
            paper: "#eedac8"
        }
    }

})

export default theme