import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getSocket } from '../../services/socket.js';
import { addChannel, setCurrentChannel } from '../../slices/channelsSlice.js';

const AddChannelModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const channels = useSelector((state) => state.channels.channels);

  const schema = yup.object({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels.map(c => c.name), 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting) => {
      const socket = getSocket();
      const newChannel = { name: values.name };

      socket.emit('newChannel', newChannel, (response) => {
        if (response.status === 'ok') {
          dispatch(addChannel(response.data));
          dispatch(setCurrentChannel(response.data.id));
          onHide();
        }
      });
    },
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              disabled={formik.isSubmitting}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Отменить
            </Button>
            <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal
