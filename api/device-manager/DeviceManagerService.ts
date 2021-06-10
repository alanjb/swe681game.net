import DeviceManagerApi from './DeviceManagerApi';

class DeviceManagerService {
  private deviceManagerApi: DeviceManagerApi;
  
  constructor() {
    this.deviceManagerApi = new DeviceManagerApi();
  }

  public async powerOff(deviceId: string, farmAddress: string) {
    let isPoweredOff: boolean;
    
    //call device manager API to ping remote farm root node.
    await this.deviceManagerApi.powerOff(deviceId, farmAddress)
      .then(() => {
        isPoweredOff = true;
      })
      .catch(() => {
        isPoweredOff = false;
      })
    
      return isPoweredOff;
  }
}

export default DeviceManagerService;