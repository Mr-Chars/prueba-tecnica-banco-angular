import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({ headers: req.headers.set('authorId', '75164573') });

  // send the newly created request
  return next(authReq);
};
