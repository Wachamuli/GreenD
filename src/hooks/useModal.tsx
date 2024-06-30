import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import MyModal, { ModalProps } from "../components/info/MyModal";
import { ColorPalette } from "../styles/colorPalette";

const ModalContext = createContext<{
  open: (p: ModalProps) => void;
  close: () => void;
  info: (title: string, message: string) => void;
  error: (message: string) => void;
}>({
  open: () => {},
  close: () => {},
  info: () => {},
  error: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ModalProps>({});

  const open = useCallback((content: ModalProps) => {
    setVisible(true);
    setContent(content);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setContent({});
  }, []);

  const info = useCallback((title: string, message: string) => {
    setVisible(true);
    setContent({
      title: title,
      description: message,
      iconProps: { icon: faCircleInfo, color: ColorPalette.secondary },
      buttonOptions: [{ label: "Entendido" }],
    });
  }, []);

  const error = useCallback((message: string) => {
    setVisible(true);
    setContent({
      title: "¡Ups! Algo salió mal",
      description: message,
      iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
      buttonOptions: [{ label: "Entendido" }],
    });
  }, []);

  return (
    <ModalContext.Provider value={{ open, close, info, error }}>
      {children}
      <MyModal {...content} isVisible={visible} onClose={close} />
    </ModalContext.Provider>
  );
};

const useModal = () => {
  return useContext(ModalContext);
};

export { useModal };
export default ModalProvider;
