import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { CSVLink } from "react-csv";
import { callDummyAPI } from '../services/services';
import InputLabel from '@material-ui/core/InputLabel';
import CustomerDetailsHeader from "../components/CustomerDetailsHeader";
import Footer from '../components/Footer';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'pkId', numeric: true, disablePadding: true, label: 'pk ID' },
  { id: 'companyId', numeric: true, disablePadding: false, label: 'Company ID' },
  { id: 'acctDocHeaderId', numeric: true, disablePadding: false, label: 'Account Doc Header ID' },
  { id: 'documentNumber', numeric: true, disablePadding: false, label: 'Document Number' },
  { id: 'businessCode', numeric: false, disablePadding: false, label: 'Business Code' },
  { id: 'doctype', numeric: false, disablePadding: false, label: 'Doc Type' },
  { id: 'customerNumber', numeric: true, disablePadding: false, label: 'Customer Number' },
  { id: 'fkCustomerMapId', numeric: true, disablePadding: false, label: 'Fk Customer Map ID' },
  { id: 'customerName', numeric: false, disablePadding: false, label: 'Customer Name' },
  { id: 'documentCreateDate', numeric: false, disablePadding: false, label: 'Document Create Date' },
  { id: 'baselineCreateDate', numeric: false, disablePadding: false, label: 'Baseline Create Date' },
  { id: 'invoiceDateNorm', numeric: false, disablePadding: false, label: 'Invoice Date Norm' },
  { id: 'invoiceId', numeric: true, disablePadding: false, label: 'Invoice ID' },
  { id: 'totalOpenAmount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
  { id: 'custPaymentTerms', numeric: true, disablePadding: false, label: 'Cust Paying Terms' },
  { id: 'clearingDate', numeric: false, disablePadding: false, label: 'Clearing Date' },
  { id: 'isOpen', numeric: true, disablePadding: false, label: 'isOpen' },
  { id: 'shipDate', numeric: false, disablePadding: false, label: 'Ship Date' },
  { id: 'paidAmount', numeric: true, disablePadding: false, label: 'Paid Amount' },
  { id: 'dayspastDue', numeric: true, disablePadding: false, label: 'Days Past Due Date' },
  { id: 'documentId', numeric: true, disablePadding: false, label: 'Document ID' },
  { id: 'documentCreationDate', numeric: false, disablePadding: false, label: 'Document Creation Date' },
  { id: 'actualOpenAmount', numeric: true, disablePadding: false, label: 'Actual Open Amount' },
  { id: 'invoiceAge', numeric: true, disablePadding: false, label: 'Invoice Age' },
  { id: 'invoiceAmountDocCurrency', numeric: true, disablePadding: false, label: 'Invoice Amount Doc Currency' },
  
];

class EnhancedTableHead extends React.Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead style={{backgroundColor: "rgba(27,31,56,1)"}}>
        <TableRow style={{backgroundColor: "rgba(27,31,56,1)"}}>
          <TableCell padding="checkbox">
            <Checkbox
             style={mystyle.title2}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell style={mystyle.darkbg}
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip style={mystyle.title}
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel style={mystyle.title}
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingTop: "2vh",
    paddingBottom: "auto",
    paddingRight: "auto",
    paddingLeft:"auto"
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: "rgba(27,31,56,1)"
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: "rgba(27,31,56,1)",
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data:[],
      records: this.props.rec,
      filteredData:[],
      query: this.props.custdata,
      order: 'asc',
      orderBy: 'pkId',
      selected: [],
      page: 0,
      totalar:[],
      totalin:[],
      rowsPerPage: 15,
    };
    console.log("passed=",this.state.query);
  }
  componentDidMount() {
    
    fetch(`http://localhost:8080/1705819/dataservlet`)
    .then(response => response.json())
    .then(data => {
      const { query } = this.state;
      const filteredData = data.filter(element => {
        return element.customerName?element.customerName.includes(query[0]):null;
      });
      this.setState({
        data: filteredData
      })
  
      const temp = this.state.data;
      var ar = 0;
      var totalinv = 0;  
      temp.map(e=>{
        ar = ar + parseInt(e.actualOpenAmount,10)     
        totalinv = totalinv + parseInt(e.isOpen,10)
      })
    
      console.log(ar + " d " + " d " + totalinv)
      this.setState({
        totalar: ar,
        totalin: totalinv,
      })
      console.log(" yes " + this.state.totalar + " yes " + this.state.totalin)
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    const { select, classes } = this.props;
    const c = select[0];
    callDummyAPI(c,document.getElementById("openAmt").value,document.getElementById("doctype").value)
        this.setState({ open: false });
        if(!document.getElementById("openAmt").value&&!document.getElementById("doctype").value)
        {
          console.log("empty");
        }
        else
        {
          window.location.reload();
        }
  };
 
 handlecancel=()=>{
  this.setState({ open: false });
 }
  
  render()
  {
    const { numSelected, classes } = this.props;
  return (
    <Toolbar
      className={
        classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
        })
      }
    >
    <div autoid = "modify-button"> 
      <Tooltip>
          {numSelected === 1 ? (
            <Button variant="contained" style={{textDecoration:'bold', color:"white",marginRight:'10px'}} onClick={this.handleClickOpen}> Modify </Button>
          ) : (
            <Button variant="contained" style={{textDecoration:'bold', color:"white",marginRight:'10px'}} disabled> Modify </Button>
          )}
      </Tooltip>
    </div>
    <div autoid = "export-button">
        <Tooltip>
          {numSelected > 0 ? (
            <Button variant="contained" style={{textDecoration:'bold', color:"white",marginRight:'10px'}} > 
              <CSVLink
                data = {this.state.records}
                filename="1705819_exportedData.csv"
                className="hidden"
                ref={(r) => this.csvLink = r}
                target="_blank"
                style={{textDecoration:'bold',color:'white'}}>Export
            </CSVLink>
            </Button>
          ) : (
            <Button variant="contained" style={{textDecoration:'bold', color:"white",marginRight:'10px'}} disabled> Export </Button>
          )}
        </Tooltip>
    </div>
    <Grid container 
      spacing={16}  
      direction="row"
      justify="flex-end"
      alignItems="baseline"
    >
      <Grid item autoid = "total-open-amount-customer">
        <Typography style={{fontWeight: 'normal', color:"white", fontSize:'2em'}}>
          ${this.state.totalar}
          <Typography style={{color : 'white', fontSize: '0.5em'}}>Total Open Amount</Typography>
        </Typography>
      </Grid>
      <Grid item autoid = "total-open-invoices-customer">
        <Typography style={{fontWeight:'normal', color:"white", fontSize:'2em'}}>
          {this.state.totalin}
          <Typography style={{color : 'white', fontSize: '0.5em'}}>Total Open Invoice</Typography>
        </Typography>
      </Grid>
      
    </Grid>

    <Dialog
        open = {this.state.open}
        onClose = {this.handleClose}
        aria-labelledby="mod"  >
            <DialogTitle  id="mod" style={{textDecoration:'bold', color:'white',backgroundColor:'#1B1F38'}}>
              <Typography color="inherit" variant="subtitle1" style={{color: "white",fontSize: "2rem"}}>
                Modify
              </Typography>
            </DialogTitle>
            <DialogContent style={{backgroundColor:'#1B1F38'}}>
            <form name="myform" method="post" action="/jason">
              <InputLabel htmlFor="Open Amount" style={{color:'white'}}>Open Amount</InputLabel>
              <TextField
                autoid = "open-amount-input"
                margin = "dense"
                id = "openAmt"
                label = "Open Amount"
                type = "number"
                fullWidth
              />
              <InputLabel htmlFor="ship to" style={{color:'white'}}>Document Type</InputLabel>
              <TextField
                autoid = "doctype-input"
                margin = "dense"
                id = "doctype"
                label = "Document Type"
                type = "text"
                fullWidth
              />
            </form>
          </DialogContent >
          <DialogActions style = {{backgroundColor:'#1B1F38'}}>
            <Button autoid = "modify-save-button" onClick={this.handleClose}>
              <Typography color="inherit" variant="subtitle1" style={{color: "white",fontSize: ".8rem"}}>
                Save
              </Typography>
            </Button>
            <Button autoid = "modify-cancel-button" onClick={this.handlecancel}>
              <Typography color="inherit" variant="subtitle1" style={{color: "white",fontSize: ".8rem"}}>
                Cancel
              </Typography>
            </Button>
          </DialogActions>
      </Dialog>
      {/* </div> */}

    </Toolbar>
  );}
}
 
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};
 
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
 
const styles = theme => ({
  root: {
    width: '99%',
    marginLeft:theme.spacing.unit * 1,
    marginRight:theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 1,
    backgroundColor:'#3a4366',
    height:'100%',
   
  },
  table: {
    maxWidth: 500,
    backgroundColor:'#252C48',
  
  },
  tableWrapper: {
    backgroundColor: "#1B1F38",
    overflowX: 'scroll',
    overflowY: 'scroll',
    height :"auto",
  },
 
  cells : {
    color : 'white',
    fontSize: '1.0vw',
  },
});
const mystyle={
  mybg: { 
    backgroundColor: "#1B1F38",

  },
  darkbg: {
    backgroundColor: "#1B1F38"
  },
  title: {fontSize: ".9rem",color:"rgba(255,255,255,.8)",fontWeight: 'normal',},
  title2: {fontSize: ".8rem",color:"white",paddingTop: '5px'},
}

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      records: [],
      filteredData:[],
      query: this.props.location.state.name,
      order: 'asc',
      orderBy: 'pkId',
      selected: [],
      page: 0,
      //query:
      rowsPerPage: 15,
      // open:false,
    };
    console.log("passed=",this.state.query);
  }
  //getting the JSON from http get request from the link
  componentWillMount() 
  {
    fetch(`http://localhost:8080/1705819/dataservlet`)
    .then(response => response.json())
    .then(data => {
      const { query } = this.state;
      const filteredData = data.filter(element => {
        return element.customerName?element.customerName.includes(query[0]):null;
      });

      this.setState({
        data:filteredData
      });
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id, n) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.state.records.push(n);
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (

      <Grid 
        container 
        direction = 'column' 
        spacing={16}
        >

        <Grid item  xs={12} >
          <Paper className={classes.paper}>
            <CustomerDetailsHeader customerinfo= {this.state.query}/>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper 
            className={classes.root} 
            style={{
              backgroundColor:"rgb(93,175,240,0.5)", 
              height:'87vh', 
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "-1vh"}}
            > 
              <EnhancedTableToolbar 
                custdata={this.state.query} 
                numSelected={selected.length} 
                select={this.state.selected}
                rec = {this.state.records}/>

                  <div 
                    autoid = "invoice-table-customer" 
                    className={classes.tableWrapper} 
                    style={{
                      height: "60vh", 
                      marginLeft: "1vw", 
                      marginRight: "1vw", 
                      marginTop:"3vh",
                    }}>
                    <Table 
                      className={classes.table} 
                      style={mystyle.darkbg} 
                      aria-labelledby="tableTitle">
                      <EnhancedTableHead
                        style={{color:"white"}}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                      />
                      <TableBody >
                        {stableSort(data, getSorting(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(n => {
                            const isSelected = this.isSelected(n.pkId);
                            return (
                              <TableRow 
                                hover
                                style={{height: 5}}
                                onClick={event => this.handleClick(event, n.pkId, n)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={n.pkId}
                                selected={isSelected}
                              >
                                <TableCell style={mystyle.title} padding="checkbox">
                                  <Checkbox checked={isSelected} style={mystyle.title2}/>
                                </TableCell>
                                
                                <TableCell style={mystyle.title2} component="th" scope="row" padding="none">{n.pkId}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.companyId}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.acctDocHeaderId}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.documentNumber}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.businessCode}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.doctype}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.customerNumber}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.fkCustomerMapId}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.customerName}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.documentCreateDate}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.baselineCreateDate}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.invoiceDateNorm}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.invoiceId}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.totalOpenAmount}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.custPaymentTerms}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.clearingDate}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.isOpen}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.shipDate}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.paidAmount}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.dayspastDue}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.documentId}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.documentCreationDate}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.actualOpenAmount}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.invoiceAge}</TableCell>
                                <TableCell style={mystyle.title2} align="right">{n.invoiceAmountDocCurrency}</TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 0 * emptyRows }}>
                            <TableCell colSpan={3} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div autoid = "invoice-table-pagination-customer">
                    <TablePagination
                      autoid= "invoice-table-pagination-customer"
                      style={{color: "white", height:"2vh", marginTop: "5vh", marginBottom:"auto"}}
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      backIconButtonProps={{
                        'aria-label': 'Previous Page',
                      }}
                      nextIconButtonProps={{
                        'aria-label': 'Next Page',
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </div>
                </Paper>      
          </Grid>
        <Footer/>
      </Grid>    
    );
  }
}

CustomerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(CustomerDetails);