import React, { Component } from 'react'
import UserService from "../services/UserService"
import AuthService from "../services/auth.service";
export default class UserShowResourceDetails extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = 
        {
            id:"",
            name:"",
            tabl:[],
            reso:[],
            qa:[]     
        }
        this.getMapping = this.getMapping.bind(this)
    }
    componentWillMount()
    {
        this.setState({
            id: this.props.location.state.course_id,
            name:this.props.location.state.course_name,
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
            UserService.getResources(this.state.id).then((res)=> 
            {
                this.setState({reso:res.data});
                UserService.getQuestions(this.state.id).then((res)=>
                {
                    this.setState({
                        qa:res.data
                    })
                })
            });
            this.setState({ currentUser: currentUser, userReady: true })
        }
        else
        {
            this.props.history.push("/login")
        }
    }
      
    getMapping(arr)
    {
        var str = "";
        for(var i=0;i<arr.length;i=i+2)
        {
            str = str + "<tr><td>"+arr[i]+"</td><td>"+arr[i+1]+"</td></tr>" 
        }
        return {__html: str};
    }
    render() {
        return (
            <div>
                <h2 className="text-center"> {this.state.name} </h2>
                <div className="row">
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Header </th>
                                <th> Link </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.reso.map(
                            res=>
                                <tr>
                                    <td> {res.header}</td>
                                    <td> <a href={res.content}> {res.content}</a></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <h3> Course Related Questions</h3>
                    <table className = "table table-stripped table-bordered">
                        <thead>
                            <tr>
                                <th> Question </th>
                                <th> Answer </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.qa.map(
                                qas=>
                                    <tr>
                                        <td key={qas.ques}> {qas.ques} </td>
                                        {qas.ans.length===0 &&
                                            <td> No answers till now</td>
                                        }
                                        {
                                            qas.ans.length!==0 &&
                                            <td>
                                            <table className = "table table-stripped table-bordered">
                                                <tbody dangerouslySetInnerHTML={this.getMapping(qas.ans)}>
   
                                                </tbody>
                                            </table>
                                        </td>
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
