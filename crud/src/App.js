import React, { Component } from 'react';
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
      projects: [
        {
          id: 1,
          name: 'Morning in Waiheke',
          description: 'Painting by a local artist',
          type_id: 1
        },
        {
          id: 2,
          name: 'The thinking man',
          description: 'Bronze sculpture fitted for morden office space',
          type_id: 2
        }
      ],
      projectToUpdate: {
        id: '',
        name: '',
        description: '',
        type_id: 1
      }
    }

  }
  setActiveView = (view) => {
    this.setState({ activeView: view })
  }

  setProjectToUpdate = (id) => {
    var foundProject = this.state.projects.find((project) => {
      console.log(project.id)
      return project.id === id
    })
    this.setState({ projectToUpdate: foundProject }) //state 에있는 projectToUpdate 를 업뎃해줌
  }

  listProjects = () => {
    apiInfo.getProjects().then(res => {
      this.setState({ projects: res.data })
    })
  }

  deleteProject = () =>{
    apiInfo.deleteProject()
  }
 
  componentDidMount() {
    this.listProjects();
  }

  render() {

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
              this.state.projects.map((project) => {

                var projectProps = {
                  ...project,
                  key: project.id,
                  listProjects: this.listProjects,
                  setActiveView: this.setActiveView,
                  setProjectToUpdate: this.setProjectToUpdate
                }
                return (<Project {...projectProps} />)
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
            <AddProjectForm addProject={this.addProject} setActiveView={this.setActiveView} />
          </div>

        </View>

        <View viewName="update-project" activeView={this.state.activeView} className="color3" >

          <div className="header">
            <i onClick={() => this.setActiveView('projects')} className="fas fa-times"></i>
          </div>
          <div className="main">
            <h3>Update a project</h3>
            <UpdateProjectForm {...this.state.projectToUpdate} updateProject={this.updateProject} setActiveView={this.setActiveView} />
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
