import React from 'react';
import { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import history from '../../history';
import Tooltip from '@material-ui/core/Tooltip';

const GoogleAuth = React.lazy(() => import('./GoogleAuth'));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="home">
            <IconButton edge="start" onClick={() => { history.push("/") }} className={classes.menuButton} color="inherit" aria-label="menu">
              <FlightTakeoffIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            Airline
          </Typography>
          <Suspense fallback={<div>Loading...</div>}>
            <GoogleAuth />
          </Suspense>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;