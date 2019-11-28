import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const style = {
    textAlign: 'center',
    width: '100%',
    marginTop: 'auto'
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