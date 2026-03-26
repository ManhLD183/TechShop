import * as React from "react";
import { Modal as AntModal } from "antd";
import type { ModalProps as AntModalProps } from "antd";
import { cn } from "./cn";

/**
 * Theme wrapper for Ant Design Modal.
 * Styling is applied via `.theme-modal` selectors in `client/src/index.css`.
 */
export type ModalProps = AntModalProps & {
  wrapClassName?: string;
};

export function Modal({
  className,
  wrapClassName,
  ...rest
}: ModalProps) {

  return (
    <AntModal
      {...rest}
      className={cn("theme-modal", className)}
      wrapClassName={cn("theme-modal-wrap", wrapClassName)}
    />
  );
}

