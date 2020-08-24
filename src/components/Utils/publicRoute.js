import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from './common.js'

function publicRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => !getToken() ? <Component {...props}/> : <Redirect to={{pathname: '/dashboard'}}/>}
        />
    )
}

export default publicRoute;
