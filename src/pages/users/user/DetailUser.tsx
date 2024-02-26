import { useNavigate, useParams } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import Avatar from "../../../components/avatar/Avatar";
import Button from "../../../components/button/Button";
import EditIcon from "../../../components/icons/EditIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import { fadeIn, fadeOut } from "../../../utils/transition-animation";
import getUserDetailApi from "./api/get-user-detail.api";

export default () => {
  const param = useParams();
  const navigator = useNavigate();
  const confirm = useConfirm();

  const [id] = createSignal<string>(param.id);

  const [user] = createResource(id, getUserDetailApi);

  return (
    <div class="relative">
      <div class="px-4 mb-4 grid gap-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
        <div class="sm:col-span-2">
          <div class="flex items-center">
            <Avatar
              alt={`${user()?.data.firstName} ${user()?.data.lastName}`}
              size="xl"
              src={user()?.data.image}
              isLoading={user.loading}
              class="mb-4 sm:mb-5"
            />
            <div class="ml-4">
              <h2 class="text-gray-900 leading-4 font-bold text-xl flex items-center mb-2 sm:text-2xl">
                {user()
                  ? `${user()?.data.firstName} ${user()?.data.lastName}`
                  : "... ..."}
              </h2>
              <span class="bg-primary-100 text-primary-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                Admin
              </span>
            </div>
          </div>
        </div>

        <dl>
          <dt class="text-gray-900 leading-4 font-normal mb-2">
            Email Address
          </dt>
          <dd class="text-gray-500 font-light mb-4 sm:mb-5">
            {user() ? user()?.data.email : "..."}
          </dd>
          <dt class="text-gray-900 leading-4 font-normal mb-2">Email Status</dt>
          <dd class="text-gray-500 font-light mb-4 sm:mb-5">Verified</dd>
        </dl>
      </div>

      <div class="p-4 flex items-center">
        <Button
          color="primary"
          prefixIcon={<EditIcon />}
          onClick={() => {
            navigator(`/users/edit/${param.id}`);
          }}
        >
          Edit
        </Button>
        <Button
          color="danger"
          prefixIcon={<TrashIcon />}
          onClick={() => {
            confirm?.showConfirm(
              "Are you sure you want to delete this item?",
              {
                onConfirm: async () => {},
              },
              <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
            );
          }}
        >
          Delete
        </Button>
      </div>

      <Transition onEnter={fadeIn} onExit={fadeOut}>
        <Show when={user.loading}>
          <div
            class={`absolute z-10 top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center`}
          >
            <div>
              <LoadingIcon class="animate-spin w-8 h-8" />
            </div>
          </div>
        </Show>
      </Transition>
    </div>
  );
};
