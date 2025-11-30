import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // No modificar si es login
  if (req.url.includes('/authenticate')) {
    return next(req);
  }

  const cloned = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(cloned);
};
