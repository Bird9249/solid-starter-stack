import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { For } from "solid-js";
import Button from "../../../components/button/Button";
import Checkbox from "../../../components/forms/check-box/Checkbox";
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import { RoleForm, RoleSchema } from "./schemas/role.schema";

export default () => {
  const [userForm, { Form, Field }] = createForm<RoleForm>({
    validate: valiForm(RoleSchema),
    initialValues: {
      permissions: [],
    },
  });

  const handleSubmit: SubmitHandler<RoleForm> = async (values) => {
    console.log(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ເພີ່ມບົດບາດໃຫມ່
      </h2>
      <div class="grid gap-4 mb-4">
        <Field name="name">
          {(field, props) => (
            <InputText
              required
              label="ຊື່"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ຊື່"
            />
          )}
        </Field>

        <Field name="description">
          {(field, props) => (
            <Textarea
              required
              label="ຄຳອະທິບາຍ"
              {...props}
              value={field.value}
              error={field.error}
              placeholder="ຂຽນຄໍາອະທິບາຍ..."
            />
          )}
        </Field>

        <div>
          <label class={`mb-2 font-semibold text-gray-900 dark:text-white`}>
            ການອະນຸຍາດ
          </label>
          <div class="flex flex-wrap gap-3">
            <Field name="permissions" type="string[]">
              {(field, props) => (
                <For
                  each={[
                    {
                      group: "user",
                      items: [
                        { label: "read user", value: "read:user" },
                        { label: "write user", value: "write:user" },
                        { label: "remove user", value: "remove:user" },
                      ],
                    },
                    {
                      group: "test",
                      items: [
                        { label: "read test", value: "read:test" },
                        { label: "write test", value: "write:test" },
                        { label: "remove test", value: "remove:test" },
                      ],
                    },
                  ]}
                >
                  {(list) => (
                    <div class="w-44">
                      <h3 class="block mb-2 text-sm font-medium dark:text-white ">
                        {list.group}
                      </h3>
                      <ul class="w-44 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <For each={list.items}>
                          {(item) => (
                            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <Checkbox
                                label={item.label}
                                {...props}
                                value={item.value}
                                checked={field.value?.includes(item.value)}
                              />
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  )}
                </For>
              )}
            </Field>
          </div>
        </div>
      </div>

      <Button type="submit" isLoading={userForm.submitting}>
        ເພີ່ມບົດບາດ
      </Button>
    </Form>
  );
};
