package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.Resources;

@Service
public interface ResourcesDao extends JpaRepository<Resources, Long> 
{
	List<Resources> findByCourseId(long x);
}
