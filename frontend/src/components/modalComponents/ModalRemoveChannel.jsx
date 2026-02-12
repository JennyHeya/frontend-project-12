import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'

import { changeActiveChannel, useRemoveChannelMutation } from '../../slices/channelsSlice'
import toastPromise from '../../utils/toastPromise'

const ModalRemoveChannel = ({ show, handleClose, id }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [removeChannel] = useRemoveChannelMutation()
  const { activeChannelId } = useSelector(state => state.channels)
  const message = {
    loading: t('channel.removeChannelPending'),
    success: t('channel.removeChannelFulfilled'),
    error: t('channel.removeChannelRejected'),
  }

  const modalRef = useRef(null)
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus()
    }
  }, [show])

  const handleSubmit = (e) => {
    e.preventDefault()
    const response = removeChannel({ id }).unwrap()
    if (id === activeChannelId) {
      dispatch(changeActiveChannel(null))
    }
    toastPromise(response, message)
    handleClose()
  }
  return (
    <Modal show={show} size="sm" centered onHide={handleClose}>
      <Modal.Header closeButton className="text-center">
        <Modal.Title className="w-100">
          {t('modal.removeChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">{t('modal.confirmText')}</div>
      </Modal.Body>
      <Modal.Footer>
        <Form
          noValidate
          className="py-1 d-flex flex-wrap justify-content-end gap-3"
          onSubmit={e => handleSubmit(e)}
        >
          <Button variant="secondary" type="reset" onClick={handleClose}>
            {t('modal.cancelButton')}
          </Button>
          <Button variant="danger" type="submit" ref={modalRef}>
            {t('modal.removeButton')}
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalRemoveChannel
