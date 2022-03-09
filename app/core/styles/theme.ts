import { createTheme } from "@mui/material/styles"

// Create a theme instance.
export const lightTheme = createTheme()
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})
