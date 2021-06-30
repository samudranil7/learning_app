package com.bezkoder.springjwt.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.CourseDetails;


@Service
public interface CourseDao extends JpaRepository<CourseDetails, Long> 
{
	
}
