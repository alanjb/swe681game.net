import axios from 'axios';
  
class DeviceManagerController {
  public powerOff(deviceId: string, farmAddress: string) {
    return axios
      .post(farmAddress, {deviceId: deviceId})
      .then(() => {
        console.log("Powered off server...");
        return Promise.resolve(true)
      })
      .catch((error) => {
        console.log("Failed to power off server..." + error)
        return Promise.reject(false)
      })
    };
}

export default DeviceManagerController;