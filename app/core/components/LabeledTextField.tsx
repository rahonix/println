import { TextField } from "@mui/material"
import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { Field, useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    return (
      <>
        <Field name={name}>
          {(input) => (
            //@ts-ignore
            <TextField
              name={input.input.name}
              value={input.input.value}
              onChange={input.input.onChange}
              {...props}
            />
          )}
        </Field>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </>
    )
  }
)

export default LabeledTextField
