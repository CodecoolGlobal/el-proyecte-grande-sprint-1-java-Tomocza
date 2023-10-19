package com.codecool.quizzzz.controller;

import com.codecool.quizzzz.dto.quiz.NewQuizDTO;
import com.codecool.quizzzz.dto.quiz.QuizDTO;
import com.codecool.quizzzz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
  private final QuizService quizService;

  @Autowired
  public QuizController(QuizService quizService) {
    this.quizService = quizService;
  }

  @GetMapping("/all")
  ResponseEntity<List<QuizDTO>> getAllQuiz() {
    return ResponseEntity.ok().body(quizService.getAll());
  }

  @GetMapping("/{quizId}")
  ResponseEntity<QuizDTO> getQuizById(@PathVariable int quizId) {
    return ResponseEntity.ok().body(quizService.getById(quizId));
  }

  @PostMapping("/create")
  ResponseEntity<Integer> createQuiz(@RequestBody NewQuizDTO newQuizDTO) {
    int id = quizService.create(newQuizDTO);
    return ResponseEntity.created(URI.create(String.format("/quiz/%d", id))).body(id);
  }

  @DeleteMapping("/{quizId}")
  ResponseEntity<Integer> deleteQuiz(@PathVariable int quizId) {
    return ResponseEntity.ok().body(quizService.deleteById(quizId));
  }

  @PatchMapping("/{quizId}")
  ResponseEntity<Integer> renameQuiz(@PathVariable int quizId, @RequestBody NewQuizDTO newQuizDTO) {
    return ResponseEntity.ok().body(quizService.rename(newQuizDTO, quizId));
  }
}
