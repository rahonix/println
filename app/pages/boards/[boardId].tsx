import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import getBoard from "app/boards/queries/getBoard"
import deleteBoard from "app/boards/mutations/deleteBoard"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import getEntries from "app/entries/queries/getEntries"

export const Board = () => {
  const boardId = useParam("boardId", "string")
  const [board] = useQuery(getBoard, { id: boardId })
  const [{ entries, hasMore }] = useQuery(getEntries, { where: { boardId: boardId } })
  return (
    <>
      <Head>
        <title>Board {board.name}</title>
      </Head>
      <main>
        {entries.map((entry) => {
          return <div key={entry.id}>{entry.text}</div>
        })}
      </main>
    </>
  )
}

const ShowBoardPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Board />
      </Suspense>
    </div>
  )
}

ShowBoardPage.authenticate = true
ShowBoardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ShowBoardPage
