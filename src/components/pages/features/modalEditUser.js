import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap';
import './css/modalEditUser.scss';

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
    //     nama = this.props.nama;
    //     username = this.props.username;
    //     password = this.props.password;
        id = this.props.id;
    }

    editUser(){
        let nama = document.getElementById('nama').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let link = 'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/user/update';
        let param = '?id=' + id + '&nama=' + nama + '&username=' + username + '&password=' + password;  
        fetch(link + param, {
            // crossDomain: true,
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({
            //     "nama": nama,
            //     "username": username,
            //     "password": password,
            // })
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res.message);
                document.getElementById('nama').value = '';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                alert(res.message);
                window.location.reload(false);
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
                    style={{ width: '1000px', marginLeft: '125px', marginTop: '50px'}}
                    className="w3-display-center"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h3>
                                {this.props.children}
                            </h3>
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="modal-edit">
                            <p>Nama Lama : {this.props.nama} </p>
                            <label for="nama">Nama Baru :</label><br />
                            <input type="text" id="nama" className="form-control" name="nama" placeholder='Nama...' ></input><br />
                            <p>Username Lama : {this.props.username} </p>
                            <label for="username">Username Baru :</label><br />
                            <input type="text" id="username" className="form-control" name="username" placeholder='Username...'></input><br />
                            <p>No. Telp Lama : {this.props.no_telp} </p>
                            <label for="username">No. Telp Baru :</label><br />
                            <input type="text" id="no_telp" className="form-control" name="no_telp" placeholder='No.Telp...'></input><br />
                            <p>Alamat Lama : {this.props.alamat} </p>
                            <label for="username">Alamat Baru :</label><br />
                            <input type="text" id="alamat" className="form-control" name="alamat" placeholder='Alamat...'></input><br />
                            <label for="password">Password Baru :</label><br />
                            <input type="password" id="password" className="form-control" name="password" ></input>
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
