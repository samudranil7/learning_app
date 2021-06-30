import axios from 'axios'
const API_URL = "http://localhost:8080/api/user/"
class GetbankDetails
{
    getCourseDetails()
    {
        return axios.get(API_URL+"show_course");
    }
    addResource(resource)
    {
        return axios.post(API_URL+"add_resource",resource)
    }
    addQuestion(question)
    {
        return axios.post(API_URL+"add_question",question)
    }
    addAnswer(answer)
    {
        return axios.post(API_URL+"add_answer",answer)
    }
    getResources(id)
    {
        return axios.get(API_URL+"show_resource/"+id);
    }
    getQues(id)
    {
        return axios.get(API_URL+"show_question/"+id);
    }
    getQuestions(id)
    {
        return axios.get(API_URL+"getQAdetails/"+id);
    }
    addUser(user)
    {
        return axios.post(API_URL+"add_users",user)
    }
    addCourse(obj)
    {
        return axios.post(API_URL+"add_course",obj)
    }
}

export default new GetbankDetails();