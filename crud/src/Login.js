import React, { Component } from 'react';
import apiInfo from './apiInfo';
//import nextId from 'react-id-generator';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        var formData = new FormData(this.loginForm)
        var data = {
            userName: formData.get('userName'),
            password: formData.get('password'),
        }
        var { setActiveView, listProjects, setUserId, userLogin, listUserProjects } = this.props

        apiInfo.userCheck(data.userName).then(res => {
            var user = res.data
            if (user == null) {
                console.log('user is null')
            }
            else if (user != null && data.userName != null && data.password != null) {
                apiInfo.getUser(user.id).then(res => {
                    console.log(res.data.password)
                    if (data.password == res.data.password) {
                        setUserId(res.data)
                        

                            listProjects()
                            setActiveView('projects')
                        
                        // .then((setActiveView('projects')))
                    } else {
                        console.log('wrong pw')
                    }
                })
            }
        })
    }

    toRegister = (e) => {
        e.preventDefault()
        var { setActiveView } = this.props
        setActiveView('registerUser')
    }

    render() {

        return (
            <div>

                <form onSubmit={this.handleFormSubmit} ref={(el) => { this.loginForm = el }}>
                    <div className="form-group">
                        <label htmlFor="name-input">userName</label>
                        <input type="text" className="form-control" name="userName" id="userName" placeholder="userName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name-input">Password</label>
                        <input type="text" className="form-control" name="password" id="password" placeholder="password" />
                    </div>
                    <button className="btn btn-primary" onClick={this.handleFormSubmit}>Login</button>
                </form>
                <button className="btn btn-primary" onClick={this.toRegister}>To Register</button>
            </div>
        );
    }
}

export default Login
