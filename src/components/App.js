import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Calculator from "./Calculator";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import Header from "./Header";
import TimeLine from "./TimeLine";
import Post from "./Post";
import NewPostModal from "./NewPostModal";
import NewCommentPage from "./NewCommentPage";
import ChatBox from "./ChatBox";
import LiveChat from "./LiveChat";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/timeline" element={<TimeLine />} />
          <Route path="/" exact element={<Landing />} />
          <Route path="/calculator" exact element={<Calculator />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="timeline/:postId" element={<Post />} />
          <Route path="/newpost" element={<NewPostModal />} />
          <Route path="/newcomment/:postId" element={<NewCommentPage />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path="/livechat" element={<LiveChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
