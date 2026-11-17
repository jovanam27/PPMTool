import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import SprintDashboard from "./components/SprintDashboard";
import AddSprint from "./components/Sprint/AddSprint";
import UpdateSprint from "./components/Sprint/UpdateSprint";
import SprintPTBoard from "./components/Sprint/SprintPTBoard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/:id" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
          <Route
            exact
            path="/updateProjectTask/:backlog_id/:pt_id"
            component={UpdateProjectTask}
          />
          <Route exact path="/sprintDashboard" component={SprintDashboard} />
          <Route exact path="/addSprint" component={AddSprint} />
          <Route exact path="/updateSprint/:s_id" component={UpdateSprint} />
          <Route exact path="/sprintPTBoard/:s_id" component={SprintPTBoard} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
