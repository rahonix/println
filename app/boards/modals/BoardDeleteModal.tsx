import NiceModal, { useModal } from "@ebay/nice-modal-react"
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { Routes, useMutation, useRouter } from "blitz"
import React from "react"
import deleteBoard from "../mutations/deleteBoard"

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & { children?: React.ReactElement<any, any> },
//     ref: React.Ref<unknown>,
//   ) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

type BoardDeleteModalProps = {
  boardId: string
}

const BoardDeleteModal = NiceModal.create(({ boardId }: BoardDeleteModalProps) => {
  const router = useRouter()
  const modal = useModal()
  const [deleteBoardMutation] = useMutation(deleteBoard)

  const deleteBoardHandler = () => {
    deleteBoardMutation({ id: boardId })
    router.push(Routes.Dashboard())
    modal.hide()
  }

  return (
    <Dialog
      // TransitionComponent={Transition}
      open={modal.visible}
      onClose={() => modal.hide()}
      TransitionProps={{
        onExited: () => modal.remove(),
      }}
    >
      <DialogTitle>{"Delete current board"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Typography>Are you sure you want to delete this board?</Typography>
          <Button fullWidth variant="contained" onClick={deleteBoardHandler}>
            Confirm
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
})

export default BoardDeleteModal
