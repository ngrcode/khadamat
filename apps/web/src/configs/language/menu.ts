import { t } from '.';

const normalizeMenuTitle = (title?: string) =>
  (title ?? '').replace(/\s+/g, ' ').trim();

const SERVER_MENU_TITLE_KEYS: Record<string, string> = {
  [normalizeMenuTitle('داشبورد')]: 'menuDashboard',
  [normalizeMenuTitle('خانه')]: 'menuHome',
  [normalizeMenuTitle('اصلی')]: 'menuMain',
  [normalizeMenuTitle('تابلو اعلانات')]: 'menuBulletinBoard',
  [normalizeMenuTitle('لیست اعلانات')]: 'menuNotificationList',
  [normalizeMenuTitle('افزودن اعلان جدید')]: 'menuNotificationCreate',
  [normalizeMenuTitle('رویداد های نزدیک')]: 'menuUpcomingEvents',
  [normalizeMenuTitle('لیست رویداد ها')]: 'menuEventList',
  [normalizeMenuTitle('افزودن رویداد جدید')]: 'menuEventCreate',
  [normalizeMenuTitle('مدیریت کاربران')]: 'menuUserManagement',
  [normalizeMenuTitle('لیست کاربران')]: 'menuUserList',
  [normalizeMenuTitle('ایجاد کاربر جدید')]: 'menuUserCreate',
  [normalizeMenuTitle('مرخصی ها')]: 'menuLeaves',
  [normalizeMenuTitle('لیست مرخصی ها')]: 'menuLeaveList',
  [normalizeMenuTitle('ثبت مرخصی جدید')]: 'menuLeaveCreate',
  [normalizeMenuTitle('ایجاد مرخصی جدید')]: 'menuLeaveCreate',
  [normalizeMenuTitle('پیام ها')]: 'menuMessages',
  [normalizeMenuTitle('لیست پیام ها')]: 'menuMessageList',
  [normalizeMenuTitle('فیش حقوقی')]: 'menuPayroll',
  [normalizeMenuTitle('بارگزاری فیش حقوقی')]: 'menuPayrollUpload',
  [normalizeMenuTitle('لیست فیش ها')]: 'menuPayrollList',
  [normalizeMenuTitle('واحد های سازمانی')]: 'menuOrganizationUnits',
  [normalizeMenuTitle('لیست واحد ها')]: 'menuUnitList',
  [normalizeMenuTitle('ایجاد واحد جدید')]: 'menuUnitCreate',
  [normalizeMenuTitle('پیرایشگاه')]: 'menuBarberShop',
  [normalizeMenuTitle('لیست پیرایشگاه')]: 'menuBarbershopList',
  [normalizeMenuTitle('ولنجک')]: 'menuVelenjak',
  [normalizeMenuTitle('لیست رزرو ولنجک')]: 'menuVelenjakReservationAllowableList',
  [normalizeMenuTitle('نقش ها')]: 'menuRoles',
  [normalizeMenuTitle('لیست نقش ها')]: 'menuRoleList',
  [normalizeMenuTitle('افزودن نقش جدید')]: 'menuRoleCreate',
  [normalizeMenuTitle('کسر اقساط')]: 'menuInstallmentDeduction',
  [normalizeMenuTitle('بروزرسانی شماره تلفن کارمندان')]: 'menuEmployeePhoneUpdate',
  [normalizeMenuTitle('احکام کارگزینی')]: 'menuHrOrders',
  [normalizeMenuTitle('لیست احکام')]: 'menuHrOrderList',
  [normalizeMenuTitle('افزودن حکم جدید')]: 'menuHrOrderCreate',
};

const MENU_URL_KEYS: Record<string, string> = {
  '/dashboard': 'menuDashboard',
  '/dashboard/notification': 'menuNotificationList',
  '/dashboard/notificationCreate': 'menuNotificationCreate',
  '/dashboard/notificationPanel': 'menuEventList',
  '/dashboard/notificationPanelCreate': 'menuEventCreate',
  '/dashboard/users': 'menuUserList',
  '/dashboard/usersCreate': 'menuUserCreate',
  '/dashboard/requestLeave': 'menuLeaveList',
  '/dashboard/requestLeaveCreate': 'menuLeaveCreate',
  '/dashboard/ticket': 'menuMessageList',
  '/dashboard/excelDetail': 'menuPayrollUpload',
  '/dashboard/excelCreate': 'menuPayrollUpload',
  '/dashboard/excel': 'menuPayrollList',
  '/dashboard/unitEmployee': 'menuUnitList',
  '/dashboard/unitEmployeeCreate': 'menuUnitCreate',
  '/dashboard/barbershop': 'menuBarberShop',
  '/dashboard/velenjakReservationAllowable': 'menuVelenjak',
  '/dashboard/roles': 'menuRoleList',
  '/dashboard/rolesCreate': 'menuRoleCreate',
  '/dashboard/humanResource': 'menuInstallmentDeduction',
  '/dashboard/updatePhone': 'menuEmployeePhoneUpdate',
  '/dashboard/hokm': 'menuHrOrderList',
  '/dashboard/hokmCreate': 'menuHrOrderCreate',
};

const MENU_ROUTES_BY_KEY: Record<string, string> = {
  menuDashboard: '/dashboard',
  menuHome: '/dashboard',
  menuMain: '',
  menuBulletinBoard: '#',
  menuNotificationList: '/dashboard/notification',
  menuNotificationCreate: '/dashboard/notificationCreate',
  menuUpcomingEvents: '#',
  menuEventList: '/dashboard/notificationPanel',
  menuEventCreate: '/dashboard/notificationPanelCreate',
  menuUserManagement: '#',
  menuUserList: '/dashboard/users',
  menuUserCreate: '/dashboard/usersCreate',
  menuLeaves: '#',
  menuLeaveList: '/dashboard/requestLeave',
  menuLeaveCreate: '/dashboard/requestLeaveCreate',
  menuMessages: '#',
  menuMessageList: '/dashboard/ticket',
  menuPayroll: '#',
  menuPayrollUpload: '/dashboard/excelCreate',
  menuPayrollList: '/dashboard/excel',
  menuOrganizationUnits: '#',
  menuUnitList: '/dashboard/unitEmployee',
  menuUnitCreate: '/dashboard/unitEmployeeCreate',
  menuBarberShop: '/dashboard/barbershop',
  menuBarbershopList: '/dashboard/barbershop',
  menuVelenjak: '/dashboard/velenjakReservationAllowable',
  menuVelenjakReservationAllowableList: '/dashboard/velenjakReservationAllowable',
  menuRoles: '#',
  menuRoleList: '/dashboard/roles',
  menuRoleCreate: '/dashboard/rolesCreate',
  menuInstallmentDeduction: '/dashboard/humanResource',
  menuEmployeePhoneUpdate: '/dashboard/updatePhone',
  menuHrOrders: '#',
  menuHrOrderList: '/dashboard/hokm',
  menuHrOrderCreate: '/dashboard/hokmCreate',
};

export const getServerMenuTranslationKey = (title?: string, url?: string) => {
  const normalizedTitle = normalizeMenuTitle(title);
  const normalizedUrl = normalizeMenuTitle(url);

  return (
    SERVER_MENU_TITLE_KEYS[normalizedTitle] ??
    MENU_URL_KEYS[normalizedUrl] ??
    undefined
  );
};

export const translateServerMenuTitle = (title?: string, url?: string) => {
  const translationKey = getServerMenuTranslationKey(title, url);
  return translationKey ? t(translationKey) : normalizeMenuTitle(title);
};

export const resolveServerMenuRoute = (title?: string, url?: string) => {
  const translationKey = getServerMenuTranslationKey(title, url);

  if (translationKey && Object.prototype.hasOwnProperty.call(MENU_ROUTES_BY_KEY, translationKey)) {
    return MENU_ROUTES_BY_KEY[translationKey];
  }

  const normalizedUrl = normalizeMenuTitle(url);
  return normalizedUrl || undefined;
};

export const isDefaultOpenMenuKey = (translationKey?: string) =>
  translationKey === 'menuDashboard' || translationKey === 'menuMain';
