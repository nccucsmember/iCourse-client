import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import TrackingList from '../containers/Tracking/TrackingList.jsx';

function TrackingRoute() {
  return (
    <Switch>
      <Route exact path="/tracking" component={TrackingList} />
    </Switch>
  );
}
export default TrackingRoute;
