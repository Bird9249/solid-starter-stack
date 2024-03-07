import {
  JSXElement,
  ParentComponent,
  ParentProps,
  Show,
  createContext,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";

type ConfirmContextState = {
  message?: string;
  isShow: boolean;
  icon?: () => JSXElement;
  isLoading: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
};

type ConfirmContextValue = [
  Omit<ConfirmContextState, "isLoading" | "isShow">,
  {
    showConfirm: (
      state: Omit<ConfirmContextState, "isLoading" | "isShow">
    ) => void;
  }
];

const ConfirmContext = createContext<ConfirmContextValue>([
  {},
  { showConfirm: () => {} },
]);

export const ConfirmProvider: ParentComponent = (props: ParentProps) => {
  const [state, setState] = createStore<ConfirmContextState>({
    isShow: false,
    isLoading: false,
  });

  return (
    <ConfirmContext.Provider
      value={[
        { icon: state.icon, message: state.message },
        {
          showConfirm: ({ icon, message, onCancel, onConfirm }) => {
            setState({ icon, message, isShow: true, onCancel, onConfirm });
          },
        },
      ]}
    >
      {props.children}
      <Modal
        open={state.isShow}
        onOpenChange={({ open }) => setState("isShow", open)}
        close
      >
        <div class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <Show when={state.icon}>{(icon) => icon()()}</Show>

          <p class="mb-4 text-gray-500 dark:text-gray-300">{state.message}</p>

          <div class="flex justify-center items-center space-x-4">
            <Button
              color="secondary"
              onClick={() => {
                if (state.onCancel) state.onCancel();
                setState("isShow", false);
              }}
            >
              ບໍ່, ຍົກເລີກ
            </Button>
            <Button
              color="danger"
              isLoading={state.isLoading}
              onClick={async () => {
                if (state.onConfirm) {
                  setState("isLoading", true);
                  try {
                    await state.onConfirm();
                  } finally {
                    setState("isLoading", false);
                    setState("isShow", false);
                  }
                }
              }}
            >
              ແມ່ນແລ້ວ, ຂ້ອຍແນ່ໃຈ
            </Button>
          </div>
        </div>
      </Modal>
    </ConfirmContext.Provider>
  );
};

export function useConfirm() {
  return useContext(ConfirmContext);
}
