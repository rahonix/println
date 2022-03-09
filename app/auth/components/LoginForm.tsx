import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <Typography textAlign="center" variant="h2" component="h1">
        Login
      </Typography>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "Hi", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField
          //@ts-ignore
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <LabeledTextField
          //@ts-ignore
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Form>
      <Grid container>
        <Grid item xs>
          <Link href={Routes.SignupPage()}>Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link href={Routes.ForgotPasswordPage()}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginForm
