import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import backarrow from '../assets/navigate_before.svg';
import ProfessorUi from '../components/ProfessorUi';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './Search.css';

const styles = {
    //appbar:{height:"7vh"},
    title: {fontSize:"1.25rem", fontWeight: "900", marginLeft:".4rem"},
    top: {textAlign: "center",marginTop:"-12px",backgroundColor:"orange"},
    toptext: {fontSize:"12px", textAlign: "center"},
    button:{backgroundColor:"orange", borderRadius:"30px"}
}

class CustomerDetailsHeader extends React.Component{

    render(){
        const { classes } = this.props;

        return (
            <AppBar position="static" elevation={0} style={styles.appbar}>
                <Toolbar>
                    <Grid container alignItems="flex-start">  
                        <Grid container xs={5}>
                            <Link to = {{pathname: '/'}}>
                                <img autoid = "navigation-back-button" src={backarrow} height="30px" style={{transform: "rotate(180deg)"}}></img>
                            </Link>
                            <Typography autoid ="customer-name" variant="h6" color="inherit" style={styles.title}>
                                {this.props.customerinfo[0]}
                                <Typography autoid= "customer-number" style={{color : 'white', fontSize: '0.5em'}}> 
                                    {this.props.customerinfo[1]} 
                                </Typography>
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
}
export default withStyles(styles)(CustomerDetailsHeader);