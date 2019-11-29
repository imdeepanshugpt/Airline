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
                <Typography variant="h6" style={{
                    margin: '10px',
                    fontSize: 'medium'
                }}
                >
                    Airline Application | Airline Model using ReactJs
                </Typography>
            </AppBar>
        </footer >
    );
}

export default Footer;