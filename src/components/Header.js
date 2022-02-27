import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import companyLogo from '../assets/companyLogo.svg';
import ProfessorUi from '../components/ProfessorUi';

const header = () => {
    const styles={
        //appbar:{height:"6.5vh"},
        title: {fontSize:"1.25rem", fontWeight: "900", marginLeft:".4rem"},
        top: {textAlign: "center",marginTop:"-18px",backgroundColor:"orange"},
        toptext: {fontSize:"12px", textAlign: "center"},
        button:{backgroundColor:"orange", borderRadius:"30px"}
    }
   return (
        <AppBar position="static" elevation={0} style={styles.appbar}>
            <Toolbar>
                <Grid container alignItems="flex-start">  
                    <Grid container xs={5}>
                        <img src={companyLogo} height="30px"></img>
                        <Typography variant="h6" color="inherit" style={styles.title}>
                            ABC Products
                        </Typography>
                    </Grid>
                    <Grid item xs={2}> 
                        <Paper elevation={1} style={styles.top}>
                            <Typography variant="h6" color="inherit" style={styles.toptext}>
                                Receivables Dashboard            
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs></Grid>
                    <Grid item >
                        <ProfessorUi/>
                    </Grid>
                </Grid>          
            </Toolbar>
        </AppBar>
   );
}
export default header;