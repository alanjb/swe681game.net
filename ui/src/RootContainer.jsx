import React, { Component, Fragment } from 'react';

class RootContainer extends Component {
  render() { 
      const { router } = this.props;

      return (
        <Fragment>
            {/* <NavbarContainer /> */}
            {router}
        </Fragment>
      );
    }
}


export default RootContainer;
