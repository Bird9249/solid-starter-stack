import {
  SubmitHandler,
  createForm,
  setValues,
  valiForm,
} from "@modular-forms/solid";
import { useParams } from "@solidjs/router";
import {
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { Transition } from "solid-transition-group";
import Button from "../../../components/button/Button";
import Checkbox from "../../../components/forms/check-box/Checkbox";
import InputText from "../../../components/forms/input-text/InputText";
import Textarea from "../../../components/forms/textarea/Textarea";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getRoleDetailApi from "./api/get-role-detail.api";
import { RoleForm, RoleSchema } from "./schemas/role.schema";

export default () => {
  const param = useParams();
  const confirm = useConfirm();

  const [id] = createSignal<string>(param.id);
  const [role] = createResource(id, getRoleDetailApi);

  const [roleForm, { Form, Field }] = createForm<RoleForm>({
    validate: valiForm(RoleSchema),
    initialValues: {
      permissions: [],
    },
  });

  const handleSubmit: SubmitHandler<RoleForm> = async (values) => {
    console.log(values);
  };

  createEffect(() => {
    if (role.state === "ready") {
      setValues(roleForm, {
        name: role().data.name,
        description: role().data.description,
        permissions: role().data.permissions.map((val) => val.name),
      });
    }
  });

  return (
    <Form onSubmit={handleSubmit} class="relative">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ອັບເດດບົດບາດ
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
              placeholder="ຂຽນຄຳອະທິບາຍ..."
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

      <div class="flex items-center">
        <Button type="submit" isLoading={roleForm.submitting} class="mr-3">
          ອັບເດດບົດບາດ
        </Button>
        <Button
          color="danger"
          outlined
          type="button"
          isLoading={roleForm.submitting}
          prefixIcon={<TrashIcon />}
          onClick={() => {
            confirm?.showConfirm(
              "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
              {
                onConfirm: async () => {},
              },
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            );
          }}
        >
          ລຶບ
        </Button>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={role.loading}>
          <div
            class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
          >
            <div>
              <LoadingIcon class="animate-spin w-8 h-8" />
            </div>
          </div>
        </Show>
      </Transition>
    </Form>
  );
};
