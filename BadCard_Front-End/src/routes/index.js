// @flow
import React, { Suspense, PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Loader from "components/loader";
import NotFoundPage from "modules/common/pages/404";

import { history } from "store";
import { type AuthStateType } from "reducers/auth";
import { isAuthenticated, isUserInitiated } from "selectors/auth";

import routes from "./routes";
import PrivateRoute from "./Private";
import PublicRoute from "./Public";

type RoutesProps = {
  isAuthenticated: Boolean,
  isUserInitiated: Boolean,
  currentUserRole: $PropertyType<AuthStateType, "role">
};

class Routes extends PureComponent<RoutesProps> {
  render() {
    const { isAuthenticated, isUserInitiated, currentUserRole } = this.props;
    return (
      <Fragment>
        {isUserInitiated ? (
          // $FlowFixMe
          <ConnectedRouter history={history}>
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route, i) => {
                  if (route.auth) {
                    return (
                      <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        currentUserRole={currentUserRole}
                        key={i}
                        {...route}
                      />
                    );
                  }
                  return <PublicRoute key={i} {...route} />;
                })}
                <Route component={NotFoundPage} />
              </Switch>
            </Suspense>
          </ConnectedRouter>
        ) : (
          <Loader />
        )}
      </Fragment>
    );
  }
}

const Actions = {};

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
    isUserInitiated: isUserInitiated(state),
    currentUserRole: state.auth.role
  };
}

export default connect(mapStateToProps, Actions)(Routes);
