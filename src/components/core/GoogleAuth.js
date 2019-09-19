import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './../../store/actions';
import Button from '@material-ui/core/Button';
class GoogleAuth extends React.Component {
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
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
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
                <Button color="inherit" onClick={this.onSignOutClick}>Logout</Button>
            );
        } else {
            return (
                <Button color="inherit" onClick={this.onSignInClick}>Login</Button>
            );
        }
    }


    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };

}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);