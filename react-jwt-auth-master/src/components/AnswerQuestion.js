import React, { Component } from 'react'
import UserService from "../services/UserService"
import AuthService from "../services/auth.service"


export default class AdminAddSlot extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            qid:"",
            id:"",
            head:"",
            res:"",
            qq:"",
            ques:[],
            courses:[]            
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeHeadHandler = this.changeHeadHandler.bind(this);
        this.changeQuesHandler = this.changeQuesHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
    }
    saveHandler(event)
    {
        event.preventDefault()
        let answer = {qid:this.state.qid,answer:this.state.head,proffId:3}
        alert(JSON.stringify(answer))
        UserService.addAnswer(answer).then(res=>{
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
        else if(currentUser.roles.includes("ROLE_MODERATOR"))
        {
            UserService.getCourseDetails().then((res)=> 
            {
                this.setState({
                    currentUser: currentUser, userReady: true,
                    courses:res.data});
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
    getQuestions()
    { 
        UserService.getQues(this.state.id).then((res)=> 
        {
            this.setState({
                ques:res.data
            })
        });
    }
    changeQuesHandler(event)
    {
        this.setState({
            qid:event.target.value
        });
    } 
    changeNameHandler(event) 
    {
        this.setState({
            id:event.target.value
        }, () => {
            this.getQuestions();
        });
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
                                        <select value={this.state.id} className="form-select form-select-lg mb-1" onChange={this.changeNameHandler}>
                                        <option>Select</option>
                                        {this.state.courses.map(
                                            course=>
                                            <option key={course.id} value={course.id}>{course.courseName}</option>)}
                                        </select>
                                    </label>
                                    <br></br>        
                                    <label>
                                        Answer a Question:
                                        <select value={this.state.qid} className="form-select form-select-lg mb-1" onChange={this.changeQuesHandler}>
                                        <option>Select</option>
                                        {this.state.ques.map(
                                            qq=>
                                            <option key={qq.id} value={qq.id}>{qq.question}</option>)}
                                        </select>
                                    </label>
                                    
                                    <br></br>
                                    <label> Enter Question </label>
                                    <input placeholder='Type Your Answer Here' className='form-control'
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
