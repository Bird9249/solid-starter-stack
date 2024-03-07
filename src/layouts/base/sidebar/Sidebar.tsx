import { A } from "@solidjs/router";
import { For, JSXElement, Match, Switch, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { PermissionGroup } from "../../../common/enum/permission.enum";
import checkPermissionGroup from "../../../common/utils/check-permission-group";
import HomeIcon from "../../../components/icons/HomeIcon";
import UserIcon from "../../../components/icons/UserIcon";
import { useAuth } from "../../../contexts/authentication/AuthContext";
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
  const auth = useAuth();

  const [sidebarMenus, setSidebarMenus] = createStore<{
    menus: SidebarMenuType[];
  }>({
    menus: [
      {
        icon: <HomeIcon />,
        href: "/dashboard",
        label: "ໜ້າຫຼັກ",
      },
    ],
  });

  createEffect(() => {
    const preparedMenus: SidebarMenuType[] = [];

    if (checkPermissionGroup(PermissionGroup.User, auth.permissions)) {
      preparedMenus.push({
        icon: <UserIcon />,
        href: "/users",
        label: "ຈັດການຜູ້ໃຊ້",
        subMenus: {
          menus: [
            { href: "/users/list", label: "ຜູ້ໃຊ້" },
            { href: "/users/roles", label: "ບົດບາດ" },
            { href: "/users/permissions", label: "ການອະນຸຍາດ" },
          ],
          isOpen: false,
        },
      });
    }

    setSidebarMenus("menus", (prev) => [...prev, ...preparedMenus]);
  });

  return (
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
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
