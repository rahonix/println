import * as React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        println.it
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* <Typography 
                variant="h6" 
                align="center" 
                gutterBottom
                color="text.secondary"
            >
                Println
            </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
              This is the place for my own Footer text!
          </Typography> */}
        <Copyright />
      </Container>
    </Box>
  )
}
