import { FirebaseError } from "firebase/app";

const messages: Record<string, string> = {
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/user-not-found": "We couldn't find an account with that email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/user-disabled": "This account has been disabled. Contact an administrator.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

export function authErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return messages[error.code] ?? "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}
