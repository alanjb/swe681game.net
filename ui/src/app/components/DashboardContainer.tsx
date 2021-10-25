import { Component, Fragment } from 'react';
import history from '../routing/history';
import CreateGameModal from '../../game/components/CreateGameModal';
import { Button, Col, Container, Row } from 'reactstrap';
import Game from '../../game/models/Game';

class DeviceManagerContainer extends Component {
  state: State = {
    isCreateGameModalOpen: false,
  };

  render() {
    const { isCreateGameModalOpen } = this.state;
    const { toggleCreateGameModal, gameCreated } = this;

    return (
      <Fragment>
        <div className="dashboard-container">
          <Container className="dashboard-content themed-container" fluid={true}>
            <Row>
              <Col>
                <h2 className="dashboard-header">Dashboard</h2>
              </Col>
              <Col>
                <div className="create-button-container justify-content-end">
                  <Button className="align-self-end" color="info" onClick={toggleCreateGameModal}>
                    Create new game
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  test
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <CreateGameModal isOpen={isCreateGameModalOpen} toggle={toggleCreateGameModal} created={gameCreated} />
      </Fragment>
    );
  }

  toggleCreateGameModal = () => {
    this.setState({ isCreateGameModalOpen: !this.state.isCreateGameModalOpen });
  };

  gameCreated = (game: Game) => {
    const { toggleCreateGameModal } = this;

    toggleCreateGameModal();

    history.push(`/game/${1}`);
  }

  createGame() {
    console.log('creating game...');

    // const playersArray = ['john@gmail.com', 'jim@gmail.com'];
  
    //get other settings - use a create new game modal 
  //   axios
  //     .post(`http://localhost:8000/api/game/create`, {playersArray: playersArray})
  //     .then(res => {
  
  //       if(res.data){
  //         // const { history } = this.props;
  //         const { gameId } = res.data;
  //         //redirect to GameContainer using router and game id
  //         alert("Starting game...redirecting... ");
  //         history.push(`/game/${gameId}`);
  //       }
  //     })
  //     .catch(error => {
  //       alert("Error! Failed to create game: " + error);
  //     })
  }
}

type State = {
  isCreateGameModalOpen: boolean;
}

export default DeviceManagerContainer;