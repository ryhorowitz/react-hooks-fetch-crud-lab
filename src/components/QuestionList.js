import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ list, onDeleteQuestion, onPatchAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{list.map( question => {
        return <QuestionItem key={question.id} 
          question={question}
          onDeleteQuestion={onDeleteQuestion}
          onPatchAnswer={onPatchAnswer}/>
      })}</ul>
    </section>
  );
}

export default QuestionList;
