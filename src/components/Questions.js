import { Link } from "react-router-dom";

import QuestionHeader from "./QuestionsHeader";
import Question from "./Question";

const Questions = () => {
  let questions = [
    {
      title: "Full Name",
      description: "first and last name",
    },
    {
      title: "Age",
      description: "as of last birthday",
    },
  ];

  return (
    <div className="calculator-box">
      <QuestionHeader />
      <Question questions={questions} />
      <div className="submit-holder">
        <Link to="/" className="btn btn-white btn-animated">
          Submit
        </Link>
      </div>
    </div>
  );
};

export default Questions;
