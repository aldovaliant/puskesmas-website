import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

var id;
export default class modalHapusUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidUpdate(){
        id = this.props.id;
    }

    hapusUser(){
        console.log(id);
        let link = 'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/user/hapus?id=' + id;
        fetch(link, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((res) => {
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
                    style={{ width: '500px', marginLeft: '180px', marginTop: '0px' }}
                    className="w3-display-center"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h3>Konfirmasi</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='w3-center'>
                        <p>Apakah Anda yakin ingin menghapus {this.props.nama}?</p>
                        <Button onClick={this.hapusUser} style={{margin: '10px'}}>Ya</Button>
                        <Button onClick={this.props.onHide} style={{ margin: '10px',backgroundColor: "red" }}>Batal</Button>
                    </Modal.Body>
                    
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        )
    }
}
