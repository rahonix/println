import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBoard from "app/boards/queries/getBoard"
import deleteBoard from "app/boards/mutations/deleteBoard"

export const Board = () => {
  const router = useRouter()
  const boardId = useParam("boardId", "number")
  const [deleteBoardMutation] = useMutation(deleteBoard)
  const [board] = useQuery(getBoard, { id: boardId })

  return (
    <>
      <Head>
        <title>Board {board.id}</title>
      </Head>

      <div>
        <h1>Board {board.id}</h1>
        <pre>{JSON.stringify(board, null, 2)}</pre>

        <Link href={Routes.EditBoardPage({ boardId: board.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBoardMutation({ id: board.id })
              router.push(Routes.BoardsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowBoardPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.BoardsPage()}>
          <a>Boards</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Board />
      </Suspense>
    </div>
  )
}

ShowBoardPage.authenticate = true
ShowBoardPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBoardPage
