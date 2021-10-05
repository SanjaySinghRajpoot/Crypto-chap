import React from 'react'
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for(let i = 0; i<coinHistory?.data?.history?.length; i++)
    {
      coinPrice.push(coinHistory.data.history[i].price);
      coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleString());

    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    }
                }
            ]
        }
    }
    
    return (
       <>
         <Row className="chart-header">
           <Title level={2} className="chart-title">{coinName} Price chart</Title>
         </Row>
         <Line data={data} options={options}/>
       </>
    )
}

export default LineChart
