import DeviceManagerController from './DeviceManagerController';

describe("device-manager-api-testing", () => {
  it("power off requested device", () => {
    const deviceManagerController = new DeviceManagerController();
    
    deviceManagerController.powerOff('123', 'https://httpbin.org/post').then((response) => {
      expect(response).toBe(true)
    })
  });
});