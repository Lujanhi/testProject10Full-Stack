import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//CourseDetail is context-free so Data has to be imported itself
import Data from '../Data';

//react-Markdown Support for Course Detail - description and materialsNeeded
//renders linebreaks as <p>, * as li, and other stylize conversions
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  constructor () {
    //execute default constructor
    super();

    //default state: courses empty array, isLoading boolean true, courseWasFound false, found ID null
    this.state = {
      course: null,
      isLoading: true,
      courseWasFound: false,
      id: null
    };

    //bind the action to current instance this
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  fetchCourseById = (courseId) => {
    //when loading the page, empty the state variables
    //so the render will show default state while the courses load
    //courseWasFound - reset all of the state variables
    this.setState({ course: null, isLoading: true, courseWasFound: false, id: null });
    
    const data = new Data();

    data.getCourseById(courseId)
    .then(responseData => {
      //if responseData.id is not null, we have a course JSON
      //if it is null, we've got an error message of some kind
      if (responseData.id)
      {
        this.setState({ course: responseData, isLoading: false, courseWasFound: true, id: responseData.id });
      }
      else
      {
        this.setState({ course: responseData, isLoading: false, courseWasFound: false, id: -1 });
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  //method to produce JSX for a course JSON
  convertJsonToCourseContent = (course) => {
    return <div className="bounds course--detail">
    <div className="grid-66">
    <div className="course--header">
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{course.title}</h3>
      <p>By {course.user.firstName} {course.user.lastName}</p>
    </div>
    <div className="course--description">
        
      <ReactMarkdown>{course.description}</ReactMarkdown>
      
    </div>
  </div>
  <div className="grid-25 grid-right">
    <div className="course--stats">
      <ul className="course--stats--list">
        <li className="course--stats--list--item">
          <h4>Estimated Time</h4>
          
          <h3>{course.estimatedTime}</h3>
        </li>
        <li className="course--stats--list--item">
          <h4>Materials Needed</h4>
          <ul> 
            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  </div>
  }

  //once component is loaded, get the course for the ID that is in the URI (:id)
  componentDidMount() {
    this.fetchCourseById(this.props.match.params.id);
  }

  render() {
    let courseFound = null;
    
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    //if the course has the JSON then display it - has to be courseWasFound=true
     if (this.state.course)
     {
       if (this.state.courseWasFound) {
        courseFound = this.convertJsonToCourseContent(this.state.course);
      }
      //if state.course is not null but courseWasFound = false, redirect to the notfound route
      else
      {
        return <Redirect to='/notfound' />
      }
     }
     
       //don't need to directly check on this.state.isLoading - if we get here
       //no course has been loaded yet = display the generic Loading panel
       else
       {
        courseFound = <li>Loading...</li>;
       }
 
       //render the course-container with whatever courseFound is assigned to
     return <div>
     <div className="actions--bar">
       <div className="bounds">
       <div className="grid-100">
         {/* inline conditional: if a course was found,
             and a user is logged in
             and that user's id matches the courses's user's id, 
             THEN show the update and delete buttons.
             ELSE, show nothing 
         */}
         {this.state.courseWasFound && authUser && authUser.id === this.state.course.user.id ? (
              <React.Fragment>
                <span><a className="button" href={"/courses/" + this.props.match.params.id + "/update"}>Update Course</a><button className="button" onClick={this.deleteCourse}>Delete Course</button></span>
              </React.Fragment>
            ) : (
              <React.Fragment>
              </React.Fragment>
            )}
            <a className="button button-secondary" href="/courses/">Return to List</a></div>
       </div>
     </div>
       {courseFound}
   </div>;

  }

  //execute deletion - no warning
  //deletion is not tied to a route in this application (e.g. DELETE /courses/:id) so
  //access to this operation is already protected: no need to check auth or ownership
  deleteCourse = () => {
    const { context } = this.props;

    const id = this.state.id;

    context.data.deleteCourse(id, context.authenticatedUser, context.authenticatedUserPwd)
      .then( courseDeleteResult => {
        if (!courseDeleteResult.length) {
          //DELETE is complete, return to list
          this.props.history.push('/');

        } else {
          //THIS SHOULD NEVER BE REACHED - deleteCourse should always return something
          //if no response from DELETE operation go to the general error page
          this.props.history.push('/error');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  
  }

}



export default CourseDetail;