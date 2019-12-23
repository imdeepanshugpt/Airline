import React from 'react';
import Fab from '@material-ui/core/Fab';
class SeatButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color
        };
    }
    render() {
        const style = {
            margin: '10px', height: '30px', width: '35px',
            background: this.state.color
        }
        return (
            <Fab
                onClick={(event) => {
                    if (this.props.color === "" && (this.state.color === this.props.color)) {
                        this.setState({ color: 'lightgreen' });
                    } else if (this.state.color === 'lightgreen') {
                        this.setState({ color: this.props.color });
                    }
                    this.props.onClick(event, this.props.color);
                }}
                color="primary" aria-label="seat" style={style} size="small">
                {this.props.seatNumber}
            </Fab>
        );
    }
}

export default SeatButton;