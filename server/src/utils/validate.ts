import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export function validateEmail(email?: string | null) {
  if (!email) return false;
  return isEmail(email);
}

export function validatePassword(password?: string | null) {
  if (!password) return false;
  return isStrongPassword(password, {
    minUppercase: 0,
    minSymbols: 0,
  });
}

export function validateEmailAndPassword(
  email?: string | null,
  password?: string | null
) {
  const result = {
    emailValid: false,
    passwordValid: false,
  };
  if (validateEmail(email)) result.emailValid = true;
  if (validatePassword(password)) result.passwordValid = true;
  return result;
}
