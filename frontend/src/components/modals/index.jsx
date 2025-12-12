import { useState } from 'react';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const modals = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

export const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });

  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const ModalComponent = modalInfo.type ? modals[modalInfo.type] : null;

  return (
    <>
      {children}
      {ModalComponent && (
        <ModalComponent
          show={!!modalInfo.type}
          onHide={hideModal}
          channel={modalInfo.item}
        />
      )}
    </>
  );
}
