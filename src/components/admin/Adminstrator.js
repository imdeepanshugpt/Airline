import React from 'react';
import { Suspense } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { connect } from 'react-redux';
import { fetchPassengerDetails, fetchFlightDetails, managePassenger, updatePassengerDetails } from '../../store/actions';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../history';

const PieChart = React.lazy(() => import('./PieChart'));
const PassengerList = React.lazy(() => import('../features/PassengerList'));
const SimpleCard = React.lazy(() => import('./Card'));
const Form = React.lazy(() => import('./Form'));

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const Admin = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selection, setOption] = useState('Analytics');
    const [managePassenger, setManagePassenger] = useState(undefined);
    useEffect(() => {
        (async (props) => {
            props.fetchPassengerDetails();
            props.fetchFlightDetails();
        })(props)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const setSelection = (type) => {
        setOption(type);
    }
    const renderPassengerDetails = (passenger) => {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ padding: '10px' }}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>PNR Number</TableCell>
                                    <TableCell>Seat Number</TableCell>
                                    <TableCell>Ancillary services</TableCell>
                                    <TableCell>wheel chair</TableCell>
                                    <TableCell>Infant</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{passenger.name}</TableCell>
                                    <TableCell>{passenger.id}</TableCell>
                                    <TableCell>{passenger.seatNumber}</TableCell>
                                    <TableCell>{passenger.ancillaryService}</TableCell>
                                    <TableCell>
                                        {passenger.wheelChair ?
                                            ((passenger.wheelChair === "Yes") || (passenger.wheelChair === true)) ?
                                                "Yes" : "No" : 'No'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {passenger.infants ?
                                            ((passenger.infants === "Yes") || (passenger.infants === true)) ?
                                                "Yes" : "No" : 'No'
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                <div style={{ padding: '10px' }}>
                    <Paper style={{ padding: '10px' }}>
                        <Suspense fallback={<CircularProgress />}>
                            <Form />
                        </Suspense>
                    </Paper>
                </div>
            </div>
        );
    }
    const fetchPassengerDetails = (event) => {
        let managePassenger = props.passengerList.filter((passenger) => {
            return (Number(passenger.id) === Number(event.target.value))
        });
        if (managePassenger.length > 0) {
            setManagePassenger(managePassenger[0]);
            props.managePassenger(managePassenger[0]);
        } else if (managePassenger.length === 0) {
            setManagePassenger(undefined);
        }
    }
    const renderAdminData = (props) => {
        if (selection === 'Analytics') {
            return (
                <div className="main" style={{ display: 'flex', 'flexWrap': 'wrap' }}>
                    <div className="widget" style={{ width: '500px', padding: '5px' }}>
                        <div className="chart">
                            <Suspense fallback={<CircularProgress />}>
                                <PieChart
                                    passengers={props.passengerList.length}
                                    seatsAvailable={props.flights.length * 60} >
                                </PieChart>
                            </Suspense>
                        </div>
                    </div>
                    <div className="widget" style={{ width: '500px', padding: '5px' }}>
                        <Suspense fallback={<CircularProgress />}>
                            <SimpleCard title="Number of flights" data={props.flights.length} />
                        </Suspense>
                    </div>
                </div>
            );
        } else if (selection === 'Passenger List') {
            return (
                <div className="passengerlist">
                    <Suspense fallback={<CircularProgress />}>
                        <PassengerList adminFlag={true}></PassengerList>
                    </Suspense>
                </div>
            );
        } else if (selection === 'Manage Passenger') {
            return (
                <div className="managePassenger">
                    <input className="search-input" type="text" name="search" placeholder="Enter PNR Number"
                        onChange={(event) => fetchPassengerDetails(event)} />
                    {
                        managePassenger ?
                            renderPassengerDetails(managePassenger) : ''
                    }
                </div>
            );
        }

    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Tooltip title="menu">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <div style={{
                        fontSize: 'medium',
                        wordBreak: 'break-word',
                        width: '40%'
                    }}>
                        Admin Dashboard
                    </div>
                    <Tooltip title="home">
                        <Button color="inherit"
                            onClick={() => { history.push("/") }}
                            style={{ position: 'absolute', right: 0, marginRight: '10px' }}
                        >
                            Back to home
                        </Button>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Passenger List', 'Analytics', 'Manage Passenger'].map((text, index) => (
                        <ListItem button key={text} onClick={() => setSelection(text)}>
                            <ListItemIcon>
                                {
                                    index % 2 === 0 ?
                                        <Tooltip title="passenger">
                                            <FaceIcon />
                                        </Tooltip>
                                        :
                                        <Tooltip title="analytics">
                                            <AssessmentIcon />
                                        </Tooltip>
                                }
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content} style={{ width: '100%', overflow: 'auto' }}>
                <h2>{selection}</h2>
                {renderAdminData(props)}
            </main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        flights: state.airline.flights,
        passengerList: state.airline.passengers
    };
}
export default connect(mapStateToProps,
    {
        fetchPassengerDetails,
        fetchFlightDetails,
        managePassenger,
        updatePassengerDetails
    })(Admin);