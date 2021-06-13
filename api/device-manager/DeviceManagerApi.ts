import axios from 'axios';

class DeviceManagerApi {
  
  public async powerOff(deviceId: string, farmAddress: string) {
    console.log(`Calling remote server node at address ${farmAddress} to power off device with id ${deviceId}`)

    // const endpoint = '/device-manager'; //from utils
    // const farmServiceAddress = farmAddress + endpoint;

    try {
      const res = await axios.post(farmAddress, { deviceId: deviceId });
      console.log('Success! The device has been reached...');
      //the root node will send back res t/f here. For now in dev, just send back true
      return true;
    } catch (error) {
      console.log('Error! Could not ping root server...' + error);
      return false;
    }
  }
}

export default DeviceManagerApi;