import React from 'react';
import axios from 'axios';
import crossfilter from 'crossfilter2';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        axios.get(`http://localhost:8080/1705819/dataservlet`)
        .then(res => {
        this.setState({data:res.data})
        })
    }

    render(){
        const { callback } = this.props;
    
        var dataCross = crossfilter(this.state.data);
        //console.log("data = ",dataCross.all());
        
        var businessCode = dataCross.dimension(d => d.businessCode);
        var groupBusinessCode = businessCode.group().reduceSum(d => d.actualOpenAmount) ;
   
        function dataForHighChart(groups) {    
            var categories = [];
            var data = [];
            var group_data = groups.all();
      
            group_data.forEach(d=>{
                categories.push(d.key);
                data.push(d.value);
            })
      
            return {
                categories: categories,
                data: data
            }
        }
  
        var firstObject = dataForHighChart(groupBusinessCode)
        //console.log(" dd ",groupBusinessCode.all())

        function getContent(arr) {
            console.log(arr[0]);
            callback(arr[0]);     
        };


        const options = {
            chart: {
                height: '375vh',
                backgroundColor: 'rgb(93,175,240,0.5)',
                type: 'bar',
                scrollablePlotArea: {
                    minHeight: 1200
                }
            },
            title: {
                text: 'Total Open Amount By Company Code',
                style: {
                    color: 'white'
                }   
            },
            xAxis: {
                categories: firstObject.categories,
                labels: {
                    style: {
                        color: 'white'
                    }
                },
                min: 0,
            },
            yAxis: {
                gridLineWidth: 0,
                labels: false
            },
            plotOptions : {
                series : {
                    point : {
                        events : {
                            click: function () {

                                this.select(null, false);
                                var selectedPoints = this.series.chart.getSelectedPoints();
     
                                var filteredPoints = [];
                                for (let index = 0; index < selectedPoints.length; index++) {
                                    filteredPoints.push(selectedPoints[index].category);
                                }
                                function multivalue_filter(values) {
                                    return function (v) {
                                        return values.indexOf(v) !== -1;
                                    }
                                }
     
                                if (filteredPoints === 0) {
                                    businessCode.filterAll();
                                }
                                else {
                                    businessCode.filterFunction(multivalue_filter(filteredPoints));
                                }
                                console.log(filteredPoints[0]);
                                getContent(filteredPoints);
                            }
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                data : firstObject.data,
                label : false
            }]
        }
        return (
        <div style = {{ height:"36vh", width: '33.2vw'}} class="container" autoid = "companycode-chart">
            <HighchartsReact
                highcharts = {Highcharts}
                options = {options} />
        </div>
        );
    }
}

Chart.protoTypes = {
    callback: PropTypes.function,
}

export default (Chart);