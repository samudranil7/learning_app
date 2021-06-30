import React, { Component } from 'react'
import UserService from "../services/UserService"
import AuthService from "../services/auth.service"

export default class UserShowResource extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             courses:[]
        }
        this.clickHandller = this.clickHandller.bind(this)
    }
    clickHandller(id,name)
    {
        this.props.history.push({
            pathname: '/user_show_resource_details',
            state: { 
                course_id: id, 
                course_name: name,
            }
          })
    }
    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) 
        {
            this.setState({ redirect: "/home" });
        }
        else if(currentUser.roles.includes("ROLE_USER"))
        {
            UserService.getCourseDetails().then((res)=> 
            {
                this.setState({
                    currentUser: currentUser, userReady: true,
                    courses:res.data});
            });
            this.setState({  })
        }
        else
        {
            this.props.history.push("/login")
        }
    }
    render() {
        return (
            <div>
                <h3> List of Courses Available </h3>
                <div class="list-group">
                    {this.state.courses.map(course =>
                    <button type="button" class="list-group-item list-group-item-action" onClick={() => this.clickHandller(course.id,course.courseName)}>{course.courseName}</button>
                    )}
                </div>
            </div>
        )
    }
}
