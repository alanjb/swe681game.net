import { Component } from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class CreateGameModal extends Component<Props> {
  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal size="lg" {...{ isOpen, toggle }}>
        <ModalHeader>Create New Game</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Required chips per player</Label>
              <Input type="email" name="email" id="exampleEmail" /><br/>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Anti price</Label>
              <Input type="password" name="password" id="examplePassword" /><br/>
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Invite players (up to 5)</Label>
              <Input type="password" name="password" id="examplePassword" /><br/>
            </FormGroup>
          </Form>
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