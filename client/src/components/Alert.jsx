import React, { useState, useEffect } from 'react'
import { Snackbar, Alert, Button } from '@mui/material'

function MyAlert(props) {
  const { type, text } = props;
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open)
  })

  const vertical = 'bottom'
  const horizontal = 'right'


  return (
    <>
      <Snackbar
        anchorOrigin={ {vertical, horizontal} }
        key={'bottom' + 'right'}
        open={open} autoHideDuration={100} >
        <Alert variant="filled" severity={type=='success'?"success": "error"} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </>
    
  )
}

export default MyAlert