import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from '../Data';
const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        authenticatedUserPwd: Cookies.get('authenticatedUserPwd') || null
    };
    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        //retrieve authentication tokens from the variable
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
            //using layout JSX
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

            
            const cookieOptions = {
                expires: 1 
            };

            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
            Cookies.set('authenticatedUserPwd', password, cookieOptions);
            
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
