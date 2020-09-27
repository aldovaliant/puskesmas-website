import React, { Component } from 'react'
import './css/daftarUser.css'
import '../css/fontawesome/css/all.css'
import avatar1 from '../../assets/images/avatar1.jpg';
import ModalTambahUser from './modalTambahUser';
import ModalEditUser from './modalEditUser';
import ModalHapusUser from './modalHapusUser';

export default class daftarUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdmin: false,
            showKader: false,
            showPetugas: false,
            admin: [],
            kader: [],
            petugas: [],
            show: false,
            showEdit: false,
            showHapus: false,
            jenisUser: 0,
            idUserEdit: 0,
            namaUserEdit: '',
            usernameUserEdit: '',
            noTelpEdit: '',
            alamatEdit: ''
        }
    }

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
        fetch('https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/user/', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((res) => {
            // console.log(res);
            let adminArr = [], kaderArr = [], petugasArr = [];
            for (let i = 0; i < res.length; i++) {
                if(res[i].id_jenis === '1'){
                    adminArr.push(res[i]);
                } else if (res[i].id_jenis === '2'){
                    kaderArr.push(res[i]);
                } else {
                    petugasArr.push(res[i]);
                }
            }
            this.setState({
                admin: adminArr,
                kader: kaderArr,
                petugas: petugasArr
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
        if (this.state.admin.length > 0) {
            for (let i = 0; i < this.state.admin.length; i++) {
                div.push(
                    <li class="w3-bar">
                        <span onClick={() => this.setUserHapus(1, i)} class="w3-bar-item w3-button w3-border w3-grey w3-right"><i class="fas fa-trash" style={{ color: 'red' }} /></span>
                        <span onClick={() => this.setUserEdit(1, i)} class="w3-bar-item w3-button w3-border w3-grey w3-right"><i class="fas fa-edit" /></span>
                        {/* <img src={avatar2} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} /> */}
                        <div class="w3-bar-item">
                            <span class="w3-large">Nama : {this.state.admin[i].nama}</span><br />
                            <span>Last login : {this.state.admin[i].last_login}</span>
                        </div>
                    </li>
                ); 
            }
            return div;
        }
    }

    createKaderList() {
        let div = [];
        if(this.state.kader.length > 0){
            for (let i = 0; i < this.state.kader.length; i++) {
                div.push(
                    <li class="w3-bar">
                        <span onClick={() => this.setUserHapus(2, i)} class="w3-bar-item w3-button w3-border w3-grey w3-right"><i class="fas fa-trash" style={{color:'red'}}/></span>
                        <span onClick={() => this.setUserEdit(2, i)} class="w3-bar-item w3-button w3-border w3-grey w3-right"><i class="fas fa-edit" /></span>
                        {/* <img src={avatar3} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} /> */}
                        <div class="w3-bar-item">
                            <span class="w3-large">Nama : {this.state.kader[i].nama}</span><br />
                            <span>Last login : {this.state.kader[i].last_login}</span>
                        </div>
                    </li>
                );
            }
            return div;
        }
    }

    createPetugasList() {
        let div = [];
        if(this.state.petugas.length > 0){
            for (let i = 0; i < this.state.petugas.length; i++) {
                div.push(
                    <li class="w3-bar">
                        <span onClick={() => this.setUserHapus(3, i)} class="w3-bar-item w3-button w3-border w3-grey w3-right"><i class="fas fa-trash" style={{ color: 'red' }} /></span>
                        <span onClick={() => this.setUserEdit(3, i)} class="w3-bar-item w3-button w3-border w3-grey w3-right"><i class="fas fa-edit" /></span>
                        {/* <img src={avatar3} alt="" class="w3-bar-item w3-circle w3-hide-small" style={{ 'width': '85px' }} /> */}
                        <div class="w3-bar-item">
                            <span class="w3-large">Nama : {this.state.petugas[i].nama}</span><br />
                            <span>Last login : {this.state.petugas[i].last_login}</span>
                        </div>
                    </li>
                );
            }
            return div;
        }
    }

    // componentDidUpdate(){
    //     console.log(this.state.showEdit);
    // }

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

    setUserEdit = (jenis,i) => {
        if(jenis === 1){
            this.setState({
                idUserEdit: this.state.admin[i].id,
                namaUserEdit: this.state.admin[i].nama,
                usernameUserEdit: this.state.admin[i].username,
                noTelpEdit: this.state.admin[i].no_telp,
                alamatEdit: this.state.admin[i].alamat
            });
        }else if(jenis === 2){
            this.setState({
                idUserEdit: this.state.kader[i].id,
                namaUserEdit: this.state.kader[i].nama,
                usernameUserEdit: this.state.kader[i].username,
                noTelpEdit: this.state.kader[i].no_telp,
                alamatEdit: this.state.kader[i].alamat
            });
        } else{
            this.setState({
                idUserEdit: this.state.petugas[i].id,
                namaUserEdit: this.state.petugas[i].nama,
                usernameUserEdit: this.state.petugas[i].username,
                noTelpEdit: this.state.petugas[i].no_telp,
                alamatEdit: this.state.petugas[i].alamat
            });
        }
        this.handleShowEdit();
    }

    setUserHapus = (jenis, i) => {
        if (jenis === 1) {
            this.setState({
                idUserEdit: this.state.admin[i].id,
                namaUserEdit: this.state.admin[i].nama,
            });
        } else if (jenis === 2) {
            this.setState({
                idUserEdit: this.state.kader[i].id,
                namaUserEdit: this.state.kader[i].nama,
            });
        } else {
            this.setState({
                idUserEdit: this.state.petugas[i].id,
                namaUserEdit: this.state.petugas[i].nama,
            });
        }
        this.handleShowHapus();
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

    handleCloseHapus = () => {
        this.setState({
            showHapus: false
        });
    }
    handleShowHapus = () => {
        this.setState({
            showHapus: true
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

                <div id="daftar-petugas" class="w3-padding w3-right">
                    <ul class="w3-ul w3-card-4">
                        <li>
                            <h5>Daftar Petugas</h5>
                        </li>
                        {this.createPetugasList()}
                        <li class="w3-bar">
                            <span onClick={() => this.setJenis(3)} class="w3-bar-item w3-button w3-xlarge w3-right w3-border w3-green">
                                Tambah Petugas +
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
                

                <ModalTambahUser 
                    show={this.state.show}
                    onHide={() => this.handleClose()}
                    jenisUser={this.state.jenisUser}>
                    {this.state.jenisUser}
                </ModalTambahUser>

                <ModalEditUser
                    show={this.state.showEdit}
                    onHide={this.handleCloseEdit}
                    nama={this.state.namaUserEdit}
                    username={this.state.usernameUserEdit}
                    id={this.state.idUserEdit}
                    no_telp={this.state.noTelpEdit}
                    alamat={this.state.alamatEdit}
                >
                    Form Edit Data User
                </ModalEditUser>

                <ModalHapusUser
                    show={this.state.showHapus}
                    id={this.state.idUserEdit}
                    nama={this.state.namaUserEdit}
                    onHide={this.handleCloseHapus}
                >
                </ModalHapusUser>
            </div>
        )
    }
}
