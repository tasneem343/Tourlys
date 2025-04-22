import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject } from '@angular/core';

export const loadingSpinnerInterceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const spinnerService = inject(NgxSpinnerService);


  spinnerService.show();

  return next(req).pipe(
    tap({
      next: () => console.log(`HTTP request completed for ${req.url}`),
      error: (error) => console.error(`HTTP request failed for ${req.url}`, error)
    }),
    finalize(() => {
      spinnerService.hide();
    })
  );
};