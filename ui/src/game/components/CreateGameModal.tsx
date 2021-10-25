import { Component } from 'react';
import {Modal, ModalBody} from 'reactstrap';

class CreateGameModal extends Component<Props> {
  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalBody>
          test
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateGameModal;

type Props = {
  isOpen: boolean;
  toggle: () => void;
  created: () => void;
};