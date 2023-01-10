import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRouter = ({ component: Component, role, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			role === 'admin' ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/courses',
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

PrivateRouter.propTypes = {
	component: PropTypes.func.isRequired,
	role: PropTypes.string.isRequired,
};

export default PrivateRouter;
