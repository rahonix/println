import { useEffect } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { Box, Button, Divider, Drawer, Theme, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@emotion/react"

import { Selector as SelectorIcon } from "app/core/icons/selector"
import { ChartBar as ChartBarIcon } from "app/core/icons/chart-bar"
import { Cog as CogIcon } from "app/core/icons/cog"
import { Lock as LockIcon } from "app/core/icons/lock"
import { ShoppingBag as ShoppingBagIcon } from "app/core/icons/shopping-bag"
import { User as UserIcon } from "app/core/icons/user"
import { UserAdd as UserAddIcon } from "app/core/icons/user-add"
import { Users as UsersIcon } from "app/core/icons/users"
import { XCircle as XCircleIcon } from "app/core/icons/x-circle"

import { NavItem } from "./NavItem"

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/boards",
    icon: <UsersIcon fontSize="small" />,
    title: "Boards",
  },
]

export const Sidebar = (props) => {
  const { open, onClose } = props
  const router = useRouter()
  const theme = useTheme()
  //@ts-ignore TODO: Apparantly my theme is illegal
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"))

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (open) {
        onClose?.()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  )

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}></Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Acme Inc
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your tier : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>

        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
        </Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "primary.contrastText",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
