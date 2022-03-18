import React, { Suspense, useEffect, useRef } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import getBoard from "app/boards/queries/getBoard"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import getEntries from "app/entries/queries/getEntries"
import { Plain, Termynal } from "react-termynal"
import { Box, Card, CardContent, Grid, Stack, Typography, useTheme } from "@mui/material"
import DoughnutCard from "app/core/components/cards/DoughnutCard"
import groupBy from "app/core/utils/groupBy"
import LineCard from "app/core/components/cards/LineCard"

export const Board = () => {
  const theme = useTheme()
  const boardId = useParam("boardId", "string")
  const [board] = useQuery(getBoard, { id: boardId })
  const [{ entries }] = useQuery(
    getEntries,
    { where: { boardId: boardId } },
    { refetchInterval: 10000 }
  )

  return (
    <Stack paddingTop={3} spacing={1} height="100%">
      <Head>
        <title>Board {board.name}</title>
      </Head>
      <Typography textAlign={"center"} variant="h2" component="h1">
        {board.name}
      </Typography>
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

const ShowBoardPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Board />
    </Suspense>
  )
}

ShowBoardPage.authenticate = { redirectTo: Routes.LoginPage() }
ShowBoardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ShowBoardPage
