import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createBoard from "app/boards/mutations/createBoard"
import { BoardForm, FORM_ERROR } from "app/boards/components/BoardForm"
import { CreateBoardSchema } from "app/boards/validations"
import VerticalCenteredLayout from "app/core/layouts/VerticalCenteredLayout"
import { Grid, Typography } from "@mui/material"

const NewBoardPage: BlitzPage = () => {
  const router = useRouter()
  const [createBoardMutation] = useMutation(createBoard)

  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid marginBottom={20} xs={6} lg={3} item>
          <Typography textAlign="center" variant="h2" component="h1">
            Create new board
          </Typography>
          <BoardForm
            submitText="Create Board"
            schema={CreateBoardSchema}
            initialValues={{}}
            onSubmit={async (values) => {
              try {
                const board = await createBoardMutation(values)
                router.push(Routes.ShowBoardPage({ boardId: board.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

NewBoardPage.authenticate = true
NewBoardPage.getLayout = (page) => (
  <VerticalCenteredLayout title={"Create New Board"}>{page}</VerticalCenteredLayout>
)

export default NewBoardPage
