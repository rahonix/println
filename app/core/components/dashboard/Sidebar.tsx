import { useEffect } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import {
  Box,
  Button,
  Divider,
  Drawer,
  SvgIconTypeMap,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@emotion/react"

import { Selector as SelectorIcon } from "app/core/icons/selector"
import { ChartBar as ChartBarIcon } from "app/core/icons/chart-bar"
import AddIcon from "@mui/icons-material/Add"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ViewComfyIcon from "@mui/icons-material/ViewComfy"

import { NavItemLink } from "./NavItemLink"
import NestedNavList from "./NestedNavList"
import { Routes, RouteUrlObject } from "blitz"
import { useModal } from "@ebay/nice-modal-react"
import BoardCreateModal from "app/boards/modals/CreateModal"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { NavItemButton } from "./NavItemButton"

type NavItem = {
  type: "link" | "list"
  title: string
  icon: any
  // MUTUAL EXCLUSIVE PRETTY PLEASE TODO: Theer is an ts-xor package which implement this behaviour
  href?: RouteUrlObject
  onClick?: () => void
  links?: NavItem[]
}

export const Sidebar = (props) => {
  const { open, onClose } = props
  const router = useRouter()
  const theme = useTheme()
  const modal = useModal(BoardCreateModal)
  //@ts-ignore TODO: Apparantly my theme is illegal
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"))

  const items: NavItem[] = [
    {
      type: "link",
      title: "Dashboard",
      href: Routes.Dashboard(),
      icon: <ChartBarIcon fontSize="small" />,
    },
    {
      type: "list",
      title: "Boards",
      icon: <DashboardIcon fontSize="small" />,
      links: [
        {
          type: "link",
          title: "View",
          href: Routes.BoardsPage(),
          icon: <ViewComfyIcon fontSize="small" />,
        },
        {
          type: "link",
          title: "Create",
          onClick: () => modal.show(),
          icon: <AddIcon fontSize="small" />,
        },
      ],
    },
  ]

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
          {items.map((item) => {
            if (item.type === "link") {
              if (item.hasOwnProperty("href"))
                return (
                  <NavItemLink
                    key={item.title}
                    icon={item.icon}
                    href={item.href!.pathname}
                    title={item.title}
                  />
                )
              return (
                <NavItemButton
                  key={item.title}
                  icon={item.icon}
                  onClick={item.onClick}
                  title={item.title}
                />
              )
            }
            return (
              <NestedNavList key={item.title} icon={item.icon} title={"Boards"} collapsed>
                {item.links!.map((link) => {
                  if (link.hasOwnProperty("href"))
                    return (
                      <NavItemLink
                        key={link.title}
                        icon={link.icon}
                        href={link.href!.pathname}
                        title={link.title}
                      />
                    )
                  return (
                    <NavItemButton
                      key={link.title}
                      icon={link.icon}
                      onClick={link.onClick}
                      title={link.title}
                    />
                  )
                })}
              </NestedNavList>
            )
          })}
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
          ></Box>
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
