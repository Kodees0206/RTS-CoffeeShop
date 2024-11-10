
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "Signup successful!";
  } catch (error) {
    throw error.message;
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "Login successful!";
  } catch (error) {
    throw error.message;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return "Logout successful!";
  } catch (error) {
    throw error.message;
  }
};