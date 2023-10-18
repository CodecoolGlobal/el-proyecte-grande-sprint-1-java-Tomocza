package com.codecool.quizzzz.service;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.dto.quiz.QuizDTO;
import com.codecool.quizzzz.exception.NotFoundException;
import com.codecool.quizzzz.service.dao.quiz.QuizDAO;
import com.codecool.quizzzz.service.dao.quiz.QuizModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
  private final QuizDAO quizDAO;

  @Autowired
  public QuizService(QuizDAO quizDAO) {
    this.quizDAO = quizDAO;
  }

  public List<QuizDTO> getAll(){
    return quizDAO.getAll().stream().map(this::transformFromQuizModel).toList();
  }

  public QuizDTO getById(int quizId){
    Optional<QuizModel> result = quizDAO.getById(quizId);
    if (result.isEmpty()) throw new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId));
    return transformFromQuizModel(result.get());
  }

  public int create(NewQuizDTO newQuizDTO){
    return quizDAO.create(newQuizDTO);
  }

  public int deleteById(int quizId){
    Optional<Integer> optionalId = quizDAO.deleteById(quizId);
    if (optionalId.isPresent()) return optionalId.get();
    throw new NotFoundException(String.format("The quiz with id %d doesn't exist!", quizId));
  }

  private QuizDTO transformFromQuizModel(QuizModel quizModel){
    return new QuizDTO(quizModel.id(), quizModel.title());
  }
}