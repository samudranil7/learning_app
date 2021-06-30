import React, { Component } from 'react'
import UserService from "../services/UserService"
import AuthService from "../services/auth.service"

export default class AdminAddResource extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            id:"",
            head:"",
            res:"",
            courses:[]            
        }
        this.changeHeadHandler = this.changeHeadHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) 
        {
            this.setState({ redirect: "/home" });
        }
        else if(currentUser.roles.includes("ROLE_ADMIN"))
        {
            this.setState({ currentUser: currentUser, userReady: true })
        }
        else
        {
            this.props.history.push("/login")
        }
    }
    saveHandler(event)
    {
        event.preventDefault()
        let obj = {courseName:this.state.head}
        UserService.addCourse(obj).then(res=>{
            this.props.history.push("/user_show_resource")
        })
    }
    changeHeadHandler(event)
    {
        this.setState({
            head:event.target.value
        })
    }
    render() {
        return (
            <div>
                 <div className='row'>
                    <div className="card col-md-6 offset md-3 offset md-3">
                        <h3 className='text-center'> Enter Course Name </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label> Enter Course Name </label>
                                    <input placeholder='Type Course Name Here' className='form-control'
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
