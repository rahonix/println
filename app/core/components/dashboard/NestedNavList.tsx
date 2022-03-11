import * as React from "react"
import Collapse from "@mui/material/Collapse"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Button, Box, ListItem, Stack, Typography } from "@mui/material"

type NestedNavListProps = {
  title: string
  icon: any
  collapsed: boolean
  children: any
}

export default function NestedNavList({ title, icon, collapsed, children }: NestedNavListProps) {
  // TODO: reimplement active
  const active: boolean = false
  const [open, setOpen] = React.useState<boolean>(collapsed)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 0.5,
          py: 0,
          px: 2,
        }}
      >
        <Button
          onClick={handleClick}
          component="button"
          startIcon={icon}
          disableRipple
          //@ts-ignore TODO: Find out what is wrong here
          sx={{
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{title}</Typography>
          </Box>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack sx={{ pl: 1 }}>{children}</Stack>
      </Collapse>
    </>
  )
}
