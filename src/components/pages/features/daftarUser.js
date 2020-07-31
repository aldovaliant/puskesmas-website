import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { Button, Modal } from 'react-bootstrap';
import './css/daftarUser.css'
import '../css/fontawesome/css/all.css'
import avatar1 from '../../assets/images/avatar1.jpg';
import avatar2 from '../../assets/images/avatar2.png';
import avatar3 from '../../assets/images/avatar3.jpg';
// import avatar4 from '../../assets/images/avatar4.jpg';
// import avatar5 from '../../assets/images/avatar5.png';
import ModalTambahUser from './modalTambahUser';
import ModalEditUser from './modalEditUser';
// import PropTypes from "prop-types";

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool.isRequired
// };

export default class daftarUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdmin: false,
            showKader: false,
            admin: [],
            kader: [],
            show: false,
            showEdit: false,
            jenisUser: 0,
            idUserEdit: 0,
            namaUserEdit: '',
            usernameUserEdit: '',
        }
    }
    

    componentDidMount() {
        var temptIdUser = [];
        var temptNama = [];
        var temptLastLogin = [];
        var link = "https://webistepuskesmas.000webhostapp.com/mysql-ci-restAPI/index.php/user/";
        fetch(link)
        .then(res => res.json())
        .then((res) => {
            // for(var i=0; i<res.length; i++){
                temptIdUser[0] = res.id_user;
                temptNama[0] = res.nama;
                temptLastLogin[0] = res.last_login;
                // this.state.counter = res.length;
            // };
            console.log(res);
            // console.log(this.state.counter);
            this.setState({
                idUser: temptIdUser,
                nama: temptNama,
                lastLogin: temptLastLogin
            });
        });
    };

    createDivContainer = () => {
        let res = [];
        for (var i = 0; i < 1; i++) {
            res.push(this.createDivListAdmin(i));
        };
        return res;
    };

    createDivListAdmin = (i) => {
        let container = [],
            children = [];
            children.push(
            <li class="list-admin w3-bar">
                <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-grey w3-right">edit</span>
                <img src={avatar1} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} />
                <div class="w3-bar-item">
                    <span class="w3-large">{this.state.nama[i]}</span><br />
                    <span>Admin {this.state.idUser[i]}</span>
                </div>
            </li>
        );
        container.push(<div>{children}</div>);
        return container;
    };

    componentDidMount = () => {
        fetch('http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/user/', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((res) => {
            // console.log(res[0].);
            let adminArr = [], kaderArr = [];
            for (let i = 0; i < res.length; i++) {
                if(res[i].id_jenis === '1'){
                    adminArr.push(res[i]);
                } else{
                    kaderArr.push(res[i]);
                }
                
            }
            this.setState({
                admin: adminArr,
                kader: kaderArr
            });
        })
        .catch((error) => {
            console.error(error);
        }); 
    }

    callbackFunction = (childData) => {
        // console.log(childData);
        // let ct = document.getElementById("list-admin").childElementCount;
        // document.getElementsByClassName("list-admin")[ct - 2].innerHTML += `<li class="list-admin w3-bar">
        // <span onClick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-grey w3-right">edit</span>
        // <img src={avatar1} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} />
        // <div class="w3-bar-item">
        //     <span class="w3-large">`+ childData + `</span><br />
        //     <span>Admin</span>
        // </div>
        // </li>`
    };

    createAdminList(){
        let div = [];
        for (let i = 0; i < this.state.admin.length; i++) {
            div.push(
                <li class="w3-bar">
                    <span onClick={() => this.setUserEdit(true,i)} class="w3-bar-item w3-button w3-grey w3-right">edit</span>
                    <img src={avatar2} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} />
                    <div class="w3-bar-item">
                        <span class="w3-large">Nama : {this.state.admin[i].nama}</span><br />
                        <span>Last login : {this.state.admin[i].last_login}</span>
                    </div>
                </li>
            ); 
        }
        return div;
    }

    createKaderList() {
        let div = [];
        for (let i = 0; i < this.state.kader.length; i++) {
            div.push(
                <li class="w3-bar">
                    <span onClick={() => this.setUserEdit(false,i)} class="w3-bar-item w3-button w3-grey w3-right">edit</span>
                    <img src={avatar3} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} />
                    <div class="w3-bar-item">
                        <span class="w3-large">Nama : {this.state.kader[i].nama}</span><br />
                        <span>Last login : {this.state.kader[i].last_login}</span>
                    </div>
                </li>
            );
        }
        return div;
    }

    componentDidUpdate(){
        console.log(this.state.showEdit);
    }

    setJenis = (jenis) => {
        this.setState({
            jenisUser: jenis
        })
        this.handleShow();
    }

    handleClose = () => {
        this.setState({
            show: false
        });
        // window.location.reload(false);
    }
    handleShow = () => {
        this.setState({
            show: true
        });
    }

    setUserEdit = (isAdmin,i) => {
        if(isAdmin === true){
            this.setState({
                idUserEdit: this.state.admin[i].id_user,
                namaUserEdit: this.state.admin[i].nama,
                usernameUserEdit: this.state.admin[i].username,
            });
        }
        this.handleShowEdit();
    }

    handleCloseEdit = () => {
        this.setState({
            showEdit: false
        });
        // window.location.reload(false);
    }
    handleShowEdit = () => {
        this.setState({
            showEdit: true
        });
    }

    render() {
        return (
            <div id="daftar">
                <div id="daftar-admin" class="w3-padding">
                    <ul id="list-admin" class="w3-ul w3-card-4">
                        <li>
                            <h5>Daftar Admin</h5>
                        </li>
                        {/* <li class="list-admin w3-bar">
                            <span onClick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-grey w3-right">edit</span>
                            <img src={avatar1} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} />
                            <div class="w3-bar-item">
                                <span class="w3-large">Aldo</span><br />
                                <span>Admin 1</span>
                            </div>
                        </li> */}
                        {this.createAdminList()}
                        <li class="list-admin w3-bar">
                            <span onClick={() => this.setJenis(1)} class="w3-bar-item w3-button w3-xlarge w3-right w3-border w3-green">
                                Tambah Admin +
                            </span>
                        </li>
                        
                    </ul>
                </div>

                <div id="daftar-kader" class="w3-padding w3-right">
                    <ul class="w3-ul w3-card-4">
                        <li>
                            <h5>Daftar Kader</h5>
                        </li>
                        {/* <li class="w3-bar">
                            <span onClick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-grey w3-right">edit</span>
                            <img src={avatar4} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} />
                            <div class="w3-bar-item">
                                <span class="w3-large">Udin</span><br />
                                <span>Kader 1</span>
                            </div>
                        </li> */}
                        {this.createKaderList()}
                        <li class="w3-bar">
                            <span onClick={() => this.setJenis(2)} class="w3-bar-item w3-button w3-xlarge w3-right w3-border w3-green">
                                Tambah Kader +
                            </span>
                        </li>
                    </ul>
                </div>

                <ModalTambahUser show={this.state.show}
                    onHide={() => this.handleClose()}
                    jenisUser={this.state.jenisUser}>
                    {this.state.jenisUser}
                </ModalTambahUser>
                <ModalEditUser
                    show={this.state.showEdit}
                    onHide={() => this.handleCloseEdit()}
                    nama={this.state.namaUserEdit}
                    username={this.state.usernameUserEdit}
                    id={this.state.idUserEdit}
                >
                    Form Edit Data User
                </ModalEditUser>
            </div>
        )
    }
}
