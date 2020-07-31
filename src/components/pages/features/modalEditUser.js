import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap';
import './css/modalEditUser.css';

var nama,username,password,id;
export default class modalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // nama: this.props.nama,
            // username: this.props.username,
            // password: this.props.password,
            // id: this.props.id
        }
    }

    componentDidUpdate(){
        nama = this.props.nama;
        username = this.props.username;
        password = this.props.password;
        id = this.props.id;
    }

    editUser(){
        fetch('https://cors-anywhere.herokuapp.com/http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/user/', {
            crossDomain: true,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nama": nama,
                "username": username,
                "password": '',
                "id": id
            })
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res.message);
                document.getElementById('nama').value = '';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                alert(res.message);
            })
            .catch((error) => {
                console.error(error);
            }); 
    }

    render() {
        return (
            <div> 
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ width: '1000px', marginLeft: '125px'}}
                    className="w3-display-center"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h2>
                                {this.props.children}
                            </h2>
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="modal-edit">
                            <label for="nama">Nama :</label><br />
                            <input type="text" id="nama" className="form-control" name="nama" placeholder={this.props.nama} ></input><br />
                            <label for="username">Username :</label><br />
                            <input type="text" id="username" className="form-control" name="username" placeholder={this.props.username}></input><br />
                            <label for="password">New Password :</label><br />
                            <input type="password" id="password" className="form-control" name="password" placeholder={this.props.password}></input>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button onClick={this.editUser}>Edit User</Button>
                            <Button onClick={this.props.onHide} style={{backgroundColor:'red'}}>Batal</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
