import DeviceManagerService from './DeviceManagerService';
  
class DeviceManagerController {
  private deviceManagerService: DeviceManagerService;
  
  constructor() {
    this.deviceManagerService = new DeviceManagerService();
  }

  public async powerOff() {
    let isEvent: boolean;

    if (this.deviceManagerService) {
      return await this.deviceManagerService.powerOff();
    }
   
    
        // logger.info('Controller: createTask', task);
        // return await taskService.createTask(task);
    }
}

export default DeviceManagerController;