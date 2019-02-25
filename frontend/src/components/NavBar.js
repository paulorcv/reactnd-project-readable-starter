import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

export default function NavBar() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
            <Typography variant='h4' color='inherit'>
                Readable Project
            </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
