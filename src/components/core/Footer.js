import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const style = {
    textAlign: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%'
}
const Footer = () => {
    return (
        <footer style={style}>
            <AppBar position="static">
                <Typography variant="h6">
                    Airline Application | Airline Model using ReactJs
                </Typography>
            </AppBar>
        </footer>
    );
}

export default Footer;