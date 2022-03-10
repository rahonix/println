import getBoards from "app/boards/queries/getBoards"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { DashboardLayout } from "app/core/layouts/DashboardLayout"
import { BlitzPage, Routes, usePaginatedQuery, useSession } from "blitz"
import { Suspense, useEffect } from "react"

const BoardList = () => {
  const user = useCurrentUser()
  const [{ boards, hasMore }] = usePaginatedQuery(getBoards, {
    where: {
      userId: user?.id,
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
  return <></>
}

Dashboard.authenticate = { redirectTo: Routes.LoginPage() }
Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
