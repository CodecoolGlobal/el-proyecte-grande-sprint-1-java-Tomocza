import React, { useEffect, useState } from 'react';
import { changeQuizName, getQuizById } from "../../controllers/quizProvider";
import { useParams } from "react-router-dom";
import { fetchDetailedTasksByQuizId, fetchTask } from "../../controllers/taskProvider";
import TaskForm from "../../components/TaskForm/TaskForm";

const QuizCreator = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const {quizId} = useParams();
  const [isLoading, setIsLoading] = useState(false);

  async function saveQuizName(e) {
    try {
      await changeQuizName(e.target.value, quizId);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getQuiz() {
      setIsLoading(true);
      try {
        const quiz = await getQuizById(quizId);
        const tasks = await fetchDetailedTasksByQuizId(quizId);
        setQuizTitle(quiz.title);
        setTasks(tasks);
        // console.log(tasks);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    }

    getQuiz();
  }, [quizId]);
  if (isLoading) {
    return;
  }
  // console.log(tasks);
  async function addNewTask(){
    const res = await fetch(`/task/quiz/${quizId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "",
        answers: []
      })
    });
    const taskId = await res.json();
    console.log("taskid " + taskId);
    const res2 = await fetch(`/task/quiz/${taskId}`);
    const newTask = await res2.json();
    setTasks([newTask,...tasks]);
  }

  return (
    <div className="pt-2 bg-[#1D2226] h-fit pb-40">
      <div className="pl-20 p-12">
        <label htmlFor="name" className="text-white text-xl">Quiz title: </label>
        <input className="p-2 text-xl bg-[#050409] text-white border-2 border-zinc-700 w-4/6" defaultValue={quizTitle} type="text" placeholder="Eg. My quiz" id="name"
               onBlur={(e) => saveQuizName(e)}
               onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>
      <div className="pb-4">
        {tasks?.map(task => (
          /** @namespace task.taskId **/
          <div key={task.taskId}>
             <TaskForm task={task}/>
          </div>
        ))}
      </div>
        <button className="absolute text-white font-bold left-32 p-4 bg-green-800 hover:bg-green-700 hover:cursor-pointer"
                onClick={() => addNewTask()}>Add Question
        </button>
    </div>
  );
};

export default QuizCreator;
