import { useRouter, BlitzPage, Routes } from "blitz"
import VerticalCenteredLayout from "app/core/layouts/VerticalCenteredLayout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Grid } from "@mui/material"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid marginBottom={20} xs={6} lg={3} item>
          <SignupForm onSuccess={() => router.push(Routes.Dashboard())} />
        </Grid>
      </Grid>
    </>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => (
  <VerticalCenteredLayout title="Sign Up">{page}</VerticalCenteredLayout>
)

export default SignupPage
