import NextLink from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { Box, Button, ListItem, Typography } from "@mui/material"

export const NavItemButton = (props) => {
  const { icon, title, onClick, ...others } = props
  const active = false
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        onClick={onClick}
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
          {/* TODO: Align Text */}
          <Typography justifyContent={"center"}>{title}</Typography>
        </Box>
      </Button>
    </ListItem>
  )
}

NavItemButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  title: PropTypes.string,
}
