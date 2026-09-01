export interface AddBannerType {
  visible?: boolean;
  handlerVisibleAdd?: () => any | undefined | number;
}
export interface EditBannerType {
  dataEdit?: any;
  handleData?: any;
}

export interface LoginFormValuesType {
  FileName: string;
  FileURL: string;
  Id: string;
  IsActive: string;
  Key: string;
  Title: string;
  Link: string;
  Image: any;
}


export interface BannerType {
  Id: number;
  Key: string;
  Title: string;
  Link: string;
  IsActive: boolean;
  FileName: string;
  FileURL: string;
}

export interface BannerResponseType{
  StatusCode: number | null;
  Message: string | null;
  Body: BannerType[];
}

export interface TransformedBannerType {
  id: number;
  title: string;
  link:  JSX.Element;
  fileName: string;
  fileURL: JSX.Element;
 active: JSX.Element;
}