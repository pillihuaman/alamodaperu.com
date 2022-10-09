import { Observable, throwError } from 'rxjs';
import { AuthenticationRepository } from 'src/app/@domain/repository/repository/authentication.repository';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationRepository) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
        }
        if (err.statusText === 'Unknown Error') {
          const error = {
            message: '',
          };
          error.message = 'El servidor no se encuentra disponible';
          return throwError(error);
        } else {
          console.log(err);
          return throwError(err);
        }
      })
    );
  }
}
