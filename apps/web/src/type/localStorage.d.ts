export interface LocalStorageInterface {
  type:
    | 'getLocalStorage'
    | 'setLocalStorage'
    | 'removeLocalStorage'
    | 'clearLocalStorage';
  key?: string;
  item?: string;
}
