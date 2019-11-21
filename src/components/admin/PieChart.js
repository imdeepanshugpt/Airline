import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class PieChart extends React.Component {
    render() {
        let chartData = {
            datasets: [{
                data: [this.props.passengers, this.props.seatsAvailable],
                backgroundColor: ['lightgreen', 'red']
            }],
            labels: [
                'Passengers',
                'Seats Available',
            ]
        };
        let chartOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animationSteps: 100,
            animationEasing: 'easeOutBounce',
            animateRotate: true,
            animateScale: true,
            responsive: true,
            maintainAspectRatio: true,
            showScale: true
        };
        return (
            <Card>
                <CardContent style={{ textAlign: "center" }}>
                    <Typography color="textSecondary" gutterBottom>
                        Passenger Chart
                    </Typography>
                    <Doughnut data={chartData} options={chartOptions} width={500} height={250} />
                </CardContent>
            </Card>
        );
    }
}

export default PieChart;