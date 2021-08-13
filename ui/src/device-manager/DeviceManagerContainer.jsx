import React, { Component, Fragment } from 'react';
import axios from 'axios';
class DeviceManagerContainer extends Component {
  render() {
    return (
      <Fragment>
          <div id="device-manager-container" className="device-manager-container-class">
              device manager dashboard
              <br/>
              <br/>
              <br/>
              <button onClick={this.handleDevicePowerOff}>
                power off!
              </button>
          </div>
      </Fragment>
    );
  }

  handleDevicePowerOff = () => {
    const deviceId = "abc123"; //MAC Address
    // const farmAddress = "test"; //for testing
    const farmAddress = "https://httpbin.org/post"; //URL of server root node 

    //use env variables to config this network call
    axios
      .post(`http://localhost:8000/device-manager/powerOff`, {deviceId, farmAddress})
      .then(res => {
        //check if this network request was able to connect to user's device
        if(res.status === 200){
          //check if this network request was able to successfully power off device with return boolean value from Promise
          alert("Successfully pinged device: " + deviceId);
        }
      })
      .catch(error => {
        alert(error + ". Please verify your server address.")
      })
  }
}

export default DeviceManagerContainer;