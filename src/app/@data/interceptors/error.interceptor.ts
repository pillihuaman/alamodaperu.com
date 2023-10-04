import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import { NbComponentStatus } from '@nebular/theme';
import { CustomHttpErrorResponse } from '../model/general/CustomHttpErrorResponse';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: ModalService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        let errc=err as CustomHttpErrorResponse;
        if (err instanceof HttpErrorResponse) {
          const httpError: HttpErrorResponse = err;

          // Handle specific status codes here
          if (httpError.status === 401) {
            // Handle Unauthorized (e.g., redirect to login)
          } else if (httpError.status === 500) {
            // Handle Internal Server Error
            const nbComponentStatus: NbComponentStatus = 'danger';
            this.modalService.showToast(nbComponentStatus, err.error.errors[0]);
          }
          else if (httpError.status === 422) {
            // Handle Internal Server Error
            const nbComponentStatus: NbComponentStatus = 'warning';
            this.modalService.showToast(nbComponentStatus, err.error.errors[0]);
          } else if (httpError.status === 404) {
            // Handle Not Found
            const nbComponentStatus: NbComponentStatus = 'danger';
            this.modalService.showToast(nbComponentStatus, 'Resource Not Found');
          } else {
            // Handle other HTTP errors
            const nbComponentStatus: NbComponentStatus = 'danger';
            this.modalService.showToast(nbComponentStatus, 'An unexpected error occurred');
          }

          // You can also re-throw the error to propagate it further
          return throwError(err);
        } else {
          // Handle non-HTTP errors (e.g., network errors)
          const nbComponentStatus: NbComponentStatus = 'danger';
          this.modalService.showToast(nbComponentStatus, 'Network Error');
          return throwError('Network Error');
        }
      })
    );
  }
}
