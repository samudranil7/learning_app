package com.bezkoder.springjwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.bezkoder.springjwt.models.UserDetails;

@Service
public interface UserDetailsDao extends JpaRepository<UserDetails, Long> 
{
	List<UserDetails> findById(long i); 
}
