// frontend/src/components/chat/ChatPage.jsx
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import leoProfanity from 'leo-profanity'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext.jsx'
import AddChannelModal from '../modals/AddChannelModal.jsx'
import RemoveChannelModal from '../modals/RemoveChannelModal.jsx'
import RenameChannelModal from '../modals/RenameChannelModal.jsx'
import {
  setChannels,
  setCurrentChannel,
} from '../../slices/channelsSlice.js'
import {
  setMessages,
  addMessage,
} from '../../slices/messagesSlice.js'
import { initSocket, getSocket } from '../../services/socket.js'

const ChatPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getToken, user } = useAuth()
  const inputRef = useRef(null)

  const [modalInfo, setModalInfo] = useState({ type: null, item: null })
  const showModal = (type, item = null) => setModalInfo({ type, item })
  const hideModal = () => setModalInfo({ type: null, item: null })

  const { channels = [], currentChannelId } = useSelector((state) => state.channels)
  const messages = useSelector((state) => state.messages.messages || [])

  const currentChannel = channels.find((ch) => ch.id === currentChannelId) || { name: 'general' }
  const channelMessages = messages.filter((m) => m.channelId === currentChannelId)

  // Загрузка данных + сокет
  useEffect(() => {
  const token = getToken();
  if (token) {
    initSocket(token); // ← вызываем сразу, не ждём fetch
  }

  const fetchData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get('/api/v1/data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setChannels({
        channels: data.channels || [],
        currentChannelId: data.currentChannelId || 1,
      }));
      dispatch(setMessages(data.messages || []));
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
      toast.error(t('toasts.networkError'));
    }
  };

  fetchData();
}, [dispatch, getToken]);

  // Новые сообщения
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('newMessage', (payload) => {
      console.log('Получено новое сообщение:', payload);
      dispatch(addMessage(payload));
    });

    return () => socket.off('newMessage');
  }, [dispatch]);

  // Отправка сообщения
  const handleSubmit = async (values, { resetForm }) => {
    if (!values.body.trim()) return;

    const cleanBody = leoProfanity.clean(values.body);

    const message = {
      body: cleanBody,
      channelId: currentChannelId,
      username: user.username,
    };
    console.log('Отправляем сообщение:', message); // ← лог

    const socket = getSocket();

    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('timeout')), 5000);
        socket.emit('newMessage', message, (response) => {
          clearTimeout(timeout);
          console.log('Ответ от сервера:', response); // ← лог
          response.status === 'ok' ? resolve() : reject();
        });
      });
      resetForm();
      inputRef.current?.focus();
    } catch (err) {
      console.error('Сообщение не отправлено:', err);
      toast.error(t('toasts.networkError'));
    }
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          {/* Navbar */}
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">{t('header.brand')}</a>
            </div>
          </nav>

          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white">
              {/* Каналы */}
              <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                <div className="d-flex justify-content-between mb-2 px-4 pe-2">
                  <span>{t('chat.channels')}</span>
                  <button
                    type="button"
                    className="p-0 text-primary btn btn-group-vertical border-0"
                    onClick={() => showModal('add')}
                    aria-label={t('chat.addChannel')}
                  >
                    <span className="fs-4">+</span>
                  </button>
                </div>

<ul className="nav flex-column nav-pills nav-fill px-2 pb-3">
    {/* Канал # general — всегда первый */}
    <li className="nav-item w-100">
      <button
        type="button"
        className={`w-100 rounded-0 text-start btn ${
          currentChannelId === 1 ? 'btn-secondary' : ''
        }`}
        onClick={() => dispatch(setCurrentChannel(1))}
      >
        <span className="me-1">#</span>general
      </button>
    </li>

    {/* Канал # random */}
    <li className="nav-item w-100">
      <button
        type="button"
        className={`w-100 rounded-0 text-start btn ${
          currentChannelId === 2 ? 'btn-secondary' : ''
        }`}
        onClick={() => dispatch(setCurrentChannel(2))}
      >
        <span className="me-1">#</span>random
      </button>
    </li>

    {/* Если будут другие каналы от сервера — они добавятся ниже */}
    {channels
      .filter((ch) => ch.id !== 1 && ch.id !== 2) // исключаем general и random, если они уже от сервера
      .map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <div className="d-flex">
            <button
              type="button"
              className={`flex-grow-1 text-start btn rounded-0 text-truncate ${
                channel.id === currentChannelId ? 'btn-secondary' : 'btn-light'
              }`}
              onClick={() => dispatch(setCurrentChannel(channel.id))}
            >
              <span className="me-1">#</span>{channel.name}
            </button>

            {channel.removable && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                  className="border-0"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => showModal('remove', channel)}>
                    {t('chat.removeChannel')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => showModal('rename', channel)}>
                    {t('chat.renameChannel')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </li>
      ))}
  </ul>
              </div>

              {/* Сообщения */}
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b># {currentChannel.name}</b>
                    </p>
                    <span className="text-muted">
                      {t('chat.messageCount', { count: channelMessages.length })}
                    </span>
                  </div>

                  <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
                    {channelMessages.map((msg) => (
                      <div key={msg.id} className="text-break mb-2">
                        <b>{msg.username}</b>: {msg.body}
                      </div>
                    ))}
                  </div>

                  {/* Форма отправки */}
                  <div className="mt-auto px-5 py-3">
                    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
                      {({ isSubmitting }) => (
                        <Form noValidate className="py-1 border rounded-2">
                          <div className="input-group">
                            <Field
                              innerRef={inputRef}
                              name="body"
                              aria-label={t('chat.newMessage')}
                              placeholder={t('chat.enterMessage')}
                              className="border-0 p-0 ps-2 form-control"
                              disabled={isSubmitting}
                            />
                            <button
                              type="submit"
                              disabled={isSubmitting || !currentChannelId}
                              className="btn border-0"
                            >
                              {isSubmitting ? (
                                <span className="spinner-border spinner-border-sm" />
                              ) : (
                                <i className="bi bi-arrow-right" />
                              )}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модалки */}
      {modalInfo.type === 'add' && <AddChannelModal show onHide={hideModal} />}
      {modalInfo.type === 'remove' && <RemoveChannelModal show onHide={hideModal} channel={modalInfo.item} />}
      {modalInfo.type === 'rename' && <RenameChannelModal show onHide={hideModal} channel={modalInfo.item} />}
    </div>
  );
};

export default ChatPage