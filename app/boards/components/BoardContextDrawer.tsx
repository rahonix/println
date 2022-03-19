import { IconButton, Drawer, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import SettingsIcon from "@mui/icons-material/Settings"

const BoardContextDrawer = ({ open, setOpen, children }) => {
  return (
    <>
      <IconButton onClick={() => setOpen(!open)}>
        <MoreVertIcon />
      </IconButton>
      <Drawer anchor={"bottom"} open={open} onClose={() => setOpen(false)}>
        {children}
      </Drawer>
    </>
  )
}

export default BoardContextDrawer
