import React from 'react';
import Fab from '@material-ui/core/Fab';
class SeatButton extends React.Component {
    render() {
        const style = {
            margin: '10px', height: '30px', width: '35px',
            background: this.props.color
        }
        return (
            <Fab
                onClick={(event) => {
                    this.props.onClick(event, this.props.color);
                }}
                color="primary" aria-label="seat" style={style} size="small">
                {this.props.seatNumber}
            </Fab>
        );
    }
}

export default SeatButton;