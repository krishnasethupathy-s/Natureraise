import React,{Component} from 'react';
import { Modal, Button, } from 'react-bootstrap';
import './ModalComponent.css'

export default class MyVerticallyCenteredModal extends Component {
  render() {
    return (
      <div> 
             <>
      <Modal centered show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.subtitle}</Modal.Body>
        <Modal.Footer>
        {/*  */}
          <Button variant="primary" onClick={this.props.handleClose}>
            {this.props.cancel_title}
          </Button>
          <Button variant="secondary" onClick={this.props.handle_delete_record}>
          {this.props.delete_title}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
     </div>
    );
  }
}
