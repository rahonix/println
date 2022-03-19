import React, { Suspense, useState } from "react"
import { Head, useQuery, useParam, BlitzPage, Routes } from "blitz"
import getBoard from "app/boards/queries/getBoard"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import getEntries from "app/entries/queries/getEntries"
import { Dots, Plain, Termynal, Title } from "react-termynal"
import {
  Accordion,
  AccordionSummary,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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
    <Stack spacing={1} height="100%">
      <Head>
        <title>Board {board.name}</title>
      </Head>

      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panella-content"
          id="panella-content"
        >
          <Typography>Statistics</Typography>
        </AccordionSummary>
        <AccordionSummary>
          <Grid container>
            <Grid paddingLeft={"1rem"} item xs={12} md={6}>
              <DoughnutCard entries={entries} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineCard entries={entries} />
            </Grid>
          </Grid>
        </AccordionSummary>
      </Accordion> */}
      <div style={{ position: "relative", height: "100%" }}>
        <Termynal
          header={
            <>
              <Title text={board.name} />
              <div style={{ paddingRight: "2rem" }}>
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
                      <ListItemText
                        primary={<Typography color={"error.main"}>Delete</Typography>}
                      />
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
                        <a
                          onClick={(event) => exportJson(event.currentTarget, entries, board.name)}
                        >
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
              </div>
            </>
          }
        >
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
