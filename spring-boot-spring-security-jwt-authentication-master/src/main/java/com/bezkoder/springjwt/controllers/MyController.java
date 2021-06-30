package com.bezkoder.springjwt.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.springjwt.models.Answer;
import com.bezkoder.springjwt.models.CourseDetails;
import com.bezkoder.springjwt.models.QaFormat;
import com.bezkoder.springjwt.models.Question;
import com.bezkoder.springjwt.models.Resources;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.models.UserDetails;
import com.bezkoder.springjwt.repository.AnswerDao;
import com.bezkoder.springjwt.repository.CourseDao;
import com.bezkoder.springjwt.repository.QuestionDao;
import com.bezkoder.springjwt.repository.ResourcesDao;
import com.bezkoder.springjwt.repository.UserDetailsDao;
import com.bezkoder.springjwt.repository.UserRepository;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class MyController 
{
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	AnswerDao ad;
	
	@Autowired
	CourseDao cd;
	
	@Autowired
	QuestionDao qd;
	
	@Autowired
	ResourcesDao rd;
	
	@Autowired
	UserDetailsDao udd;
	
	@PostMapping("/add_users")
	public String add_user(@RequestBody UserDetails obj)
	{
		String x = obj.getEmail();
		List<User> temp = ur.findByEmail(x);
		long id = temp.get(0).getId();
		obj.setId(id);
		udd.save(obj);
		return "True";
	}
	
	@GetMapping("/show_course")
	public List<CourseDetails> show_course()
	{
		return cd.findAll();
	}
	
	@GetMapping("/show_question/{id}")
	public List<Question> getQuestions(@PathVariable("id") long x)
	{
		return qd.findByCourseId(x);
	}
	
	@GetMapping("/show_resource/{id}")
	public List<Resources> getResources(@PathVariable("id") long x)
	{
		return rd.findByCourseId(x);
	}
	
	@GetMapping("/getQAdetails/{id}")
	public List<QaFormat> getqa(@PathVariable("id") long x)
	{
		List<Question> temp= qd.findByCourseId(x);
		List<QaFormat> senlis = new ArrayList<QaFormat> (); 
		for(int i=0;i<temp.size();i++)
		{
			long qid = temp.get(i).getId();
			String q = temp.get(i).getQuestion();
			
			List<String> an = new ArrayList<String>();
			List<Answer> temp2 = ad.findByQid(qid);
			
			
			for(int j=0;j<temp2.size();j++)
			{
				long authid = temp2.get(j).getProffId();
				List<UserDetails> ud = udd.findById(authid);
				an.add(temp2.get(j).getAnswer());
				an.add(ud.get(0).getName());
			}
			QaFormat temp3 = new QaFormat(q,an);
			senlis.add(temp3);
		}
		return senlis;
	}
	
	@PostMapping("/add_resource")
	public String add_resource(@RequestBody Resources obj)
	{
		rd.save(obj);
		return "True";
	}
	
	@PostMapping("/add_question")
	public String add_question(@RequestBody Question obj)
	{
		qd.save(obj);
		return "True";
	}
	
	@PostMapping("/add_answer")
	public String add_answer(@RequestBody Answer obj)
	{
		ad.save(obj);
		return "True";
	}
	
	@PostMapping("/add_course")
	public String add_course(@RequestBody CourseDetails obj)
	{
		cd.save(obj);
		return "True";
	}
}
