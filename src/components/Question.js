import React from "react";
import { useForm } from "react-hook-form";

const Question = ({ questions }) => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      {questions.map((question, id) => {
        return (
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div key={id} className="white-box">
              <p className="question-title">{question.title}</p>
              <p className="question-description">-{question.description}</p>
              <input
                className="question-input"
                {...register(`${question.title}`, { required: true })}
                id="answer"
                placeholder="Your Answer"
              />
            </div>
          </form>
        );
      })}
    </>
  );
};

export default Question;
