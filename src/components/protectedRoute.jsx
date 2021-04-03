import { Redirect, Route } from 'react-router-dom';
import auth from './../services/authService';

const ProtectedRoute = ({ path, component: Component, render, location, ...rest }) => {

    return (
        <Route
            path={path}
            render={props => {
                const authUser = auth.getAuthenticatedUser();

                if (!authUser)
                    return <Redirect to={{
                        pathname: '/login',
                        state: { from: location.pathname }
                    }} />;
                return Component && <Component {...props} {...rest} /> || render(props);
            }}
        />
    )









}

export default ProtectedRoute;