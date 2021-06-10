import axios from 'axios';

class DeviceManagerApi {
  
  public async powerOff(deviceId: string, farmAddress: string) {
    console.log(`Calling remote farm server node at address ${farmAddress} to power off this device with id ${deviceId}`)

    let isPoweredOff: boolean
    //farmAddress + '/' + deviceId + '/powerOff'

    //get root node url (example: https://httpbin.org/post)
    await axios.post(farmAddress) 
      .then(() => {
        console.log('Successfully pinged root server...');
        isPoweredOff = true;
      })
      .catch(error => {
        console.log('Error! Could not ping root server...' + error);
        isPoweredOff = false;
      })
    
    return isPoweredOff;
  }
}

export default DeviceManagerApi;