import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Advertise from "./components/Admin/Advertise";
import AdminHome from "./components/Admin/Home";
import ManageUsers from "./components/Admin/ManageUsers";
import ReadFeedbacks from "./components/Admin/ReadFeedbacks";
import ChatBot from "./components/Chat/Chatbot";
import Chats from "./components/Chats";
import Discover from "./components/Discover";
import Homepage from "./components/Home";
import Matchs from "./components/Matchs";
import MyNav from "./components/MyNav";
import NearbyPeople from "./components/NearbyPeople";
import Profile from "./components/Profile";
import Request from "./components/Request";
import Suggestion from "./components/Suggestion";
import "./index.css";

var hours = 1;
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("setupTime", now);
  }
}

function App() {
  const isLoggedIn = useSelector((state) => state.auth.loggedUser)
    ? true
    : false;
  const isAdmin = useSelector((state) => state.auth.loggedUser)?.isAdmin;

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Homepage />}></Route>
        <Route path="/nearby" element={<NearbyPeople />}></Route>
        <Route path="/chat" element={<Chats />}></Route>
        <Route path="/chatbot" element={<ChatBot />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/request" element={<Request />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/match" element={<Matchs />}></Route>
        <Route path="/suggestion" element={<Suggestion />}></Route>

        <Route
          path="/admin"
          element={isAdmin ? <AdminHome /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/advertise"
          element={isAdmin ? <Advertise /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/read-feedbacks"
          element={isAdmin ? <ReadFeedbacks /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/manage-users"
          element={isAdmin ? <ManageUsers /> : <Navigate to="/" />}
        ></Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
     
    </Router>
  );
}

export default App;
