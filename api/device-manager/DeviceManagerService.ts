import DeviceManagerApi from './DeviceManagerApi';

class DeviceManagerService {
  private deviceManagerApi: DeviceManagerApi;
  
  constructor() {
    this.deviceManagerApi = new DeviceManagerApi();
  }

  public async powerOff(deviceId: string, farmAddress: string) {
    const { deviceManagerApi } = this;
    
    return await deviceManagerApi.powerOff(deviceId, farmAddress);
  }
}

export default DeviceManagerService;