import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

//component to display a form to the user, allong sign-in to be accomplished

class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }


    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <UserForm
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password" />
                            </React.Fragment>
                        )} />
                    <p>
                        Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
                </div>
            </div>
        );
    }
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }
    submit = () => {
        const { context } = this.props;
        //load this.props.location.state which will contain the page which accessed UserSignIn
        //(passed in from the Header component). If it is null, from is set to pathname '/' (list route)
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful'] };
                    });
                } else {
                    //take the user back to the page where they came from, or '/' if no from was set
                    this.props.history.push(from);
                }
            })
            .catch((error) => {
                console.error(error);
                this.props.history.push('/error');
            });
    }
    cancel = () => {
        this.props.history.push('/');
    }
}
export default UserSignIn;