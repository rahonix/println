import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import SettingsIcon from "@mui/icons-material/Settings"

const BoardContextMenu = ({ open, setOpen, anchorEl, setAnchorEl, children }) => {
  return (
    <>
      <IconButton
        onClick={(event) => {
          setOpen(!open)
          setAnchorEl(event.currentTarget)
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {children}
      </Menu>
    </>
  )
}

export default BoardContextMenu
