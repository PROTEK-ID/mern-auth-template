## routes

- GET `/api/auth`
  get users, need to verify token to access.
- POST `/api/auth`
  create new user a.k.a register new user.
- POST `/api/auth/signin`
  login for user.
- GET `/api/auth/token`
  get refresh token from cookie.
- DELETE `/api/auth/token`
  user signout and clear 'refreshToken' from cookie.

for all the body and data that is needed for each route, please checkout the [controller file](./src/routes/auth/controller.ts).
