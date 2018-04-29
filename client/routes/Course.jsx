import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import CourseList from '../containers/Course/CourseList.jsx';

function CourseRoute() {
  return (
    <Switch>
      <Route exact path="/course" component={CourseList} />
    </Switch>
  );
}
export default CourseRoute;
