import React, { Component } from 'react'
import UserService from "../services/UserService"
import AuthService from "../services/auth.service"

export default class AdminAddSlot extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            id:"",
            head:"",
            res:"",
            courses:[]            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeHeadHandler = this.changeHeadHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    saveHandler(event)
    {
        event.preventDefault()
        let obj = {courseId:this.state.id,question:this.state.head,studentId:1}
        UserService.addQuestion(obj).then(res=>{
            this.props.history.push("/")
        })
    }
    changeHeadHandler(event)
    {
        this.setState({
            head:event.target.value
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
                this.setState({courses:res.data,
                    currentUser: currentUser, userReady: true
                });
            });
        }
        else
        {
            this.props.history.push("/login")
        }
    }
    

    componentDidMount()
    {
        
    } 
    changeNameHandler(event) 
    {
        this.setState({
            id:event.target.value
        })
    } 
    render() {
        return (
            <div>
                 <div className='row'>
                    <div className="card col-md-6 offset md-3 offset md-3">
                        <h3 className='text-center'> Ask a Question </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>
                                        Pick Course:
                                        <select value={this.state.id} className="form-select form-select-lg mb-2" onChange={this.changeNameHandler}>
                                        <option>Select</option>
                                        {this.state.courses.map(
                                            course=>
                                            <option key={course.id} value={course.id}>{course.courseName}</option>)}
                                        </select>
                                    </label>
                                    <br></br>
                                    <label> Enter Question </label>
                                    <input placeholder='Type Your Question Here' className='form-control'
                                        value={this.state.head} onChange={this.changeHeadHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={this.saveHandler}> Save </button>
                            </form>       
                        </div>       
                    </div>
                </div>
            </div>
        )
    }
}
