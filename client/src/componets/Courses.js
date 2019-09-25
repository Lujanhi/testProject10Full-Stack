import React, { Component } from 'react';
import Data from '../Data';
class Courses extends Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            isLoading: true
        };
    }

    fetchCourses = () => {
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

    mapJsonToCourseLink = (course, i) => {
        return <div className="grid-33" key={i}><a className="course--module course--link" href={"/courses/" + course.id}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
        </a></div>;
    }

    
    
    componentDidMount() {
        this.fetchCourses();
    }

    
    render() {
        let courseList = [];

        if (this.state.courses.length > 0) {
            courseList = this.state.courses.map(this.mapJsonToCourseLink);
        }

        else if (!this.state.isLoading) {
            courseList = <li>No results found...</li>;
        }
        
        else {
            courseList = <li>Loading...</li>;
        }

        

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