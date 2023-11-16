package com.codecool.quizzzz.service.repository;

import com.codecool.quizzzz.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
  List<Quiz> findByUserId(Long user_id);
}
