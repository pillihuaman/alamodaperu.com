import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Const {
  public static USERNAME_SEGURIDAD: string;
  public static PASSWORD_SEGURIDAD: string;
  public static ACCEPT_COOKIE: string;
  public static API_SEGURIDAD: string;
  static API_PROCESS: any;
  static URL_TYPE_ACCESS: any;
  constructor(private http: HttpClient) {
    Const.ACCEPT_COOKIE = 'ACCEPT_COOKIE';
  }

  public loadCommonConfig() {
    return this.http
      .get('./assets/config/common.config.json')
      .toPromise()
      .then((config: any) => {
        Const.API_SEGURIDAD = config.public_base_url_seguridad;
        Const.API_PROCESS = config.public_base_url_process;
        Const.URL_TYPE_ACCESS = config.url_type_access;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  public loadEntidadConfig() {
    return this.http
      .get('./assets/config/pillihuaman-web.config.json')
      .toPromise()
      .then((config: any) => {
        Const.USERNAME_SEGURIDAD = config.client_id;
        Const.PASSWORD_SEGURIDAD = config.client_secret;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}

export const CREDENCIALES = btoa(
  Const.USERNAME_SEGURIDAD + ':' + Const.PASSWORD_SEGURIDAD
);

// Variable para la cabecera de una solicitud de token
export const HTTP_HEADERS_TOKEN = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: 'Basic ' + CREDENCIALES,
});
