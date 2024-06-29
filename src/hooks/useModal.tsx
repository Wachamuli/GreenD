import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import MyModal, { ModalProps } from "../components/info/MyModal";

const ModalContext = createContext<{
  open: (p: ModalProps) => void;
  close: () => void;
}>({
  open: () => {},
  close: () => {},
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

  return (
    <ModalContext.Provider value={{ open, close }}>
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
