import {
  Input,
  array,
  email,
  maxLength,
  maxSize,
  mimeType,
  minLength,
  object,
  regex,
  special,
  string,
} from "valibot";

const isFile = (input: unknown) => input instanceof File;

export const UserSchema = object({
  image: special<File>(isFile, "Image should not empty", [
    mimeType(
      ["image/jpeg", "image/png", "image/webp"],
      "Please select a JPEG or PNG or Webp file."
    ),
    maxSize(1024 * 1024 * 10, "Please select a file smaller than 10 MB."),
  ]),
  firstName: string([
    minLength(1, "Please enter your first name."),
    maxLength(30, "Your email is too long."),
  ]),
  lastName: string([
    minLength(1, "Please enter your last name."),
    maxLength(30, "Your email is too long."),
  ]),
  email: string([
    minLength(1, "Please enter your email."),
    email("The email is badly formatted."),
    maxLength(30, "Your email is too long."),
  ]),
  emailStatus: array(string()),
  roles: array(string()),
  password: string([
    minLength(8, "Your password is too short."),
    maxLength(30, "Your password is too long."),
    regex(/[a-z]/, "Your password must contain a lowercase letter."),
    regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    regex(/[0-9]/, "Your password must contain a number."),
  ]),
  confirmPassword: string([
    minLength(8, "Your password is too short."),
    maxLength(30, "Your password is too long."),
  ]),
});

export type UserForm = Input<typeof UserSchema>;
