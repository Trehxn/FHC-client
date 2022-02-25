import Questions from "./Questions";
import requireAuth from "../hoc/requireAuth";

const Calculator = () => {
  return <Questions />;
};

export default requireAuth(Calculator);
