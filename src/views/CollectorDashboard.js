import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { callDummyAPI } from '../services/services';
import Paper from '@material-ui/core/Paper';
import Header from "../components/Header";
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import Table from '../components/Table';
import Search from '../components/Search';
import Chart from '../components/Chart';
import axios from 'axios';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '1vw',
    paddingRight: '1vw',
  },
  notchedOutline: { 
    borderWidth: '1px', 
    borderColor: '#5DAAE0 !important' 
  },
  topcircle:{
    borderRadius: "10px 10px 10px 10px",    
  },

  });

class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      data: [],
      response: 0,
      redirect: false,
      loading: false,
      buss_code:"",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  formChild1(params) {
    this.setState({
        buss_code: params
      })
      console.log("Inside Collector Dash ->" + this.state.buss_code);  
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleGetStarted = (e) => {
    callDummyAPI(this.state.name).then((response) => {
      this.setState({
        response: response.data.name,
        redirect: true,
        loading: false,
      });
    });
  };

  componentDidMount() {
    axios.get('http://localhost:8080/1705819/dataservlet')
        .then(res => this.setState({ data: res.data }))
        .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const {  buss_code, data } = this.state;
    let dataBussCode = data.filter(ele => ele.businessCode === buss_code);
    let totCustomers = dataBussCode.length;
    let totOpenAR = dataBussCode.reduce((a, b) => a + b.actualOpenAmount, 0.0);
    let avgDaysDelay = Math.ceil((dataBussCode.reduce((a, b) => a + b.dayspastDue, 0)) / totCustomers);
    let totOpenInvoices = dataBussCode.reduce((a, b) => a + b.isOpen, 0);
    if (buss_code === "") {
        totCustomers = data.length;
        totOpenAR = data.reduce((a, b) => a + b.actualOpenAmount, 0.0);
        avgDaysDelay = Math.ceil((data.reduce((a, b) => a + b.dayspastDue, 0)) / totCustomers);
        totOpenInvoices = data.reduce((a, b) => a + b.isOpen, 0);
        
    }
    return (
      <Grid 
        container 
        spacing={16}>

        <Grid item  xs={12}>
          <Paper className={classes.paper}><Header/></Paper>
        </Grid>

        <Grid item xs = {12} style={{marginLeft: "1vw",marginRight: "1vw",marginTop: "-2.5vh",marginBottom: "0.2vh"}}>
          <Grid container direction = "row" spacing={16} > 
            <Grid item xs={3} autoid="total-customers-text-collector">
              <Paper className={classes.paper} style={{backgroundColor:"#1B1F38"}}><Cards heading="Total Customer" value={totCustomers}/></Paper>
            </Grid>
            <Grid item xs={3} autoid="total-open-ar-text-collector"> 
              <Paper className={classes.paper} style={{backgroundColor:"#1B1F38"}}><Cards heading="Total Open AR" value={"$"+totOpenAR.toFixed(2)}/></Paper>
            </Grid>
            <Grid item xs={3} autoid="average-days-delay-text-collector">
              <Paper className={classes.paper} style={{backgroundColor:"#1B1F38"}}><Cards heading="Average Days Delay" value={avgDaysDelay}/></Paper>
            </Grid>
            <Grid item xs={3} autoid="total-open-invoice-text-collector">
              <Paper className={classes.paper} style={{backgroundColor:"#1B1F38"}}><Cards heading="Total open invoice" value={totOpenInvoices}/></Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid 
          container 
          spacing={16} 
          style={{
            marginLeft: "0.8vw",
            marginRight: "0.8vw",
            //marginBottom: "0.5vh",
            }}>
              
          <Grid item xs={4} style={{marginTop: "-1.5vh"}}>         
            <Grid 
              container 
              direction="column"
              spacing={16} 
              >

              <Grid item xs={12}>
                <Paper className={classes.paper} style={{backgroundColor:"#1B1F38"}}><Chart  callback={this.formChild1.bind(this)} /></Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper} style={{backgroundColor:"rgb(93,175,240,0.2)"}}><Search/></Paper>
              </Grid>

            </Grid>
          </Grid>

          <Grid 
            item xs={8} 
            //style={{
              //marginLeft: "auto", 
              //marginRight: "auto", 
              //marginTop: "auto",
              //marginBottom: "auto"
              //}}
            >
            <Paper 
              className={classes.paper} 
              style={{
                backgroundColor:"#1B1F38", 
                height:"auto",
                marginLeft: "auto", 
                marginRight: "auto", 
                }}>
                  <Table/>
            </Paper>
          </Grid>

        </Grid>
        <Footer/>
      </Grid>
    );
  }
}
export default withStyles(styles, { withTheme: true })(CollectorDashboard);