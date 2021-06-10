import DeviceManagerService from './DeviceManagerService';
  
class DeviceManagerController {
  private deviceManagerService: DeviceManagerService;
  
  constructor() {
    this.deviceManagerService = new DeviceManagerService();
  }

  public async powerOff(deviceId: string, farmAddress: string) {
    let isPoweredOff: boolean;

    //call DeviceManagerService
    await this.deviceManagerService.powerOff(deviceId, farmAddress)
      .then(() => {
        isPoweredOff = true;
      })
      .catch(error => {
        isPoweredOff = false;
      })
  }
}

export default DeviceManagerController;