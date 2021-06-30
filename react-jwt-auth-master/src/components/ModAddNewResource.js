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
        this.changeResHandler = this.changeResHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    saveHandler(event)
    {
        event.preventDefault()
        let obj = {courseId:this.state.id,header:this.state.head,content:this.state.res,proffId:2}
        UserService.addResource(obj).then(res=>{
            this.props.history.push("/")
        })
    }
    changeHeadHandler(event)
    {
        this.setState({
            head:event.target.value
        })
    }
    changeResHandler(event)
    {
        this.setState({
            res:event.target.value
        })
    }
    componentDidMount() 
    {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) 
        {
            this.setState({ redirect: "/home" });
        }
        else if(currentUser.roles.includes("ROLE_MODERATOR"))
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
                        <h3 className='text-center'> Add a New Resource </h3>
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
                                    <label> Header </label>
                                    <input placeholder='Enter Header' className='form-control'
                                        value={this.state.head} onChange={this.changeHeadHandler}/>
                                    <label> Link </label>
                                    <input type="textarea"placeholder='Enter Resource Link' className='form-control'
                                        value={this.state.res} onChange={this.changeResHandler}/>
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
