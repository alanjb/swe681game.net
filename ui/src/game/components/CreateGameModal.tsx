import axios from 'axios';
import { Component } from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Game from '../models/Game';
import Player from '../models/Player';

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
              <Label className="label-text" for="exampleEmail">Required chips per player</Label>
              <Input type="email" name="email" id="exampleEmail" /><br/>
            </FormGroup>
            <FormGroup>
              <Label className="label-text" for="examplePassword">Anti price</Label>
              <Input type="password" name="password" id="examplePassword" /><br/>
            </FormGroup>
            <FormGroup>
              <Label className="label-text" for="examplePassword">Invite players (up to 5)</Label>
              <Input type="password" name="password" id="examplePassword" /><br/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={create}>Create</Button>
          <Button color="warning" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  create = () => {
    const { created } = this.props;
    const playersArray: Player[] = [];

    //Below is for testing

    const p1: Player = {
      id: "000",
      folded: false,
      hand: [],
      isDealer: false,
      points: 0
    }

    const p2: Player = {
      id: "111",
      folded: false,
      hand: [],
      isDealer: false,
      points: 0
    }

    playersArray.push(p1);
    playersArray.push(p2);


    //use Partial here, only need requiredPointsPerPlayer, antiAmount, players
    const newGame: Game = {
      id: "0",
      pot: 0,
      roundCount: 1,
      status: "starting",
      players: playersArray,
      deck: [],
      requiredPointsPerPlayer: 500,
      antiAmount: 5000
    }
  
    axios
      .post(`http://localhost:8000/api/game/create`, {game: newGame})
      .then(res => {
        if(res.data){
          const { game } = res.data;

          console.log(game)

          created(game);
        }
      })
      .catch(error => {
        alert("Error! Failed to create game: \n\n" + error);
      })
  }
}

export default CreateGameModal;

type Props = {
  isOpen: boolean;
  toggle: () => void;
  created: (game: Game) => void;
};