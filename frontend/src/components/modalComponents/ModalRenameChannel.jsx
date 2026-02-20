import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { Button, Form, Modal } from 'react-bootstrap'

import { useRenameChannelMutation } from '../../store/slices/channelsSlice'
import toastPromise from '../../utils/toastPromise'
import { channelNameSchema } from '../../utils/validationSchemas'
import { handleRenameChannelSubmit } from '../../utils/channelHandlers'

const ModalRenameChannel = ({
  channels, show, handleClose, id,
}) => {
  const { t } = useTranslation()
  const [renameChannel] = useRenameChannelMutation()

  const message = {
    loading: t('channel.renameChannelPending'),
    success: t('channel.renameChannelFulfilled'),
    error: t('channel.renameChannelRejected'),
  }

  const currentChannel = channels.find(channel => channel.id === id).name

  const modalRef = useRef(null)
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.select()
    }
  }, [show])

  const formik = useFormik({
    initialValues: {
      name: currentChannel,
    },
    validationSchema: channelNameSchema,
    validateOnChange: true,
    onSubmit: (values, actions) =>
      handleRenameChannelSubmit(
        values,
        actions,
        renameChannel,
        id,
        toastPromise,
        message,
        handleClose,
        filter,
      ),
  })

  const inputClasses = formik.touched.name && formik.errors.name
    ? 'is-invalid p-2 ps-1 border rounded-2 mb-2'
    : 'p-1 ps-2 border rounded-2 mb-3'

  return (
    <Modal show={show} size="lg" centered onHide={handleClose}>
      <Modal.Header closeButton className="text-center">
        <Modal.Title className="w-100">{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          className="py-1 d-flex flex-wrap justify-content-between"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="mb-3 w-100" controlId="channel">
            <Form.Control
              type="text"
              name="name"
              autoComplete="off"
              aria-label=""
              className={inputClasses}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={modalRef}
            />
            <Form.Label className="visually-hidden">{t('channel.channelName')}</Form.Label>
            {formik.touched.name && formik.errors.name
              ? (
                  <div className="text-danger w-100">{formik.errors.name}</div>
                )
              : null}
          </Form.Group>
          <Button
            variant="secondary"
            type="reset"
            onClick={() => {
              formik.resetForm()
              handleClose()
            }}
          >
            {t('modal.cancelButton')}
          </Button>
          <Button variant="primary" type="submit">
            {t('modal.submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRenameChannel
