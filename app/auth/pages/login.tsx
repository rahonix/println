import { useRouter, BlitzPage } from "blitz"
import VerticalCenteredLayout from "app/core/layouts/VerticalCenteredLayout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Box, Grid, Typography } from "@mui/material"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid marginBottom={20} xs={6} lg={3} item>
          <Typography textAlign="center" variant="h2" component="h1">
            Login
          </Typography>
          <LoginForm
            onSuccess={(_user) => {
              const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              router.push(next)
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => (
  <VerticalCenteredLayout title="Log In">{page}</VerticalCenteredLayout>
)

export default LoginPage
