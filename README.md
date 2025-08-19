# Node Auth OTP (Express + MongoDB)

Features:
- Signup with name, email, phone, password (bcrypt)
- Login with email + password
- JWT access tokens + refresh tokens (HTTP-only cookie)
- Forgot/reset password via email OTP (6-digit, 10-min expiry, 5 attempts)
- Welcome email on signup
- Role-based authorization middleware
- Input validation with Joi
- Centralized error handling, Helmet, CORS, rate limiting
- Mongoose models with proper indexes

## Quick start

```bash
pnpm i   # or npm i / yarn
cp .env.example .env
# Fill SMTP creds, JWT secrets, Mongo URI
npm run dev
```

### API

- `POST /api/auth/signup` `{ name, email, phone, password }`
- `POST /api/auth/login` `{ email, password }`
- `POST /api/auth/logout`
- `POST /api/auth/refresh` `{ email }` (uses `refresh_token` cookie)
- `POST /api/auth/password/forgot` `{ email }`
- `POST /api/auth/password/reset` `{ email, otp, newPassword }`
- `GET /api/auth/me` (Authorization: Bearer <access>) 
- `GET /api/auth/admin-only` (requires admin role)

Access token is returned in JSON. Refresh token is set as an HTTP-only cookie.

> Note: For a production-grade refresh flow, store a refresh token ID and user ID in a signed cookie or JWT and keep a hashed version in DB. This sample keeps it simple.