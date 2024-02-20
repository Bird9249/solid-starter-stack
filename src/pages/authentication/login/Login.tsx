import { FormError, createForm, valiForm } from "@modular-forms/solid";
import { useLocation, useNavigate } from "@solidjs/router";
import { AxiosError } from "axios";
import { Show } from "solid-js";
import Button from "../../../components/button/Button";
import InputText from "../../../components/forms/input-text/InputText";
import PasswordInput from "../../../components/forms/password-input/PasswordInput";
import InfoCircleIcon from "../../../components/icons/InfoCircleIcon";
import { useMessage } from "../../../contexts/message/MessageContext";
import loginApi from "./login.api";
import { LoginForm, LoginSchema } from "./login.schema";

export default () => {
  const [, actions] = useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
    initialValues: {
      username: "kminchelle",
      password: "0lelplR",
    },
  });

  async function handlerSubmit(values: LoginForm) {
    try {
      await loginApi(values);
      actions.showMessage({ level: "success", message: "Login Successfully" });

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new FormError<LoginForm>(error.message);
      } else {
      }
    }
  }

  return (
    <>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>

      <Show when={loginForm.response.message}>
        <div
          class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <InfoCircleIcon class="flex-shrink-0 w-6 h-6" />
          <span class="sr-only">Info</span>
          <div class="ms-3 text-sm font-medium">
            {loginForm.response.message}
          </div>
        </div>
      </Show>

      <Form class="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
        <Field name="username">
          {(field, props) => (
            <InputText
              {...props}
              label="Your Username"
              required
              value={field.value}
              error={field.error}
              placeholder="username"
            />
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <PasswordInput
              {...props}
              label="Password"
              required
              value={field.value}
              error={field.error}
              placeholder="••••••••"
            />
          )}
        </Field>
        <Button type="submit" class="w-full" isLoading={loginForm.submitting}>
          Sign in
        </Button>
      </Form>
    </>
  );
};