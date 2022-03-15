import { ironSession } from 'iron-session/express';

const isProduction = process.env.NODE_ENV === 'production';

export const session = ironSession({
  cookieName: 'session-app',
  password: 'WuiH12k4teOueGzMflhzvghJHwbw2InJ',
  cookieOptions: {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  },
});
