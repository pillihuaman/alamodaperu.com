import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthenticationRepository } from 'src/app/@domain/repository/repository/authentication.repository';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { NbComponentStatus } from '@nebular/theme';
@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationRepository, private modalRepository: ModalRepository) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (request.headers.get('Authorization') == null) {
      const currentUser = this.authenticationService.getCurrentUserValue;
      if (currentUser && currentUser.access_token) {
        headersConfig.Authorization = 'Bearer ' + `${currentUser.access_token}`;
      }
      request = request.clone({ setHeaders: headersConfig });
    }
    return next.handle(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const nbComponentStatus: NbComponentStatus = 'danger';
        this.modalRepository.showToast(nbComponentStatus, error.message + "Basic");
        return throwError(error);
      })
    );


  }
}
