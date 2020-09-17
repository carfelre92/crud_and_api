import React, { Component } from 'react'
import apiInfo from './apiInfo';

class Project extends Component {

	// handleUpdateClick = () => {
	// 	var { setActiveView, setProjectToUpdate, id } = this.props
	// 	setProjectToUpdate(id)
	// 	setActiveView('update-project')
	// 	console.log(id)
	// }

	// handleTrashClick = () => {
	// 	var { id, listProjects } = this.props;
	// 	apiInfo.deleteProject(id).then(()=>listProjects())
	
	// }

	handleCommentSubmit = (e) =>{
		e.preventDefault();
		var {comments, listProjects, currentUser} = this.props

		var formData = new FormData(this.form);

		var newComment = {
			user_id: currentUser.id,
			comment:formData.get('description-input'),
		}
		
		comments.push(newComment)
		var data = {
			comments
		}
		var {id}=this.props
		apiInfo.updateProject(id,data).then(()=>listProjects());
	}

	render() {
		var { name, description, comments } = this.props
		return (
			<div className="card project">
				<img className="card-img-top" src="project.jpg" alt="Card image cap" />
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
					<p className="card-text">{description}</p>
					{comments.map((comment) => {

						// var commentProps = {
						// 	...comment,
						// 	key: 1,
						// }
						return (<div>
							<p>{comment.user_id}</p><p>{comment.comment}</p>
						</div>)
					})}
					<form onSubmit={this.handleCommentSubmit} ref={(el) => {this.form = el}}>
						<div className="form-group">
							<label htmlFor="name-input">Comments</label>
							<input type="text" className="form-control" name="description-input" id="description-input" placeholder="comment area" />
						</div>

						<button type="submit" className="btn btn-primary">Add</button>
					</form>
					<p>
						<i className="fas fa-heart"></i>
						{/* <i onClick={this.handleUpdateClick} className="fas fa-edit"></i>
						<i onClick={this.handleTrashClick} className="fas fa-trash"></i> */}
					</p>
				</div>
			</div>
		)
	}
}
export default Project
