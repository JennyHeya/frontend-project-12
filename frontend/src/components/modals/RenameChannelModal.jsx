import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../services/socket.js';
import { renameChannel } from '../../slices/channelsSlice.js';

const RenameChannelModal = ({ show, onHide, channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);

  const schema = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.rename.errors.length'))
      .max(20, t('modals.rename.errors.length'))
      .notOneOf(
        channels.filter((c) => c.id !== channel.id).map((c => c.name),
        t('modals.rename.errors.unique')
      )
      .required(t('modals.rename.errors.required')),
  });

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }) => {
      const socket = getSocket();

      socket.emit('renameChannel', { id: channel.id, name: values.name }, (response) => {
        if (response.status === 'ok') {
          dispatch(renameChannel({ id: channel.id, name: values.name }));
          toast.success(t('toasts.channelRenamed'));
          onHide();
        } else {
          toast.error(t('toasts.networkError'));
        }
        setSubmitting(false);
      });
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              placeholder={t('modals.rename.label')}
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
              disabled={formik.isSubmitting}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onHide} className="me-2">
              {t('modals.rename.cancel')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.rename.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal
