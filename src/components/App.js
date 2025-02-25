import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  
  useEffect(()=>{
    fetch(`http://localhost:4000/questions`)
    .then(r => r.json())
    .then( q => setQuestions(q))
  },[])

  function handleNewQuestionAdded(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter( q => q.id !== id)
    setQuestions(updatedQuestions)
  }

  function handleNewAnswerPatch(id, answerIndex) {
    console.log('index', answerIndex)
    answerIndex = Number(answerIndex)
    const updatedQuestions = questions.map( q => {
      if (q.id === id) {
        q.correctIndex = answerIndex
      }

      return q
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onAddNewQuestion={handleNewQuestionAdded}/> : 
      <QuestionList list={questions} 
      onDeleteQuestion={handleDeleteQuestion}
      onPatchAnswer={handleNewAnswerPatch}/>}
    </main>
  );
}

export default App;
