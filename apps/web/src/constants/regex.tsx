export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
export const PHONE_REGEX = /^9[0-9]{2}[0-9]{3}[0-9]{4}/i;
export const MOBILE_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const PHONE_NUMBER_REGEX =
  /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi;
export const INTEGER_REGEX = /^\d+$/;
export const JUST_PERSIAN_REGEX = /^[\u0600-\u06FF\s]+$/;
export const JUST_ENGLISH_REGEX = /^[A-Za-z_\-\s]+$/gi;
export const NUMBER_REGEXP = /^[0-9]*$/;
export const WEBSITE_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
