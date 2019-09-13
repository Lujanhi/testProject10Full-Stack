import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    //execute default constructor
    super();

    //default state: courses empty array, isLoading boolean true
    this.state = {
      courses: [],
      isLoading: true
    };
  }

  fetchCourses = () => {
    //when loading the page, empty the state variables
    //so the render will show default state while the images load
    this.setState({ courses: [], isLoading: true });

    //construct uri for REST API from Project 9
    const uri = "http://localhost:5000/api/courses";

    //HTTP GET the URI, convert the response data to JSON, assign the courses state variable and set state isLoading to false, signifying the courses are loaded
    fetch(uri)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ courses: responseData, isLoading: false });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  mapJsonToLIs = (course, i) => {
    return <li>{course.title}</li>;
  }

  componentDidMount() {
    this.fetchCourses();
  }

  render() {
    let courseList = [];
    let content = '';

    //if the photos aren't loading, display the name
    if (!this.state.isLoading) {
      content = "Displaying courses";
    }
    //if the courses array has content display them
    if (this.state.courses.length > 0) {
      courseList = this.state.courses.map(this.mapJsonToLIs);
    }

    //if there are no courseList in the array, and the isLoading is false, then this must be an empty search: load NotFound component
    else if (!this.state.isLoading) {
      courseList = <li>Loading...</li>;
    }
    //otherwise, display the generic Loading panel
    else {
      courseList = <li>Loading...</li>;
    }

    //render the course-container with the content and courseList variables within
    return <div className="course-container"><h2>{content}</h2><ul>{courseList}</ul></div>;
  }

}

export default App;