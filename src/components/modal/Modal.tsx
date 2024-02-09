import { Dialog, DialogRootProps } from "@ark-ui/solid";
import { JSX, ParentProps, Show } from "solid-js";
import { Portal } from "solid-js/web";
import CloseIcon from "../icons/CloseIcon";
import "./Modal.scss";

interface DialogProps extends ParentProps<DialogRootProps> {
  header?: string;
  footer?: JSX.Element;
  close?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default (props: DialogProps) => {
  return (
    <Dialog.Root {...props} lazyMount unmountOnExit>
      <Portal>
        <Dialog.Backdrop class="modal-backdrop" />
        <Dialog.Positioner class="modal">
          <div class={`modal-container modal-${props.size || "md"}`}>
            <Dialog.Content class="modal-content">
              <Show when={props.header}>
                <div class="modal-header">
                  <h3 class="modal-header-title">{props.header}</h3>
                  <Dialog.CloseTrigger class="modal-header-close-icon">
                    <CloseIcon class="w-3 h-3" aria-hidden="true" />
                    <span class="sr-only">Close modal</span>
                  </Dialog.CloseTrigger>
                </div>
              </Show>

              <Show when={props.close}>
                <Dialog.CloseTrigger class="modal-close-icon">
                  <CloseIcon class="w-3 h-3" aria-hidden="true" />
                  <span class="sr-only">Close modal</span>
                </Dialog.CloseTrigger>
              </Show>

              {props.children}

              <Show when={props.footer}>
                <div class="modal-footer">{props.footer}</div>
              </Show>
            </Dialog.Content>
          </div>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
