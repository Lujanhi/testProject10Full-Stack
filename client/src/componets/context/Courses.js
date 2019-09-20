import React, { Component } from 'react';
//Courses is context-less so import the Data component directly
import Data from '../Data';

//Define component here in react and create constructor defining its default state
//Component is the super class, and courses is the subclass (considered a type of component)
class Courses extends Component {
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

        const data = new Data();

        data.getCourses()
            .then(responseData => {
                this.setState({ courses: responseData, isLoading: false });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    //constructs a link div for the course - passed into map method of the array
    mapJsonToCourseLink = (course, i) => {
        return <div className="grid-33" key={i}><a className="course--module course--link" href={"/courses/" + course.id}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
        </a></div>;
    }

    //component is being loaded into the page (this a verb called "mounting")
    //once component is loaded (is mounted), the method in the body of componentDidMount will be called
    //execute fetchCourses()
    componentDidMount() {
        this.fetchCourses();
    }

    /*once the componentDidMount is called render will be called continously (over and over again) 
      render method is checking continously if state.isLoading is true or false
    */
    render() {
        let courseList = [];

        //if the courses array has content display them
        if (this.state.courses.length > 0) {
            courseList = this.state.courses.map(this.mapJsonToCourseLink);
        }

        /* if there are no courseList in the array, 
          and the isLoading is false, then this must be an empty search: Show message saying nothing found 
        */
        else if (!this.state.isLoading) {
            courseList = <li>No results found...</li>;
        }
        //otherwise, display the generic Loading panel
        else {
            courseList = <li>Loading...</li>;
        }

        //render the course-container with the courseList variables within

        return <div>
            <div className="bounds">
                {courseList}
                <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </a></div>
            </div>
        </div>;

    }

}

export default Courses;