import axios from 'axios';
import { Component } from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Game from '../models/Game';

class CreateGameModal extends Component<Props> {
  render() {
    const { isOpen, toggle } = this.props;
    const { create } = this;

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
          <Button color="primary" onClick={create}>Create</Button>
        </ModalFooter>
      </Modal>
    );
  }

  create = () => {
    const { created } = this.props;
    const playersArray = ['john@gmail.com', 'jim@gmail.com'];
  
    //get other settings - use a create new game modal 
    axios
      .post(`http://localhost:8000/api/game/create`, {playersArray: playersArray})
      .then(res => {
        if(res.data){
          const { game } = res.data;

          console.log(game)

          created(game);
        }
      })
      .catch(error => {
        alert("Error! Failed to create game: " + error);
      })

    
  }
}

export default CreateGameModal;

type Props = {
  isOpen: boolean;
  toggle: () => void;
  created: (game: Game) => void;
};