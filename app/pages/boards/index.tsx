import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBoards from "app/boards/queries/getBoards"

const ITEMS_PER_PAGE = 100

export const BoardsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ boards, hasMore }] = usePaginatedQuery(getBoards, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Link href={Routes.ShowBoardPage({ boardId: board.id })}>
              <a>{board.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const BoardsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Boards</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewBoardPage()}>
            <a>Create Board</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <BoardsList />
        </Suspense>
      </div>
    </>
  )
}

BoardsPage.authenticate = true
BoardsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BoardsPage
