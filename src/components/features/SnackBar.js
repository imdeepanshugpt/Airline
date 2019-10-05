import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class SnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: this.props.open, message: this.props.message };
    }

    componentWillReceiveProps(){
        this.setState({ open: this.props.open, message: this.props.message });
    }

    render() {
        return (
            <div className="snackbar" >
                <Snackbar
                    message={this.state.message}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={() => this.setState({ open: false })}
                />
            </div>
        );
    }
}
export default SnackBar;
