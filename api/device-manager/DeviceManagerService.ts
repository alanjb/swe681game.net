import DeviceManagerApi from './DeviceManagerApi';

class DeviceManagerService {
  private deviceManagerApi: DeviceManagerApi;
  
  constructor() {
    this.deviceManagerApi = new DeviceManagerApi();
  }

  public powerOff(deviceId: string, farmAddress: string) {
    const { deviceManagerApi } = this;
    
    return deviceManagerApi.powerOff(deviceId, farmAddress);
  }
}

export default DeviceManagerService;