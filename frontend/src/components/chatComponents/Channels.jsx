import { useDispatch } from 'react-redux'
import {
  ListGroup, ListGroupItem, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { changeActiveChannel } from '../../slices/channelsSlice'
import { useUiContext } from '../../hooks'
import Cross from '../svg/Cross'

const Channels = ({ channels, handleModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputRef = useUiContext()

  const channelName = (id, name) => (
    <Button
      variant="secondary"
      type="button"
      className="w-100 rounded-0 text-start btn btn-secondary text-truncate"
      onClick={() => {
        dispatch(changeActiveChannel(id))
        inputRef.setFocus()
      }}
    >
      {' '}
      #
      {' '}
      {name}
    </Button>
  )

  const renderDropdown = (name, id) => (
    <Dropdown as={ButtonGroup} className="w-100">
      {channelName(id, name)}
      <Dropdown.Toggle
        split
        variant="secondary"
        id={id}
        key="down"
        className="text-end rounded-0"
      >
        <span className="visually-hidden">{t('chatPage.channelContol')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => handleModal({ id, type: 'removeChannel' })}
        >
          {t('chatPage.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleModal({ id, type: 'renameChannel' })}
        >
          {t('chatPage.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

  const renderListGroup = () => channels.map(({ id, name, removable }) => (
    <ListGroupItem key={id} as="li" className="w-100 p-0">
      {removable ? renderDropdown(name, id) : channelName(id, name)}
    </ListGroupItem>
  ))

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channels')}</b>
        <Button
          onClick={() => handleModal({ type: 'addChannel' })}
          variant=""
          type="button"
          className="p-0 text-primary btn-group-vertical"
        >
          <Cross />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ListGroup as="ul" id="channels-box" className="p-2">
        {renderListGroup()}
      </ListGroup>
    </>
  )
}

export default Channels
