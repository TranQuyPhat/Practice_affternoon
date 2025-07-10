import { createContext } from 'react';

import type { User } from './type/task';
const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: User | null) => { },
});

export default AuthContext;