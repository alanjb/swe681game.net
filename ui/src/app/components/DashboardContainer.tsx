import { Component, Fragment } from 'react';
import history from '../routing/history';
import CreateGameModal from '../../game/components/CreateGameModal';
import { Button } from 'reactstrap';

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
            <Button color="info" onClick={toggleCreateGameModal}>
              Create new game
            </Button>
          </div>
          <CreateGameModal isOpen={isCreateGameModalOpen} toggle={toggleCreateGameModal} created={gameCreated} />
      </Fragment>
    );
  }

  toggleCreateGameModal = () => {
    console.log('toggle')
    this.setState({ isCreateGameModalOpen: !this.state.isCreateGameModalOpen });
  };

  gameCreated = () => {
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