import * as React from "react"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Container } from "@mui/material"
import { Link, Routes, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Suspense } from "react"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          color="inherit"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.LoginPage()}>
          <Button color="inherit">Login</Button>
        </Link>
      </>
    )
  }
}

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <Typography component="div" color="text.primary">
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </Toolbar>
        </Typography>
      </Container>
    </Box>
  )
}
