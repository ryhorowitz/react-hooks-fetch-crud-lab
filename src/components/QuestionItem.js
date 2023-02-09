import React from "react";

function QuestionItem({ question, onDeleteQuestion, onPatchAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
      .then(r => r.json())
      .then(() => onDeleteQuestion(id))
  }

  function handleChange(e) {
    console.log('value', e.target.value)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        correctIndex: e.target.value
      })
    })
    .then(r => r.json())
    .then(() => {
      console.log('hello dere')
      //then cb(e.target.value)
      onPatchAnswer(id, e.target.value)
    })
    .catch( e => console.error(e.message))
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
