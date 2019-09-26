import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export class SnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.state({
            open: false
        });
    }
    render() {
        return (
            <div>
                {/* <Snackbar
                    open={}
                    onClose={() => { this.setState({ open: false }) }}
                    TransitionComponent={transition}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">I love snacks</span>}
                /> */}
            </div>
        );
    }
}