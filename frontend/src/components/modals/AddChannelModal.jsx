import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../services/socket.js';
import { addChannel, setCurrentChannel } from '../../slices/channelsSlice.js';

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);

  const schema = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.add.errors.length'))
      .max(20, t('modals.add.errors.length'))
      .notOneOf(channels.map((c) => c.name), t('modals.add.errors.unique'))
      .required(t('modals.add.errors.required')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }) => {
      const socket = getSocket();
      const newChannel = { name: values.name };

      socket.emit('newChannel', newChannel, (response) => {
        if (response.status === 'ok') {
          dispatch(addChannel(response.data));
          dispatch(setCurrentChannel(response.data.id));
          toast.success(t('toasts.channelAdded'));
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
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              placeholder={t('modals.add.label')}
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
              {t('modals.add.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
              {t('modals.add.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal
