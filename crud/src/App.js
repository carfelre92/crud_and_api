import React, { Component } from 'react';
import View from './View';
import Project from './Project';
import AddProjectForm from './AddProjectForm';
import UpdateProjectForm from './UpdateProjectForm';
import './App.css';
import apiInfo from './apiInfo';
import UserProject from './UserProject';
import RegisterUser from './RegisterUser';
import Login from './Login';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeView: 'login',

      projects: [
        {
          id: 1,
          name: '',
          description: '',
          type_id: 1,
          comments: [],
        },
      ],

      projectToUpdate: {
        id: '',
        name: '',
        description: '',
        type_id: '',
      },

      currentUser: {
        _id: 1,
        id: 1,
        userName: "",
        email: "",
        password: "",
        location: "",
        profileImage: "",

        projects: [
          {
            id: 1,
            name: '',
            description: '',
            type_id: 1,
            comments: []
          },
        ],
      }
    }
  }

  setUserId = (user) => {
    this.setState({ currentUser: user })
    return user
  }

  userLogin = (data) => {
    apiInfo.userAuth(data)
      .then(res => {
        var user = res.data
        console.log(res.data)
        return user
      })
  }

  setActiveView = (view) => {
    this.setState({ activeView: view })
  }
  setProfileProjectToUpdate = (id) => { //take info from Project to updatedProjectForm
    var foundProject = this.state.currentUser.projects.find((project) => {
      console.log(project.id)
      return project.id === id
    })
    this.setState({ projectToUpdate: foundProject }) //state 에있는 projectToUpdate 를 업뎃해줌
  }

  setProjectToUpdate = (id) => { //take info from Project to updatedProjectForm
    var foundProject = this.state.projects.find((project) => {
      console.log(project.id)
      return project.id === id
    })
    this.setState({ projectToUpdate: foundProject }) //state 에있는 projectToUpdate 를 업뎃해줌
  }

  listProjects = () => { //create list of projects from DB (all projects)
    apiInfo.getProjects().then(res => {
      this.setState({ projects: res.data })
    })
  }

  listUserProjects = () => { //create list of user's project from DB (only current logged in user)
    apiInfo.getUser(this.state.currentUser.id).then(res => {
      this.setState({ currentUser: res.data })
    })
  }

  activeViewListProject = (view) => {
    apiInfo.getProjects().then(res => {
      this.setState({ projects: res.data })
    }).then(() => this.setActiveView(view))
  }

  activeViewListUserProject = (view) => {
    apiInfo.getUser(this.state.currentUser.id).then(res => {
      this.setState({ currentUser: res.data })
    }).then(() => this.setActiveView(view))
  }

  activeViewLogout = (view) => {
    this.setState({
      currentUser: {
        _id: 1,
        id: 1,
        userName: "",
        email: "",
        password: "",
        location: "",
        profileImage: "",

        projects: [
          {
            id: 1,
            name: '',
            description: '',
            type_id: 1,
            comments: []
          },
        ],
      }, projects:[]
    })
    this.setActiveView(view)
  }

  deleteProject = () => {
    apiInfo.deleteProject()
  }

  componentDidMount() {
    //this.listUserProjects();
    //this.listProjects();
  }

  render() {
    var { currentUser } = this.state
    return (
      <div className="app">

        <View viewName="registerUser" activeView={this.state.activeView} className="color1" >
          <RegisterUser setActiveView={this.setActiveView} listProjects={this.listProjects} setUserId={this.setUserId}></RegisterUser>
        </View>

        <View viewName="login" activeView={this.state.activeView} className="color1" >
          <Login setActiveView={this.setActiveView} listProjects={this.listProjects} setUserId={this.setUserId} userLogin={this.userLogin} listUserProjects={this.listUserProjects}></Login>
        </View>

        <View viewName="projects" activeView={this.state.activeView} className="color1" >

          <div className="header">
            <i onClick={() => this.setActiveView('add-project')} className="fas fa-plus"></i>
            <i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i>
          </div>
          <div className="main">
            <h3>Projects</h3>
            {
              //shows all projects

              this.state.projects.slice().reverse().map((project) => {

                var projectProps = {
                  ...project,
                  key: project.id,
                  listProjects: this.listProjects,
                  setActiveView: this.setActiveView,
                  setProjectToUpdate: this.setProjectToUpdate
                }
                return (<Project {...projectProps} currentUser={currentUser} />)
              })
            }
          </div>

        </View>

        <View viewName="userProject" activeView={this.state.activeView} className="color1" >

          <div className="header">
            <i onClick={() => this.setActiveView('add-project')} className="fas fa-plus"></i>
            <i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i>
          </div>
          <div className="main">
            <h3>userProject</h3>
            {

              //shows user profile
              this.state.currentUser.projects.slice().reverse().map((project) => {

                var projectProps = {
                  ...project,
                  key: project.id,
                  listUserProjects: this.listUserProjects,
                  setActiveView: this.setActiveView,
                  setProjectToUpdate: this.setProjectToUpdate

                }
                return (<UserProject currentUser={currentUser} {...projectProps} />)
              })
            }



          </div>

        </View>

        <View viewName="add-project" activeView={this.state.activeView} className="color2" >

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">
            <h3>Add a project</h3>
            <AddProjectForm currentUser={currentUser} addProject={this.addProject} setActiveView={this.setActiveView} listProjects={this.listProjects} />
          </div>

        </View>

        <View viewName="update-project" activeView={this.state.activeView} className="color3" >

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">
            <h3>Update a project</h3>
            <UpdateProjectForm {...this.state.projectToUpdate} setActiveView={this.setActiveView} listUserProjects={this.listUserProjects} />
          </div>

        </View>

        <View viewName="nav" activeView={this.state.activeView} className="color5" Name>

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">

            <ul className="menu">
              <li><a onClick={() => this.activeViewListProject('projects')} className="color1" href="#">Projects</a></li>
              <li><a onClick={() => this.setActiveView('add-project')} className="color2" href="#">Add a project</a></li>
              <li><a onClick={() => this.activeViewListUserProject('userProject')} className="color1" href="#">view user project</a></li>
              <li><a onClick={() => this.activeViewLogout('login')} className="color1" href="#">logout</a></li>

            </ul>

          </div>

        </View>

      </div>
    )
  }



}

export default App
