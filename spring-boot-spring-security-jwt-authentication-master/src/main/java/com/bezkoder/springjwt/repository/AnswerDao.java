package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Answer;

@Service
public interface AnswerDao extends JpaRepository<Answer, Long> 
{
	List<Answer> findByQid(long x);
}
