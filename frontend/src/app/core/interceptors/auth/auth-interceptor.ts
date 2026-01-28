import { HttpInterceptorFn } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // List of URLs that should NOT have a token
  const anonymousUrls = ['/api/auth/login', '/api/auth/register'];

  // Check if the current request URL is in the anonymous list
  const isAnonymous = anonymousUrls.some(url => req.url.includes(url));

  if (token && !isAnonymous) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
 