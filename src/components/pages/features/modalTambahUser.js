/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap';

var jenis_user;

export default class modalTambahUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false,
            jenis_user: this.props.jenisUser
        }
    }

    componentDidUpdate(){
        jenis_user = this.props.jenisUser;
    }

    componentDidMount(){
        // let param = '?nama=coba&username=coba&password=coba';
        // fetch('http://ciumbuleuit-puskesmas.000webhostapp.com/index.php/user/admin?nama=ab&username=ab&password=ab', {
        //     method: 'GET',
        //     // headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify({
        //     //     "nama": 'coba',
        //     //     "username": 'coba',
        //     //     "password": 'coba',
        //     //     // "jenis_user": jenis_user
        //     // })
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     }); 
    }

    insertUser(){
        let link = 'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/user/tambah';
        let jenis = jenis_user;
        console.log(jenis);
        let nama = document.getElementById('nama').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let no_telp = document.getElementById('no_telp').value;
        let alamat = document.getElementById('alamat').value;
        link += '?nama='+nama+'&username='+username+'&password='+password+'&jenis='+jenis+'&no_telp='+no_telp+'&alamat='+alamat;
        // if (jenis_user == 1){
        //     link += 'admin?nama='+ nama + '&username=' + username + '&password=' + password;
        // } else{
        //     link += 'kader?nama=' + nama + '&username=' + username + '&password=' + password;
        // }
        
        fetch(link, {
            // crossDomain: true,
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({
            //     "nama": nama,
            //     "username": username,
            //     "password": password,
            //     // "jenis_user": jenis_user
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
                                {this.props.jenisUser <= 1? "Form Tambah Admin" : (this.props.jenisUser === 2? "Form Tambah Kader" : "Form Tambah Petugas")}
                            </h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontSize: 'small'}}>
                        <form>
                            <label for="nama">Nama:</label>
                            <input type="text" id="nama" className="form-control" name="nama" placeholder="Nama..." ></input><br/>
                            <label for="username">Username:</label>
                            <input type="text" id="username" className="form-control" name="username" placeholder="Username..." ></input><br />
                            <label for="username">No. Telp :</label><br />
                            <input type="text" id="no_telp" className="form-control" name="no_telp" placeholder='No.Telp...'></input><br />
                            <label for="username">Alamat :</label><br />
                            <input type="text" id="alamat" className="form-control" name="alamat" placeholder='Alamat...'></input><br />
                            <label for="password">Password:</label>
                            <input type="password" id="password" className="form-control" name="password" placeholder="Password..."></input><br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.insertUser}>Tambah User</Button>
                        <Button onClick={this.props.onHide} style={{backgroundColor: "red"}}>Batal</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
