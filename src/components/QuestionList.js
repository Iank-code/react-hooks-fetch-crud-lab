import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [newdata, setNewData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setNewData(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions = newdata.filter((q) => q.id !== id);
        setNewData(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    console.log(correctIndex)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((patchData) => {
        const updatedQuestions = newdata.map((item) => {
          if (item.id === patchData.id) return patchData;
          return item;
        });
        setNewData(updatedQuestions);
      });
  }


  const mappedData = newdata.map((item) => {
    return (
      <QuestionItem
        handleDelete={handleDelete}
        onAnswerChange={handleAnswerChange}
        id={item.id}
        key={item.id}
        prompt={item.prompt}
        answers={item.answers}
        correctIndex={item.correctIndex}
      />
    );
  });


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* id, prompt, answers, correctIndex */}
        {/* display QuestionItem components here after fetching */}

        {newdata && mappedData}
      </ul>
    </section>
  );
}

export default QuestionList;
