import React, { Component } from 'react';
import apiInfo from './apiInfo';
//import nextId from 'react-id-generator';

class RegisterUser extends Component {

	constructor(props) {
		super(props);
	}

	handleFormSubmit = (e) => {
		e.preventDefault()
		var formData = new FormData(this.addForm)
		var data = {
			userName: formData.get('userName'),
			email: formData.get('email'),
			password: formData.get('password'),
			location: formData.get('location_option'),
			id: Date.now() + Math.round(Math.random() * (1000000 - 1) + 1),
			profileImage: '',
			projects: [],
		}
		var { setActiveView, listProjects, setUserId } = this.props
		console.log(data)
		setUserId(data)

		apiInfo.postUser(data).then(() => listProjects())
		setActiveView('projects')
	}

	toLogin = (e) => {
		e.preventDefault()
		var { setActiveView } = this.props
		setActiveView('login')
	}

	render() {

		return (
			<div>
				<form onSubmit={this.handleFormSubmit} ref={(el) => { this.addForm = el }}>
					<div className="form-group">
						<label htmlFor="name-input">Name</label>
						<input type="text" className="form-control" name="userName" id="userName" placeholder="userName" />
					</div>
					<div className="form-group">
						<label htmlFor="name-input">Name</label>
						<input type="text" className="form-control" name="email" id="email" placeholder="email" />
					</div>
					<div className="form-group">
						<label htmlFor="name-input">Name</label>
						<input type="text" className="form-control" name="password" id="password" placeholder="password" />
					</div>
					<div className="form-group">
						<label htmlFor="type-input">Type</label>
						<select className="form-control" name="location_option" id="location_option">
							<option value="Auckland">Auckland</option>
							<option value="Hamilton">Hamilton</option>
							<option value="Wellington">Wellington</option>
						</select>
					</div>
					<button type="submit" className="btn btn-primary">Register</button>
				</form>
				<button className="btn btn-primary" onClick={this.toLogin}>To Login</button>
			</div>
		);
	}
}

export default RegisterUser
