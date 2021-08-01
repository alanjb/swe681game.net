import React, {Fragment, Component}  from 'react';

class AppContainer extends Component {
  render() {
    const { children } = this.props;

    return (
       <Fragment>
          <div id="app-container" className="content-wrapper">
            {children}
          </div>
      </Fragment>
    );
  }
}

export default AppContainer;