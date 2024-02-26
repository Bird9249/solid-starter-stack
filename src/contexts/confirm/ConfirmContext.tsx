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
  icon?: JSXElement;
  actions: {
    onConfirm: () => void | Promise<void>;
    onCancel?: () => void;
  };
  isLoading: boolean;
};

type ConfirmContextValue = {
  showConfirm: (
    message: string,
    actions: {
      onConfirm: () => void | Promise<void>;
      onCancel?: () => void;
    },
    icon?: JSXElement
  ) => void;
};

const ConfirmContext = createContext<ConfirmContextValue>();

export const ConfirmProvider: ParentComponent = (props: ParentProps) => {
  const [state, setState] = createStore<ConfirmContextState>({
    isShow: false,
    actions: {
      onConfirm: () => undefined,
    },
    isLoading: false,
  });

  const showConfirm = (
    message: string,
    actions: {
      onConfirm: () => void;
      onCancel?: () => void;
    },
    icon?: JSXElement
  ) => {
    setState("message", message);
    setState("isShow", true);
    setState("icon", icon);
    setState("actions", actions);
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {props.children}
      <Modal
        open={state.isShow}
        onOpenChange={({ open }) => setState("isShow", open)}
        close
      >
        <div class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <Show when={state.icon}>{state.icon}</Show>

          <p class="mb-4 text-gray-500 dark:text-gray-300">{state.message}</p>

          <div class="flex justify-center items-center space-x-4">
            <Button
              color="secondary"
              onClick={() => {
                if (state.actions.onCancel) state.actions.onCancel();
                setState("isShow", false);
              }}
            >
              ບໍ່, ຍົກເລີກ
            </Button>
            <Button
              color="danger"
              isLoading={state.isLoading}
              onClick={async () => {
                setState("isLoading", true);

                await state.actions.onConfirm();

                setState("isLoading", false);

                setState("isShow", false);
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
