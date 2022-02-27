import React from 'react';
import { pxToRem } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const styles = theme => ({
  mainBackground: {
    background: theme.palette.primary.main,
    height: 'auto',
    width: '100vw'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: '100%',
    background: '#252C48',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  titleName: { fontSize: pxToRem(30), color: 'white' },
  subTitleName: {
    fontSize: pxToRem(20),
    color: 'white'
  }
});
function Footer() {
  return (
    <Grid
        item
        xs={12}
        style={{
          display: "flex",
          height: "5vh",
          marginTop: "0.5vh",
          marginRight: '1vw',
          justifyContent: 'flex-end',
          alignItems: "flex-end"
      }}
    >
      <Typography style={{ color: 'white' }}>
        Copyright 2020 Highradius. All Rights Reserved.
      </Typography>
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(Footer);
