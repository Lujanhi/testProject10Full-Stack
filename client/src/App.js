import React, { Component } from 'react';
import './global.css';

//import necessary Components from react-router-dom module
//https://reacttraining.com/react-router/web/example/url-params
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import our Components to be displayed in this App Component
import Header from './components/Header';

//import components for Routes
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

//privateRoute already contains context, so no need to withContext()
//'polices' the routes it's associated wtih: you must be logged in to access these
import PrivateRoute from './PrivateRoute';

//get the withContext method from the Context JS
import withContext from './components/Context';

//define components which contain the Context proivded by withContext()
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

//use withContext components in routes and the render as required
//use the non-context for those which do not need Context (good practice)
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route exact path="/signin" component={UserSignInWithContext} />} />
          <Route exact path="/signup" component={UserSignUpWithContext} />
            <Route exact path="/signout" component={UserSignOutWithContext} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/notfound" component={NotFound} />
            <Route exact path="/forbidden" component={Forbidden} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/courses/:id" component={CourseDetailWithContext} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;