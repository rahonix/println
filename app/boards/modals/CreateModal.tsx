import NiceModal, { useModal } from "@ebay/nice-modal-react"
import {
  Slide,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { Routes, useMutation, useRouter } from "blitz"
import { FORM_ERROR } from "final-form"
import React from "react"
import { BoardForm } from "../components/BoardForm"
import createBoard from "../mutations/createBoard"
import { CreateBoardSchema } from "../validations"

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & { children?: React.ReactElement<any, any> },
//     ref: React.Ref<unknown>,
//   ) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

const BoardCreateModal = NiceModal.create(() => {
  const router = useRouter()
  const modal = useModal()
  const [createBoardMutation] = useMutation(createBoard)

  return (
    <Dialog
      // TransitionComponent={Transition}
      open={modal.visible}
      onClose={() => modal.hide()}
      TransitionProps={{
        onExited: () => modal.remove(),
      }}
    >
      <DialogTitle>{"Create new board"}</DialogTitle>
      <DialogContent>
        <BoardForm
          submitText="Create Board"
          schema={CreateBoardSchema}
          initialValues={{}}
          onSubmit={async (values) => {
            try {
              const board = await createBoardMutation(values)
              modal.hide()
              router.push(Routes.ShowBoardPage({ boardId: board.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
})

export default BoardCreateModal
