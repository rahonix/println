import { Suspense, useEffect, useRef } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import getBoard from "app/boards/queries/getBoard"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import getEntries from "app/entries/queries/getEntries"
import { Plain, Termynal } from "react-termynal"

export const Board = () => {
  const boardId = useParam("boardId", "string")
  const [board] = useQuery(getBoard, { id: boardId })
  const [{ entries }, { refetch }] = useQuery(
    getEntries,
    { where: { boardId: boardId } },
    { refetchInterval: 5000 }
  )

  return (
    <div style={{ position: "relative", height: "100%" }}>
      {console.log(entries)}
      <Head>
        <title>Board {board.name}</title>
      </Head>
      <Termynal id="placeholder" name="bash">
        {entries.map((entry) => (
          <Plain key={entry.id}>
            <p>{entry.text}</p>
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

ShowBoardPage.authenticate = true
ShowBoardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ShowBoardPage
