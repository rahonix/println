import React, { Suspense, useEffect, useRef } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import getBoard from "app/boards/queries/getBoard"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import getEntries from "app/entries/queries/getEntries"
import { Plain, Termynal } from "react-termynal"
import { Typography } from "@mui/material"

export const Board = () => {
  const boardId = useParam("boardId", "string")
  const [board] = useQuery(getBoard, { id: boardId })
  const [{ entries }] = useQuery(
    getEntries,
    { where: { boardId: boardId } },
    { refetchInterval: 5000 }
  )
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Head>
        <title>Board {board.name}</title>
      </Head>
      <Termynal>
        {entries.map((entry, index) => (
          <Plain lineNumber={index + 1} key={entry.text}>
            <Typography color={entry.type.toLowerCase() + ".main"}>{entry.text}</Typography>
          </Plain>
        ))}
      </Termynal>
    </div>
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
