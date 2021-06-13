import DeviceManagerService from './DeviceManagerService';
  
class DeviceManagerController {
  private deviceManagerService: DeviceManagerService;
  
  constructor() {
    this.deviceManagerService = new DeviceManagerService();
  }

  public powerOff(deviceId: string, farmAddress: string) {
    const { deviceManagerService } = this;

    return deviceManagerService.powerOff(deviceId, farmAddress);
  }
}

export default DeviceManagerController;