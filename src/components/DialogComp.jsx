import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function DialogComp({item,open,handleClose}) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {item?.name}
        </DialogTitle>
        <DialogContent>
          
          <DialogContentText id="alert-dialog-description">
          <img
                src={"http://localhost:5000" + item?.image}
                
              />            <p>{item?.description}</p>
            <p>{item?.adresse}</p>
            <p>{item?.phone}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogComp