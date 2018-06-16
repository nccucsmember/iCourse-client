import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import SelectList from '../containers/Select/SelectList.jsx';

function SelectRoute() {
  return (
    <Switch>
      <Route exact path="/select" component={SelectList} />
    </Switch>
  );
}
export default SelectRoute;
