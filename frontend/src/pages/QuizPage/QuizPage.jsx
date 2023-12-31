import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TaskPage from "../TaskPage";
import Loading from "../../components/Loading";
import { createGameLobby, getNextTask, joinToGameLobby } from "../../providers/gameProvider";
import GameLobby from "../../components/GameLobby";
import { useUser } from "../../context/UserContextProvider";

const QuizPage = () => {
  const {quizId} = useParams();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({gameId: -1, title: "", taskCount: -1});
  const [firstTask, setFirstTask] = useState({});
  const [lobbyState, setLobbyState] = useState("creating");
  const navigate = useNavigate();
  const {user} = useUser();

  async function createLobby() {
    try {
      setLoading(true);
      const quiz = await createGameLobby(quizId);
      setQuiz(() => quiz);
      const isSuccessful = await joinToGameLobby(quiz.gameId, user.username);
      if (isSuccessful) {
        setLobbyState("ready");
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  async function handleGameStart() {
    await getTaskForGame();
    setLobbyState("running");
  }

  async function getTaskForGame() {
    try {
      setLoading(true);
      const task = await getNextTask(quiz.gameId);
      setFirstTask({...task, deadline: new Date(task.deadline)});
    }
    catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  function navigateHome() {
    navigate("/");
  }

  const renderLobbyState = useCallback(() => {
    switch (lobbyState) {
      case "creating":
        return <div className="bg-[#1D2226] h-screen w-screen grid">
          <button
            className="w-fit h-fit p-16 place-self-center text-white font-bold text-3xl bg-pink-500 hover:bg-pink-600 rounded-md"
            onClick={() => createLobby()}>Create game lobby
          </button>
        </div>;
      case "ready":
        return <GameLobby quiz={quiz} navigateHome={navigateHome} handleGameStart={handleGameStart}/>;
      case "running":
        return <TaskPage firstTask={firstTask} quiz={quiz}/>;
    }
  }, [lobbyState]);

  return (
    <>
      {loading ? <Loading/>
        : renderLobbyState()
      }
    </>
  );
};

export default QuizPage;
