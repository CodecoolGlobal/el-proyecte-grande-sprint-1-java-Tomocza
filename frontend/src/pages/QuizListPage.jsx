import React, { useEffect, useState } from 'react';
import { fetchAllQuizzes } from "../controllers/quizProvider";
import QuizListContainer from "../components/QuizListContainer";

function QuizListPage() {
  const [loading, setLoading] = useState(true);
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    async function getQuizzes() {
      try {
        setLoading(true);
        const quizzes = await fetchAllQuizzes();
        setQuizList(quizzes);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    getQuizzes();
  }, []);

  return (
    <div>
      <QuizListContainer quizList={quizList} loading={loading}/>
    </div>
  );
}

export default QuizListPage;