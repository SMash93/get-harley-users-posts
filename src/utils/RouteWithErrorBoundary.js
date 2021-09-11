import React from "react";
import { Route, useLocation } from "react-router";
import useErrorBoundary from "use-error-boundary";
import ErrorFallback from "../components/ErrorFallBack/ErrorFallBack";

const RouteWithErrorBoundary = props => {
  const location = useLocation();
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <>
      {didCatch ? (
        <ErrorFallback error={error} />
      ) : (
        <ErrorBoundary key={location.pathname}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Route {...props} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default RouteWithErrorBoundary;
