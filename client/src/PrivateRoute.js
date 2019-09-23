import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './components/Context';

//Render the Component if context.autheticatedUser is logged in, otherwise Redirect to the /signin route

export default ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {context => (
                <Route
                    {...rest}
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={{
                                pathname: '/signin',
                                state: { from: props.location }
                            }} />
                        )
                    }
                />
            )}
        </Consumer>
    );
};