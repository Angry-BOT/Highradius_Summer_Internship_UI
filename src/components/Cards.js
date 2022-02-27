import React from 'react';
import { Grid } from '@material-ui/core';

const Cards = (props)=>{
    const styles={
        bgstyle: {backgroundColor: "rgb(93,175,240,0.5)",  textAlign:"center"},
        title: {fontSize: "1.5rem",color:"rgba(255,255,255,.8)",fontWeight: 'normal',paddingTop:"1.2rem"},
        title2: {fontSize: "1.5rem",color:"white",paddingBottom: "1.2rem", fontWeight: 'bold'},

 }
    return(
        <Grid style={styles.bgstyle}>
            <h1 style={styles.title}>{props.heading}</h1>
            <h1 style={styles.title2}>{props.value}</h1>
        </Grid>
    );
}

export default Cards;