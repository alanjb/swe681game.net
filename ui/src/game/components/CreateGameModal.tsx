import { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class CreateGameModal extends Component<Props> {
  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>Create New Game</ModalHeader>
        <ModalBody>
          test
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Create Game</Button>
        </ModalFooter>
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