import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable()
export class ErrResponseInterceptor implements HttpInterceptor {
  failedReq: any = [];
  constructor(private localStorage: LocalStorage, public toasts: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('interceptor working');
    return next.handle(request).pipe(
      tap(() => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
         // console.log(`Error: ${err.status} is detected.`);
          this.toasts.error('no connection bruv');
          const req = request.clone();
          if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
            this.failedReq.push(req);
            this.localStorage.setItem('failingReq', this.failedReq).subscribe(() => {
              console.log('successfully stored', this.localStorage.getItem('failingReq'));
            });
            this.toasts.info('Network connection is not available. This operation will be retried when network is available.');
            return new Observable(() => { console.log(req); });
          }
        }
      }));
  }
}
