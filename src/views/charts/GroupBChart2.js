/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render sow & invoice bar chart
 * Associated Route/Usage: /upload
*/

import React, { useState} from 'react';
import graphService from '../../services/graphService';
import Chart from 'react-apexcharts';

const GroupBChart2 = ({params}) => {
  var [data, setData] = useState({});
  if(!data.hasOwnProperty('series')){
    /**
     * Service call to fetch chart data
     * @ params : Object
    */
    graphService.sowGraph(params).then(res => {
      var datas = {
          series:res.series,
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            colors:["#f0f1f5","#f73a44"],
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: res.xaxis,
            },
            yaxis: {
              title: {
                text: 'Nos'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return  val + " Nos"
                }
              }
            }
          },
      }
      setData(datas);
    });
  }

  return (
    <div className="soa-graph">
        {data.series &&       
          <Chart options={data.options} series={data.series} type="bar" height={200} />
        }
    </div>
  )
}

export default GroupBChart2;