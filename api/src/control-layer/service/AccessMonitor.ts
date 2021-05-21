

// Creates and configures an AccessMonitor which verifies that the executor of a script is root. 
export default class AccessMonitor {
  //rep-inv:
    //isRoot cannot be null

  private isRoot: boolean; 

  /**
   * Contract
   * - Effects: @throws Error if an attempt to subclass this class is made.
   *            else, allow for initialization of the object.
   * 
   * **/
  private constructor() {
    if (new.target !== AccessMonitor) {
      throw new Error('Sub-classing is not allowed. Goodbye.');
    }

    this.isRoot = false; //default configuration for AccessMonitor objects
  }
    
    /**
   * Contract
   * - Effects: @throws Error if an attempt to subclass this class is made.
   *            else, allow for initialization of the object.
   * 
   * Promise-based static factory method to create an AccessMonitor object 
   * **/
  static create(): Promise<AccessMonitor> {
    const accessMonitorObject = new AccessMonitor();

    console.log(accessMonitorObject);

    if (accessMonitorObject == null) {
      return Promise.resolve(null);
    }

    return Promise.resolve(accessMonitorObject);
  }


  /** 
   * Contract
   * - Effects: @throws Error if failed to connect to host operating system. 
   *            @throws Error if executor of script is not root. 
   *            @return false if Error is thrown. 
   *            @return true if script 
   * 
   * **/
  private ensureCallerIsRoot() {
    //call os and check if caller of script is root user. 
    const { exec } = require("child_process");
    let isRoot: boolean;

    exec('./control-layer/scripts/control.sh', (error, stdout, stderr) => {
        if (error) {
            isRoot = false;
            throw new Error('Error: Failed to connect to host operating system. Goodbye.'); 
        }

        if (!stderr) {
            isRoot = false;
            throw new Error('Not root. Goodbye.'); 
        }

        if (stdout) {
            console.log('Root...Welcome.')
            isRoot = true;
        }

    });
    
    return isRoot;
}

 
}