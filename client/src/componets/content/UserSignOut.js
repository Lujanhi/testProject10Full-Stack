import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
    //execute signout action, go to list
    context.actions.signOut();

    return (
        <Redirect to="/" />
    );
}