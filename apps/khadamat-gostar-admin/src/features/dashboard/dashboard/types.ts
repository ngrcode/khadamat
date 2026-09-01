export type AccountInfo = {
  id?: number;
  userId?: number;
  employment_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  photo?: string | null;
  photo_a_path?: string | null;
  center_names?: string | null;
  unit_name?: string | null;
  unitId?: number;
  mobile?: string | null;
  email?: string | null;
};

export type DashboardNotificationPanel = {
  id?: number;
  title?: string | null;
  excerpt?: string | null;
  body?: string | null;
  startedAtString?: string | null;
  finishedAtString?: string | null;
  attachFile?: string | null;
};

export type DashboardNotification = {
  id?: number;
  title?: string | null;
  body?: string | null;
  created?: string | null;
  attachFile?: string | null;
};

export type DashboardTicketResponse = {
  id?: number;
  text?: string | null;
  senderFullName?: string | null;
  entryDateTime?: string | null;
  isSender?: boolean;
};

export type DashboardMessage = {
  id: string;
  sender: string;
  text: string;
  time: string;
  align: 'start' | 'end';
};
