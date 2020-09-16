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
            password: formData.get('password'),
        }
        var { setActiveView, listProjects, setUserId, userAuth } = this.props
        //setUserId(data)
        apiInfo.userCheck(data.userName).then(res=>{
            var user = res.data
        })
        //setActiveView('projects')


        //setUserId(data)
    }

    toRegister = (e) => {
        e.preventDefault()
        var { setActiveView } = this.props
        setActiveView('registerUser')
    }

    render() {

        return (
            <div>

                <form onSubmit={this.handleFormSubmit} ref={(el) => { this.addForm = el }}>
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

export default RegisterUser
