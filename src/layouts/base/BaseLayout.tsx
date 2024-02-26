import { RouteSectionProps } from "@solidjs/router";
import { initDrawers } from "flowbite";
import { onMount } from "solid-js";
import { AuthProvider } from "../../contexts/authentication/AuthContext";
import { AxiosProvider } from "../../contexts/axios/AxiosContext";
import Topbar from "./header/Topbar";
import Sidebar from "./sidebar/Sidebar";

export default (props: RouteSectionProps) => {
  onMount(() => {
    initDrawers();
  });

  return (
    <AxiosProvider>
      <AuthProvider>
        <div class="antialiased bg-gray-50 dark:bg-gray-900">
          <Topbar />
          <Sidebar />
          <main class="p-4 md:ml-64 h-auto min-h-screen pt-20">
            <div class="mx-auto max-w-7xl">{props.children}</div>
          </main>
        </div>
      </AuthProvider>
    </AxiosProvider>
  );
};
