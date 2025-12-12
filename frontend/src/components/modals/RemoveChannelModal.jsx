import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getSocket } from '../../services/socket.js';
import { removeChannel, setCurrentChannel } from '../../slices/channelsSlice.js';

const RemoveChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemove = () => {
    const socket = getSocket();

    socket.emit('removeChannel', { id: channel.id }, (response) => {
      if (response.status === 'ok') {
        dispatch(removeChannel(channel.id));
        dispatch(setCurrentChannel(1)); // general
        toast.success(t('toasts.channelRemoved'));
        onHide();
      } else {
        toast.error(t('toasts.networkError'));
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.remove.body')}</p>
        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={onHide} className="me-2">
            {t('modals.remove.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            {t('modals.remove.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal
