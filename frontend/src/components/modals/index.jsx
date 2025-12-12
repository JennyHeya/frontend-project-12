// frontend/src/components/modals/index.jsx
import { useState, createContext, useContext } from 'react';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const modals = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

// Создаём контекст — чтобы можно было использовать useModal() в ChatPage
const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });

  const hideModal = () => setModalInfo({ type: null, item: null });

  const showModal = (type, item = null) => {
    setModalInfo({ type, item });
  };

  const ModalComponent = modalInfo.type ? modals[modalInfo.type] : null;

  const value = { showModal, hideModal };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {ModalComponent && (
        <ModalComponent
          show={!!modalInfo.type}
          onHide={hideModal}
          channel={modalInfo.item}
        />
      )}
    </ModalContext.Provider>
  );
}
