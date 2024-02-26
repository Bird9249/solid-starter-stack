import { Input, array, maxLength, minLength, object, string } from "valibot";

export const RoleSchema = object({
  name: string([
    minLength(1, "Please enter your name."),
    maxLength(30, "Your name is too long."),
  ]),
  description: string([
    minLength(1, "Please enter your description."),
    maxLength(1000, "Your description is too long."),
  ]),
  permissions: array(string()),
});

export type RoleForm = Input<typeof RoleSchema>;
