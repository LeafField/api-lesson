// import { User } from '@prisma/client';

import { User } from '@prisma/client';

// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: Omit<User, 'hashedPassword'>;
//   }
// }

declare module 'express-serve-static-core' {
  interface Request {
    user?: Omit<User, 'hashedPassword'>;
  }
}
