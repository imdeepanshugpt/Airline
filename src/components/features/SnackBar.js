import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class SnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: true, message: this.props.message };
    }
    render() {
        return (
            <div className="snackbar" >
                <Snackbar
                    message={this.state.message}
                    open={this.state.open}
                    autoHideDuration={1000}
                    onClose={() => this.setState({ open: false })}
                />
            </div>
        );
    }
}
export default SnackBar;
