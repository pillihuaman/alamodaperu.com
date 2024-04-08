import { Control } from 'src/app/@data/model/general/control';

export interface User {
  access_token?: string;
  id?: string;
  name?: string;
  userName?: string;
  email?: string;
  roles?: Array<string>;
  jwToken?: string;
  refresh_token?: string;
  refreshTokenExpiration?: Date;
  id_user?: string;
  control?: Control[];
}
