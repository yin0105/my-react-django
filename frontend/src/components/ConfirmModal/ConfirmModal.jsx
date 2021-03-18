import React from 'react';
import { Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Button from "../../components/CustomButton/CustomButton";

const ConfirmModal = props => (
  <Modal show={props.show} onHide={props.dismiss} backdrop={props.enableEscape ? true : 'static'} keyboard={props.enableEscape}>
    <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.confirmation}</Modal.Body>

    <Modal.Footer>
      {props.cancelLabel !== 'null' &&
        <Button simple onClick={props.dismiss}>{props.cancelLabel}</Button>
      }
      <Button bsStyle="success" fill onClick={props.proceed}>{props.okLabel}</Button>
    </Modal.Footer>

  </Modal>
);

ConfirmModal.propTypes = {
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.any,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  enableEscape: true,
};

export default confirmable(ConfirmModal);
