import { useCallback, useEffect, useState } from "react";

import { FormInstance } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-use";

import { modalConfirm } from "@src/components/atoms/ModalConfirm/ModalConfirm";

interface UnsavedPromptProps {
  form?: FormInstance;
  visible?: boolean;
  title?: string;
  text?: string;
}

/**
 * A hook to prompt the user when leaving an unsaved form
 */
const useUnsavedPrompt = ({
  form,
  title,
  text,
  visible,
}: UnsavedPromptProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const location = useLocation();
  const { t } = useTranslation();

  /**
   * This will prompt a native browser dialog to confirm
   * if the user wants to leave this page without saving the changes
   * It will prompt the confirm dialog when the user:
   * - Clicks 'reload' in browser
   * - Clicks 'back' in browser
   * - Enters a url in browser
   * - Closes the browser/tab
   */
  const prompt = useCallback(
    (event: BeforeUnloadEvent) => {
      if (visible && form?.isFieldsTouched()) {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = "";
        }
        return "";
      }
      return undefined;
    },
    [form, visible]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", prompt);
    return () => {
      window.removeEventListener("beforeunload", prompt);
    };
  }, [prompt]);

  /**
   * Runs when there is a history change,
   * and shows a modal confirmation to discard form changes if form is touched.
   */
  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (visible) {
        if (form?.isFieldsTouched() && !isSubmitting) {
          modalConfirm(t, {
            title: title ?? t("default.unsavedChangesTitle"),
            content: text ?? t("default.unsavedChangesText"),
            cancelText: t("default.unsavedChangesCancelTitle"),
            okText: t("default.unsavedChangesConfirmTitle"),
            onOk: () => {
              router.push(url);
              return true;
            },
          });

          return false;
        }
      }

      return true;
    });
  }, [visible, form, router, location, isSubmitting, t, text, title]);

  return { setIsSubmitting };
};

export default useUnsavedPrompt;
