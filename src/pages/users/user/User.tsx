import { useNavigate } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";
import Avatar from "../../../components/avatar/Avatar";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import InputText from "../../../components/forms/input-text/InputText";
import PlusIcon from "../../../components/icons/PlusIcon";
import SearchIcon from "../../../components/icons/SearchIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import Table from "../../../components/table/Table";
import { useConfirm } from "../../../contexts/confirm/ConfirmContext";
import getUserApi from "./api/get-user.api";
import { UserResponse, UserTableState } from "./api/user.interface";

export default () => {
  let typingTimeout: NodeJS.Timeout;

  const navigate = useNavigate();
  const confirm = useConfirm();

  const [state, setState] = createSignal<UserTableState>({
    offset: 0,
    limit: 10,
    search: "",
  });

  const [users] = createResource(state, getUserApi);

  const actionMenus = (id: string | number) => [
    [
      {
        onClick() {
          navigate(`/users/edit/${id}`);
        },
        label: "ແກ້ໄຂ",
      },
      {
        onClick() {
          navigate(`/users/detail/${id}`);
        },
        label: "ລາຍລະອຽດ",
      },
    ],
    [
      {
        onClick() {
          confirm?.showConfirm(
            "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
            {
              onConfirm: async () => {},
            },
            <TrashIcon class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
          );
        },
        label: "ລຶບ",
      },
    ],
  ];

  return (
    <Table
      header={
        <>
          <div class="flex flex-col items-start justify-between border-b dark:border-gray-600 p-4 sm:flex-row sm:items-center">
            <h2 class="text-lg font-semibold mb-2 sm:mb-0 dark:text-white">
              ຜູ້ໃຊ້ທັງໝົດ
            </h2>
            <Button
              class="w-full sm:w-fit"
              prefixIcon={<PlusIcon class="h-3.5 w-3.5" />}
              onClick={() => {
                navigate("/users/create");
              }}
            >
              ເພີ່ມຜູ້ໃຊ້
            </Button>
          </div>
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-1/2">
              <InputText
                onInput={(e) => {
                  clearTimeout(typingTimeout);

                  typingTimeout = setTimeout(function () {
                    setState((prev) => ({ ...prev, search: e.target.value }));
                  }, 500);
                }}
                placeholder="ຄົ້ນຫາ"
                prefixIcon={
                  <SearchIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                }
              />
            </div>
          </div>
        </>
      }
      value={users}
      responseField="users"
      onChange={({ paginate }) => {
        setState((prev) => ({
          ...prev,
          limit: paginate.limit,
          offset: paginate.offset,
        }));
      }}
    >
      {[
        {
          header: "ຜູ້ໃຊ້",
          body: ({ image, firstName, lastName }: UserResponse) => (
            <div class="flex items-center">
              <Avatar src={image} alt="image" size="sm" class="mr-3" />
              <span>
                {firstName} {lastName}
              </span>
            </div>
          ),
        },
        {
          header: "ບົດບາດ",
          body: () => (
            <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              admin
            </span>
          ),
        },
        {
          header: "ສະຖານະ",
          body: () => (
            <div class="flex items-center">
              <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              Online
            </div>
          ),
        },
        {
          header: "ເຂົ້າລະບົບລ່າສຸດ",
          body: () => new Date().toDateString(),
        },
        {
          body: ({ id }: UserResponse) => (
            <Dropdown
              triggerEl={
                <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-1 inline-flex items-center justify-center">
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              }
              menus={actionMenus(id)}
            />
          ),
        },
      ]}
    </Table>
  );
};
