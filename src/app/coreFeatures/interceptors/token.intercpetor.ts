import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionStorageService } from '../services/session-storage/session-storage.service';
import { AuthStoreService } from '../services/auth/auth-store.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorageService: SessionStorageService,
    private authStoreService: AuthStoreService
  ) {}

  intercept(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>,
    next: HttpHandler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Observable<HttpEvent<any>> {
    const authorized = this.authStoreService.isAuthorized;
    const JWT_TOKEN = this.sessionStorageService.getToken();

    if (req.url.includes('s3') || req.url.includes('.s3.amazonaws.com')) {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
    }

    if (authorized && JWT_TOKEN) {
      const tokenizedRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${JWT_TOKEN}`,
        },
      });

      return next.handle(tokenizedRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
