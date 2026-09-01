export type ATMStatus = "active" | "inactive" | "maintenance";

export type ATM = {
  id: string;
  terminalId: string;
  branch: string;
  location: string;
  status: ATMStatus;
};
