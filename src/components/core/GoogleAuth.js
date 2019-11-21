import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './../../store/actions';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../history';
import Tooltip from '@material-ui/core/Tooltip';

class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageUrl: undefined, userName: undefined };
    }
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '84356472472-sr0vail10d5or9urtuikmin2noa4rsf0.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.OAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.OAuthChange);
            });
        });
    }

    OAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile());
            const userData = this.auth.currentUser.get().getBasicProfile();
            this.setState({ imageUrl: userData.getImageUrl(), userName: userData.getName() });
        } else {
            this.props.signOut();
            this.setState({ imageUrl: undefined, userName: undefined });
        }
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn({ prompt: 'select_account' });
    }

    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <Tooltip title="logout">
                    <Button color="inherit" onClick={this.onSignOutClick}><ExitToAppIcon /></Button>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="login">
                    <Button color="inherit" onClick={this.onSignInClick}>Login</Button>
                </Tooltip>
            );
        }
    }

    loadAdminPage() {
        history.push("/admin");
    }

    render() {
        const img = {
            display: 'inline-block',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
        };
        return (
            <div>
                <Toolbar>
                    {
                        this.props.isSignedIn ?
                            <Tooltip title="admin">
                                <Button color="inherit" onClick={this.loadAdminPage}>Admin</Button>
                            </Tooltip>
                            : ''
                    }
                    {
                        this.state.imageUrl ?
                            <img src={this.state.imageUrl} style={img} alt="user-profile-pic"></img> : ''
                    }
                    {this.renderAuthButton()}
                </Toolbar>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };

}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);