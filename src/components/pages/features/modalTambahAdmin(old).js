import React, { Component } from 'react';
import './css/modalTambahAdmin.scss';

export default class modalTambahAdmin extends Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    tambah = () => {
        this.props.parentCallback(document.getElementsByTagName('input')[0].value);
        this.onClose();
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div class="modal w3-center" id="modal">
                <h2>{this.props.children}</h2>
                <div class="content">
                    <form>
                        <label for="username">Username:</label>
                        <input type="text" name="username" placeholder="Username..."></input>
                        <label for="password">Password:</label>
                        <input type="password" name="password" placeholder="Password..."></input>
                        <label for="telp">No. Telp:</label>
                        <input type="text" name="telp" placeholder="No. Telp"></input>
                    </form>
                </div>
                <div class="actions">
                    <button class="toggle-button" onClick={this.onClose} style={{ marginLeft: '5px', marginRight: '5px' }}>
                        batal
                    </button>
                    <button class="" onClick={this.tambah} style={{ marginLeft: '5px', marginRight: '5px' }}>
                        tambah
                    </button>
                </div>
            </div>
        );
    }
}
