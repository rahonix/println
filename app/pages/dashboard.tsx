import getBoards from "app/boards/queries/getBoards"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { BlitzPage, Routes, usePaginatedQuery, useSession } from "blitz"
import { Suspense, useEffect } from "react"

const BoardList = () => {
  const session = useSession({ suspense: false })
  const [{ boards, hasMore }] = usePaginatedQuery(getBoards, {
    where: {
      userId: session.userId!,
    },
  })
  return (
    <>
      {boards.map((board) => {
        return <p key={board.id}> {board.id} </p>
      })}
    </>
  )
}

const Dashboard: BlitzPage = () => {
  const session = useSession({ suspense: false })

  return (
    <>
      <Suspense fallback="Loading ...">
        <BoardList />
      </Suspense>
    </>
  )
}

Dashboard.authenticate = { redirectTo: Routes.LoginPage() }

export default Dashboard
