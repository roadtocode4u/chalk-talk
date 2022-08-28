import React from 'react'
import './ChartDoubts.css'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartDoubts(props) {
  
  const data = {
    labels: ['pending', 'attednded', 'resolved'],
    datasets: [
      {
        label: 'Doubt Status',
        data: [props.pending, props.attended, props.resolved],
        backgroundColor: [
          '#ff704d',
          '#f0ad4e',
          '#339966'
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff'
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
        <Pie className='chart' data={data} height={300} options={{ maintainAspectRatio: false }}/>
    </div>
  )
}

export default ChartDoubts