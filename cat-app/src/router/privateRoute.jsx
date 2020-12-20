import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isAuthenticated} from '../utils/jwtUtil';

export const PrivateRoute = ({component: Component, layout: Layout, ...rest}) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: {from: props.location},
                    }}
                />
            )
        }
    />
);
