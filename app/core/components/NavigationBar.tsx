import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Container } from "@mui/material"
import { Link, Routes } from "blitz"

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Typography component="div" color="text.primary">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Link href={Routes.LoginPage()}>
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </Typography>
      </Container>
    </Box>
  )
}
