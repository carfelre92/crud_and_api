import React, { Component, useReducer } from 'react';
import View from './View';
import Project from './Project';
import AddProjectForm from './AddProjectForm';
import UpdateProjectForm from './UpdateProjectForm';
import './App.css';
import apiInfo from './apiInfo';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeView: 'projects',

      projects:[
        {
          id: 1,
          name: 'Morning in Waiheke',
          description: 'Painting by a local artist',
          type_id: 1,
          comments: [],
        },
      ],

      projectToUpdate: {
        id: '',
        name: '',
        description: '',
        type_id: 1
      },

      currentUser: {
        id:1,
        userName:"userName",
        email:"userEmail",
        password:"userPassword",
        location:"userLocation",
        profileImage:"userImage",
        projects: [
          {
            id: 1,
            name: 'asdasd',
            description: 'Painting by a local artist',
            type_id: 1,
            comments: []
          },
        ],
      }

    }

  }
  setActiveView = (view) => {
    this.setState({ activeView: view })
  }

  setProjectToUpdate = (id) => { //take info from Project to updatedProjectForm
    //var foundProject = this.state.currentUser.projects.find((project) => {
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

  listUserProjects = () => {
    apiInfo.getUser(this.state.currentUser.id).then(res => {
      this.setState({ currentUser: res.data })
    })

  }

  deleteProject = () =>{
    apiInfo.deleteProject()
  }
 
  componentDidMount() {
    //this.listUserProjects();
    this.listProjects();
  }

  render() {
    var {currentUser} = this.state
    return (
      <div className="app">

        <View viewName="projects" activeView={this.state.activeView} className="color1" >

          <div className="header">
            <i onClick={() => this.setActiveView('add-project')} className="fas fa-plus"></i>
            <i onClick={() => this.setActiveView('nav')} className="fas fa-bars"></i>
          </div>
          <div className="main">
            <h3>Projects</h3>
            { 
              //should be used for project listing

              this.state.projects.map((project) => {

                var projectProps = {
                  ...project,
                  key: project.id,
                  listUserProjects: this.listUserProjects,
                  listProjects: this.listProjects,
                  setActiveView: this.setActiveView,
                  setProjectToUpdate: this.setProjectToUpdate
                }
                return (<Project {...projectProps} />)
              })

            //Should be used for user profile

            //   this.state.currentUser.projects.map((project) => {

            //     var projectProps = {
            //       ...project,
            //       key: project.id,
            //       listUserProjects: this.listUserProjects,
            //       setActiveView: this.setActiveView,
            //       setProjectToUpdate: this.setProjectToUpdate
                  
            //     }
            //     return (<Project {...projectProps} />)
            // })
          }



          </div>

        </View>

        <View viewName="add-project" activeView={this.state.activeView}   className="color2" >

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">
            <h3>Add a project</h3>
            <AddProjectForm currentUser={currentUser} addProject={this.addProject} setActiveView={this.setActiveView} />
          </div>

        </View>

        <View viewName="update-project" activeView={this.state.activeView} className="color3" >

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">
            <h3>Update a project</h3>
            <UpdateProjectForm {...this.state.projectToUpdate} setActiveView={this.setActiveView} />
          </div>

        </View>

        <View viewName="nav" activeView={this.state.activeView} className="color5" Name>

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">

            <ul className="menu">
              <li><a onClick={() => this.setActiveView('projects')} className="color1" href="#">Projects</a></li>
              <li><a onClick={() => this.setActiveView('add-project')} className="color2" href="#">Add a project</a></li>

            </ul>

          </div>

        </View>

      </div>
    )
  }



}

export default App
