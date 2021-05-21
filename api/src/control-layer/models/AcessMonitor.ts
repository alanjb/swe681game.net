import AccessMonitor from "../services/AccessMonitor";

export interface accessMonitor {
  isRoot: boolean;
  ensureCallerIsRoot: () => Promise<boolean>;
  create: () => Promise<AccessMonitor>
}