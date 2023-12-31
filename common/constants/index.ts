export const EVENT_TYPE = {
  MOUSE_DOWN: "mousedown",
  CLICK: "click",
  MOUSE_UP: "mouseup",
  POINTER_DOWN: "pointerdown",
  POINTER_UP: "pointerup",
};

export const VARIANT_TYPE = {
  SUBTITLE_16: "subtitle16",
};

export const TOAST_VARIANTS = {
  SUCCESS: "success",
  LIGHT_THEME: "light",
};

export const FORM_CONSTANTS = {
  CHECKBOX: "checkbox",
};

export const PAGE_CONSTANTS = {
  CANDIDATES: "candidates",
};

export const ERROR_CODES = {
  ERROR_NETWORK: "ERR_NETWORK",
  ERROR_UNAUTHORIZED: 401,
  ERROR_FORBIDDEN: 403,
  STATUS_OK: 200,
};

export const VALIDATION_ERRORS = {
  REQUIRED_ERROR: "This field cannot be empty.",
  VALID_CONTACT_ERROR: "Mobile number should contain 10 digits",
  MAX_CHARACTER_ERROR: "Maximum length must be 30",
  SPECIAL_CHARACTER_ERROR: "Special characters and numbers are not allowed",
  NOT_NUMBER_ERROR: "Only digits allowed",
};

export const DATE_FORMAT = {
  DD_MM_YYYY: "DD-MM-YYYY",
};

export const ATTACHMENT_MODAL = {
  IMAGES_TYPES: "image/png, image/jpg, image/jpeg",
  DOCUMENT_TYPE:
    "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf",
};
export const TABLE_CONSTANTS = {
  CHECKBOX: "checkbox",
  CREATEDTIME: "createdTime",
  NAME: "name",
  DESIGNATION: "designation",
  TIME: "time",
  ID: "id",
};
export const SORT_TYPE = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

export const TOKEN = "token";
export const REFRESH_TOKEN = "refreshToken";
export const USER_TOKEN = "userToken";
export const REFRESH_KEY = "refreshKey";
export const EMPLOYEEID="employeeId"

export const REGEX = {
  ONLY_ALPHABETS: /^[A-Za-z]+$/,
  ONLY_NUMBERS: /^\d+$/,
};
export const TRANSITION_TIMEOUT = 300;
export const INPUT_PLACEHOLDER = "Enter text here";
export const TIME_FORMAT = {
  HOUR_MINUTE: "hh:mm A",
  DATE_MONTH: "DD/MM/YYYY",
};
export const HEADER = "HEADER";
export const ENTER_KEYCODE = 13;
export const TIMESTAMP = "timestamp";

export const API_ERROR_MESSAGES = {
  ACCESS_TOKEN_EXPIRED: "ACCESS TOKEN EXPIRED",
  ACCESS_TOKEN_INVALID: "ACCESS TOKEN INVALID",
  REFRESH_TOKEN_EXPIRED: "REFRESH TOKEN EXPIRED",
  LOGIN_ERROR:
    "Multiple Device Login Detected. Please log out from the previous device before logging in again. For assistance, contact support.",
  ACCESS_DENIED_ERROR:
    "The email you selected does not appear to be registered. Please contact Candidate connect support.",
};

export const DEBOUNCE_TIME = {
  SEARCH_DEBOUNCE: 1000,
  TOAST_DEBOUNCE: 2000,
  DROPDOWN_SEARCH_DEBOUNCE: 300,
};
