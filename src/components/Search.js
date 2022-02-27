import React from 'react';
import { Link } from 'react-router-dom'
import './Search.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const style = (theme) => ({
    root: {
        marginTop: theme.spacing.unit * 0.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        backgroundColor:"rgb(93,175,240,0.5)",
        overflowX: 'auto',
        overflowY: 'scroll',
        height: "33vh",
        width: "auto",
        padding: '2px 2px 2px 2px',
    },
    table: {
        backgroundColor:"rgb(93,175,240,0.5)",
        marginBottom: ' auto'
    },
    cells: {
        color : 'rgb(93,175,240,0.5)',
        fontSize: '0.9vw',
        flex:1,
    },
    hr: {
        color:'white',
        fontSize:'1em',
        
    },
    title2: {
        fontSize: ".8rem",
        color:"white",
        paddingTop: '5px'},
});
const rows = [
    { id: 'customer_name', numeric: true, disablePadding: false, label: 'Customer Name' },
    { id: 'cust_number', numeric: true, disablePadding: false, label: 'Customer Number' },
    { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Open Amount'},
];

class Search extends React.Component {
    state = {
        query: "",
        data: [],
        filteredData: [],
    };

    handleInputChange = event => {
        const query = event.target.value;
        
        var filteredData
        this.setState(prevState => {
        filteredData = prevState.data.filter(element => {
            // console.log(element.customer_number.toString(10).includes(query))
                return element.customerName?element.customerName.includes(query):null;
            });
            if(filteredData.length === 0){
            filteredData = prevState.data.filter(element => {
                return (element.customerNumber.toString(10).includes(query)?element.customerName:null);
            });}

            const result = [];
            const map = new Map();
            for (const item of filteredData) {
                if(!map.has(item.customerName)) {
                    map.set(item.customerName, true);    // set any value to Map
                    result.push({
                        customerName: item.customerName,
                        customerNumber: item.customerNumber,
                        actualOpenAmount: item.actualOpenAmount
                    });
                }
            }
        filteredData=result;
        return {
            query,
            filteredData
        };
        });
    };

    getData = () => {
        fetch(`http://localhost:8080/1705819/dataservlet`)
        .then(response => response.json())
        .then(data => {
            const { query } = this.state;
            var filteredData;
            filteredData = data.filter(element => {
                return element.customerName?element.customerName.includes(query):null;
            });
            console.log(filteredData.length)
            if(filteredData === 0){
                filteredData = data.filter(element => {
                    return (element.customerNumber.toString(10).includes(query)?element.customerName:null);
                });
            }

        const result = [];
        const map = new Map();
        for (const item of filteredData) {
            if(!map.has(item.customerName))
            {
                map.set(item.customerName, true);    // set any value to Map
                result.push({
                    customerName: item.customerName,
                    customerNumber: item.customerNumber,
                    actualOpenAmount: item.actualOpenAmount
                });
            }
        }
        filteredData=result;
            this.setState({
            data,
            filteredData
            });
        });
    };
    componentWillMount() {
        this.getData();
    }

    render()
    {
        const { classes } = this.props;
        return (
            <div >
                <div className="Search" autoid = "search-text-field">
                    <div class="grid_count">
                        <div class="wrap" autoid = "search-icon">
                            <input 
                                type="text" 
                                class="input" 
                                placeholder="search for customer by customer name or number"   
                                value={this.state.query} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                </div>
                   
                <Paper className={classes.root}>
                    <Table classname={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell  style={{textDecoration:'none',color:'white'}} align="left">Customer Name</TableCell>
                                <TableCell  style={{textDecoration:'none',color:'white'}} align="center">Cust Number</TableCell>
                                <TableCell  style={{textDecoration:'none',color:'white'}} align="center">Open Amount</TableCell>    
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.filteredData.map(p=> 
                            <TableRow key={p.id} height='5'>
                                <TableCell align="left">
                                    <Link to={{pathname:"/customerdetails" ,state: { name: [p.customerName, p.customerNumber]}}} style={{textDecoration:'none',color:'white'}} >
                                        {p.customerName}
                                    </Link>
                                </TableCell>
                                <TableCell align="center" style={{textDecoration:'none',color:'white'}}>
                                        {p.customerNumber}
                                </TableCell>
                                <TableCell align="center" style={{textDecoration:'none',color:'white'}}>
                                        {p.actualOpenAmount}   
                                </TableCell>  
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>    
                </Paper>
            </div>
        );
    }
}
export default withStyles(style)(Search);