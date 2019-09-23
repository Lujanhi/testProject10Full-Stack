import React, { Component } from 'react';

//Import Cookies component from the js-cookie package
import Cookies from 'js-cookie';

//Import Data from the Data.js
import Data from '../../Data';

//establish Context in react application = store application global state for entire App to access
//will include authentcation tokens (user object and password; retrieved and stored in cookies
//and also local access to the Data component, containing methods to access the api application
const Context = React.createContext();

export class Provider extends Component {

    //retrieve existing auth tokens. If they don't exist, set these to null
    state = {
        //authenticatedUser is JSON but authenticatedUserPwd is only a string
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        authenticatedUserPwd: Cookies.get('authenticatedUserPwd') || null
    };

    constructor() {
        super();
        this.data = new Data();
        //the Data object available to the application
    }

    render() {
        //retrieve auth tokens from state variable
        const { authenticatedUser, authenticatedUserPwd } = this.state;

        //define variables and methods accessible in this Provider component
        const value = {
            authenticatedUser,
            authenticatedUserPwd,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            },
        };
        return (
            //Define provider layout JSX
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    //called by UserSignIn component to authentcate user
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    authenticatedUserPwd: password,
                };
            });

            //once authenticated, set the cookie with these credentials
            //exipre the cookie in 1 day
            const cookieOptions = {
                expires: 1 // 1 day
            };

            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
            Cookies.set('authenticatedUserPwd', password, cookieOptions);
            //same as
            //Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
            //this doesn't work - though included in a previous example
            //Cookies.set('authenticatedUser', JSON.stringify(user), {{expires: 1}});
        }
        return user;
    }

    //called by UserSignOut component - set tokens to null, delete the cookie
    signOut = () => {
        this.setState({ authenticatedUser: null, authenticatedUserPwd: null });
        Cookies.remove('authenticatedUser');
        Cookies.remove('authenticatedUserPwd');
    }
}

//the export for this Component is the 'Consumer' object
export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}