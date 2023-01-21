import React from "react";

function QuestionItem(question) {
  const { id, prompt, answers, correctIndex, handleDelete, onAnswerChange } =
    question;
  const singleAnswer = answers.map((item, index) => {
    return <option value={index} key={index}>{item}</option>;
  });
  
  function handleAnswerChange(event) {
    onAnswerChange(id, parseInt(event.target.value));
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>
          {singleAnswer}
        </select>
      </label>
      <button onClick={() => handleDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
