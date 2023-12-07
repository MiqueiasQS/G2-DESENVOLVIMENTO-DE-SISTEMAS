import { auth } from '../services/firebase';

export const login = (name, email) => {
  return auth.signInWithNameAndEmail(name, email);
};