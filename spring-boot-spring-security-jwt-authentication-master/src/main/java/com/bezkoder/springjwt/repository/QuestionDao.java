package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Question;

@Service
public interface QuestionDao extends JpaRepository<Question, Long> 
{
	List<Question> findByCourseId(long x);
}
