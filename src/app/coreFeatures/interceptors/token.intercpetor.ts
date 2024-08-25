import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
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
      console.log('AMAZXON asdasd asd as asdasda');
      return next.handle(req);
    }

    if (authorized && JWT_TOKEN) {
      console.log('AUTHE REQ ASDADS');
      const tokenizedRequest = req.clone({
        setHeaders: {
          authorization: `Bearer ${JWT_TOKEN}`,
        },
      });

      return next.handle(tokenizedRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // this.authService.logOut();.
            console.log(err.message);
          }
          console.log(err.message);
          return throwError(err);
        })
      );
    }
    return next.handle(req);
    // return this.authStoreService.isAuthorized.pipe(
    //   switchMap((authorized) => {
    //     if (authorized) {
    //       const JWT_TOKEN = this.sessionStorageService.getToken();
    //       if (JWT_TOKEN) {
    //         const tokenizedRequest = req.clone({
    //           setHeaders: {
    //             Authorization: `Bearer ${JWT_TOKEN}`,
    //           },
    //         });

    //         // Proceed with tokenized request
    //         return next.handle(tokenizedRequest).pipe(
    //           catchError((err) => {
    //             if (err.status === 401) {
    //               // Handle unauthorized error
    //               console.log(err.message);
    //             }
    //             return of(err);
    //           })
    //         );
    //       }
    //     }

    //     // If not authorized or JWT_TOKEN is missing, proceed with original request
    //     return next.handle(req);
    //   })
    // );
  }
}
