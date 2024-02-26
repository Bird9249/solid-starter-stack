import { A } from "@solidjs/router";
import { For, JSXElement, Match, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import SearchIcon from "../../../components/icons/SearchIcon";
import UserIcon from "../../../components/icons/UserIcon";
import SidebarMenu from "./SidebarMenu";

interface SidebarMenuType {
  icon: JSXElement;
  href: string;
  label: string;
  subMenus?: SidebarSubMenuType;
}

interface SidebarSubMenuType {
  menus: { href: string; label: string }[];
  isOpen: boolean;
}

export default function () {
  const [sidebarMenus, setSidebarMenus] = createStore<{
    menus: SidebarMenuType[];
  }>({
    menus: [
      {
        icon: <UserIcon iconDirection="users" />,
        href: "/users",
        label: "Users",
        subMenus: {
          menus: [
            { href: "/users/list", label: "User" },
            { href: "/users/roles", label: "Role" },
            { href: "/users/permissions", label: "Permission" },
          ],
          isOpen: false,
        },
      },
    ],
  });

  return (
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <form action="#" class="md:hidden mb-2">
          <label for="sidebar-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <SearchIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              id="sidebar-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition"
              placeholder="ຄົ້ນຫາ"
            />
          </div>
        </form>

        <ul class="space-y-2">
          <For each={sidebarMenus.menus}>
            {({ subMenus, href, icon, label }, idx) => (
              <Switch>
                <Match when={!subMenus}>
                  <li>
                    <A
                      href={href}
                      class="flex items-center p-2 text-base font-medium rounded-lg"
                      activeClass="sidebar-active"
                      inactiveClass="sidebar-inactive"
                    >
                      <span class="w-6 h-6 transition">{icon}</span>
                      <span class="ml-3">{label}</span>
                    </A>
                  </li>
                </Match>

                <Match when={subMenus}>
                  <SidebarMenu
                    path={href}
                    menus={(subMenus as SidebarSubMenuType).menus}
                    isOpen={(subMenus as SidebarSubMenuType).isOpen}
                    icon={icon}
                    label={label}
                    onChange={() => {
                      setSidebarMenus(
                        "menus",
                        idx(),
                        "subMenus",
                        (prevList) => ({
                          ...prevList,
                          isOpen: !prevList?.isOpen,
                        })
                      );

                      const sidebarMenuIdx = sidebarMenus.menus.findIndex(
                        (v, index) => index !== idx() && v.subMenus?.isOpen
                      );

                      if (sidebarMenuIdx > 0) {
                        setSidebarMenus(
                          "menus",
                          sidebarMenuIdx,
                          "subMenus",
                          (prevList) => ({
                            ...prevList,
                            isOpen: !prevList?.isOpen,
                          })
                        );
                      }
                    }}
                  />
                </Match>
              </Switch>
            )}
          </For>
        </ul>
      </div>
    </aside>
  );
}
