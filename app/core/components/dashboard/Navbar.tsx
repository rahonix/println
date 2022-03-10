import PropTypes from "prop-types"
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Link, Router, Routes, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"
import { Suspense } from "react"

const UserDropDown = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  return (
    <Button
      variant="outlined"
      onClick={async () => {
        await logoutMutation()
      }}
    >
      Logout
    </Button>
  )
}

export const Navbar = (props) => {
  const { onSidebarOpen, ...other } = props
  const theme = useTheme()

  return (
    <>
      <AppBar
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
          backgroundColor: "background.paper",
          boxShadow: theme.shadows[3],
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Suspense fallback="...">
            <UserDropDown />
          </Suspense>
        </Toolbar>
      </AppBar>
    </>
  )
}

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func,
}
