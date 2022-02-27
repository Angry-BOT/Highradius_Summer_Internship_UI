import React from 'react';
import axios from 'axios';
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



let counter = 0;
function createData(pkId,companyId,acctDocHeaderId,documentNumber,businessCode,doctype,customerNumber,
  fkCustomerMapId,customerName,documentCreateDate,baselineCreateDate,invoiceDateNorm,invoiceId,totalOpenAmount,custPaymentTerms,clearingDate,
  isOpen,shipDate,paidAmount,dayspastDue,documentId,documentCreationDate,actualOpenAmount,invoiceAge,invoiceAmountDocCurrency,
  predictedPaymentType, predictedAmount) {
  counter += 1;
  return { id: pkId,companyId,acctDocHeaderId,documentNumber,businessCode,doctype,customerNumber,
    fkCustomerMapId,customerName,documentCreateDate,baselineCreateDate,invoiceDateNorm,invoiceId,totalOpenAmount,custPaymentTerms,clearingDate,
    isOpen,shipDate,paidAmount,dayspastDue,documentId,documentCreationDate,actualOpenAmount,invoiceAge,invoiceAmountDocCurrency,
    predictedPaymentType, predictedAmount};
}

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
  { id: 'predictedPaymentType', numeric: true, disablePadding: false, label: 'Predicted Payment Type' },
  { id: 'predictedAmount', numeric: true, disablePadding: false, label: 'Predicted Amount' },
  
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
    paddingRight: 8,
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

let EnhancedTableToolbar = props => {
  const { self, numSelected, classes } = props;

  return (
    <Toolbar 
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div style={{margin: "-1rem"}}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" style={{marginLeft:"0.5vw", fontSize: "1.5rem",color:"white"}}>
            Invoices
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          
          <Button 
            autoid = "predict-button" 
            variant="contained" 
            size = "medium" 
            className = {classes.button} 
            onClick = {self.callPredict}
            style = {{marginRight: "0.5vw"}}
          > 
            Predict
          </Button>
        ) : (
            <Button 
              autoid = "predict-button" 
              variant="contained" 
              size = "medium" 
              className = {classes.button} 
              disabled
              style = {{marginRight: "0.5vw"}}
            > 
            Predict 
            </Button>

        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '96%',
    marginTop: "-1rem",
    color: "rgb(93,175,240,0.5)"

  },
  table: {
    minWidth: "90%",
    backgroundColor: "#1B1F38"

  },
  tableWrapper: {
    backgroundColor: "#1B1F38",
    overflowX: 'scroll',
    overflowY: 'scroll',
    height :"auto",
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


class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'pkId',
    records: [],
    selected: [],
    tabledata: [],
    page: 0,
    rowsPerPage: 15,
  };
  //getting the JSON from http get request from the link
  componentDidMount(){
    axios.get('http://localhost:8080/1705819/dataservlet')
      .then(res => this.setState({ tabledata : res.data}))
      .catch(err => console.log(err))
  }

  callPredict = () => {
    this.state.records.map(k =>{
      //const records = this.state.records;
      console.log(k)
      axios.post('http://127.0.0.1:5000/predict?',
      {},
      {
          headers : {'Content-type':'application/json'},
          params : {
          data : {
            id : '1705819',
            data : k
          }
        }
      })
      .then(response=>{
        console.log('In response')
        console.log('Responsed data',response.data)

        const records = this.state.tabledata
        records.map(a=>{
          if(a.documentNumber === response.data[0].documentNumber)
          {
            var b = a.actualOpenAmount - response.data[0].predictions
            console.log(b);
            a['predictedAmount'] = response.data[0].predictions
            if(b<=0)
            {
              a['predictedPaymentType']="Fully paid";
              console.log("Fully paid");
            }
            else{
              a['predictedPaymentType']="Partially paid";
              console.log("Partially paid");
            }
          }
        })
    
        this.setState({data: records})
      })
      .catch(error => console.log(error.message))
    })
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
      this.setState(state => ({ selected: state.tabledata.map(n => n.id) }));
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
    this.setState({ selected: newSelected});
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
    const { tabledata, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tabledata.length - page * rowsPerPage);

    return (
      <Paper 
        className={classes.root}
        style={{
          backgroundColor:"rgb(93,175,240,0.5)",
          height:'75.5vh', 
          marginLeft: "auto",
          marginRight: "3vw",
          marginBottom: "auto",
          marginTop: "-1.5vh"}} 
          >
            
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          self = {this}/>

        <div 
          autoid = "invoice-table-collector" 
          className={classes.tableWrapper} 
          style={{
            height: "63vh",
            marginLeft: "0.7vw", 
            marginRight: "0.7vw", 
            marginTop:"auto",
            marginBottom: "auto"}}
        >
          <Table className={classes.table} style={mystyle.darkbg} aria-labelledby="tableTitle">
            <EnhancedTableHead
              style={{color:"white"}}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={tabledata.length}
            />
            <TableBody >
              {stableSort(tabledata, getSorting(order, orderBy))
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
                      <TableCell style={mystyle.title2} align="right">{n.predictedPaymentType}</TableCell>
                      <TableCell style={mystyle.title2} align="right">{n.predictedAmount}</TableCell>
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
        <div autoid = "invoice-table-pagination-collector">
          <TablePagination
            autoid = "invoice-table-pagination-collector"
            style={{color: "white", marginTop:"0.5vh", marginBottom:"0.5vh"}}
            rowsPerPageOptions={[5, 10, 15]}
            component = "div"
            count = {tabledata.length}
            rowsPerPage={rowsPerPage}
            page = {page}
            backIconButtonProps = {{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps = {{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);