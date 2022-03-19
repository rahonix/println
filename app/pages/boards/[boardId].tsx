import React, { Suspense, useState } from "react"
import { Head, useQuery, useParam, BlitzPage, Routes } from "blitz"
import getBoard from "app/boards/queries/getBoard"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import getEntries from "app/entries/queries/getEntries"
import { Plain, Termynal } from "react-termynal"
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import DoughnutCard from "app/core/components/cards/DoughnutCard"
import LineCard from "app/core/components/cards/LineCard"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import SettingsIcon from "@mui/icons-material/Settings"
import BoardContextDrawer from "app/boards/components/BoardContextDrawer"
import BoardContextMenu from "app/boards/components/BoardContextMenu"
import DeleteIcon from "@mui/icons-material/Delete"
import exportJson from "app/core/utils/exportJson"
import BoardDeleteModal from "app/boards/modals/BoardDeleteModal"
import { useModal } from "@ebay/nice-modal-react"

export const Board = () => {
  const theme = useTheme()
  const modal = useModal(BoardDeleteModal)
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))
  const boardId = useParam("boardId", "string")
  const [board] = useQuery(getBoard, { id: boardId })
  const [{ entries }] = useQuery(
    getEntries,
    { where: { boardId: boardId } },
    { refetchInterval: 10000 }
  )

  const [open, setOpen] = useState<boolean>(false)
  const [anchorElement, setAnchorElement] = useState<any>(null)

  return (
    <Stack paddingTop={3} spacing={1} height="100%">
      <Head>
        <title>Board {board.name}</title>
      </Head>
      <Grid container>
        <Grid item xs={10} md={10}>
          <Typography textAlign={"center"} variant="h2" component="h1" paddingLeft={"22%"}>
            {board.name}
          </Typography>
        </Grid>
        <Grid item xs={2} display="flex" alignItems="center" justifyContent="end" paddingRight={2}>
          <>
            {mdUp ? (
              <BoardContextMenu
                open={open}
                setOpen={setOpen}
                anchorEl={anchorElement}
                setAnchorEl={setAnchorElement}
              >
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                {/* TODO: Styled when pressed */}
                <a onClick={(event) => exportJson(event.currentTarget, entries, board.name)}>
                  <MenuItem>
                    <ListItemIcon>
                      <FileDownloadIcon fontSize="small" />
                    </ListItemIcon>
                    Export
                  </MenuItem>
                </a>
                <MenuItem onClick={() => modal.show({ boardId: boardId })}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography color={"error.main"}>Delete</Typography>} />
                </MenuItem>
              </BoardContextMenu>
            ) : (
              <BoardContextDrawer open={open} setOpen={setOpen}>
                <Box>
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={"Settings"} />
                    </ListItem>
                    {/* TODO: Styled when pressed */}
                    <a onClick={(event) => exportJson(event.currentTarget, entries, board.name)}>
                      <ListItem button>
                        <ListItemIcon>
                          <FileDownloadIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={"Export"} />
                      </ListItem>
                    </a>
                    <ListItem button onClick={() => modal.show()}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography color={"error.main"}>Delete</Typography>}
                      />
                    </ListItem>
                  </List>
                </Box>
              </BoardContextDrawer>
            )}
          </>
        </Grid>
      </Grid>
      <Grid container>
        <Grid paddingLeft={"1rem"} item xs={12} md={6}>
          <DoughnutCard entries={entries} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineCard entries={entries} />
        </Grid>
      </Grid>
      <div style={{ position: "relative", height: "100%", padding: "0 1rem 1rem" }}>
        <Termynal>
          {entries.map((entry, index) => (
            <Plain lineNumber={index + 1} key={entry.id}>
              <Typography color={entry.type.toLowerCase() + ".main"}>{entry.text}</Typography>
            </Plain>
          ))}
        </Termynal>
      </div>
    </Stack>
  )
}

const ShowBoardPage: BlitzPage = () => (
  <Suspense
    fallback={
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    }
  >
    <Board />
  </Suspense>
)

ShowBoardPage.authenticate = { redirectTo: Routes.LoginPage() }
ShowBoardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ShowBoardPage
