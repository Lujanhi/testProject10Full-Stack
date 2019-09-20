import React from 'react';
import { Link } from 'react-router-dom';

//withRouter gives the Header access to the 'this.props.location' attribute, allowing pathname
//to be set to a variable and passed to the SignIn and SignUp Link clicks (UserSignIn and UserSignUp components)
import { withRouter } from 'react-router';

class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        const pathway = this.props.location.pathname;

        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        {/* inline conditional: if authUser is not null, user is logged in. If not, offer sign up and sign in links */}
                        {authUser ? (
                            <React.Fragment>
                                <span>Welcome, {authUser.firstName + " " + authUser.lastName}!</span>
                                <Link to="/signout">Sign Out</Link>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    <Link className="signup" to={{
                                        pathname: '/signup',
                                        state: { from: pathway }
                                    }} >Sign Up</Link>
                                    <Link className="signin" to={{
                                        pathname: '/signin',
                                        state: { from: pathway }
                                    }} >Sign In</Link>
                                </React.Fragment>
                            )}
                    </nav>
                </div>
            </div>
        );
    }
};

export default withRouter(Header);