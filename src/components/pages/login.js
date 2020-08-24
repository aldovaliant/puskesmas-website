import React, { Component, useState } from 'react';
import axios from 'axios';
import {setUserSession, getUser, getToken} from '../Utils/common';
import './css/login.scss';

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            setError: null
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }
   
    // login() {
    //     var reqBody = '?username=' + this.state.username + '&password=' + this.state.password;
    //     console.log("coba"+reqBody);
    //     var link = "https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/login" + reqBody;
    //     fetch(link)
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log(res);
    //         if ((res.status == 200)) {
    //         //   alert(res.message);
    //           this.props.history.push('/Dashboard');
    //         } else if ((res.status == 204)) {
    //           alert(res.message);
    //         } else {
    //           alert(res.message);
    //         }
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    // }

    handleLogin = () => {
        // this.state.setError = null;
        var reqBody = '?username=' + this.state.username + '&password=' + this.state.password;
        console.log("coba"+reqBody);
        axios.post('https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/login' + reqBody).then(response => {
            if(response.data.status === 200){
                setUserSession(response.data.token, this.state.username); 
                console.log(getUser());
                console.log(response.data.token);
                this.props.history.push('/Dashboard');  
            }
        // }).catch(error => {
        //     if (error.response.status === 401) this.state.setError = error.response.data.message;
        //     else this.state.setError = "Something went wrong. Please try again later.";
        });
      }

    render() {
        return (
            <div id="login">
                <div id="form">
                    <h1>Website Puskesmas</h1>
                    <input class="input" placeholder="Username" type="text" name="username" onChange={this.onChange} />
                    <input class="input" placeholder="Password" type="password" name="password" onChange={this.onChange} />
                    <button id="btn" onClick={this.handleLogin} >Log in</button>
                </div>
                <footer>
                    <h5 id="footer">By ProSi UNPAR</h5>
                </footer>
            </div>
        )
    }
}
