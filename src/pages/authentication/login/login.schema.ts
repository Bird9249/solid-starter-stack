import { Input, maxLength, minLength, object, regex, string } from "valibot";

export const LoginSchema = object({
  // email: string([
  //   minLength(1, "Please enter your email."),
  //   email("The email is badly formatted."),
  //   maxLength(30, "Your email is too long."),
  // ]),
  username: string([
    minLength(1, "Please enter your email."),
    maxLength(30, "Your email is too long."),
  ]),
  password: string([
    minLength(6, "Your password is too short."),
    maxLength(30, "Your password is too long."),
    regex(/[a-z]/, "Your password must contain a lowercase letter."),
    regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    regex(/[0-9]/, "Your password must contain a number."),
  ]),
});

export type LoginForm = Input<typeof LoginSchema>;
