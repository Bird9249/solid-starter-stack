import { Menu } from "@ark-ui/solid";
import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import Avatar from "../../../components/avatar/Avatar";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import LoadingIcon from "../../../components/icons/LoadingIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";

export default function () {
  const [auth, setAuth] = useAuth();
  const confirm = useConfirm();
  const navigator = useNavigate();

  function logout() {
    confirm?.showConfirm(
      "Are you sure you want to logout?",
      {
        async onConfirm() {
          localStorage.removeItem("token");

          if (setAuth) setAuth("data", undefined);

          navigator("/login");
        },
      },
      <ArrowIcon
        iconDirection="right-bracket"
        class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
      />
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition">
        <span class="sr-only">Open user menu</span>
        <Avatar
          src={auth.data?.image}
          alt="User Profile"
          size="sm"
          isLoading={auth.loading}
        />
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content class="z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
          <Show
            when={!auth.loading}
            fallback={
              <div class="w-full py-3 px-4 flex flex-col justify-center items-center">
                <LoadingIcon class="animate-spin w-8 h-8 mb-2" />
                <p>loading...</p>
              </div>
            }
          >
            <div class="py-3 px-4">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                {auth.data?.username}
              </span>
              <span class="block text-sm text-gray-900 truncate dark:text-white">
                {auth.data?.email}
              </span>
            </div>

            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >
                  My profile
                </a>
              </li>
            </ul>

            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={logout}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </Show>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
