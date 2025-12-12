// frontend/src/components/chat/ChatPage.jsx
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useModal } from '../../contexts/ModalContext.jsx'; // ← создашь через минуту
import {
  setChannels,
  setCurrentChannel,
} from '../../slices/channelsSlice.js';
import {
  setMessages,
  addMessage,
} from '../../slices/messagesSlice.js';
import { initSocket, getSocket } from '../../services/socket.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getToken, user } = useAuth();
  const { showModal } = useModal();
  const inputRef = useRef(null);

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages.messages);

  const currentChannel = channels.find((ch) => ch.id === currentChannelId) || { name: 'general' };
  const channelMessages = messages.filter((m) => m.channelId === currentChannelId);

  // Загрузка каналов и сообщений + подключение сокета
  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const { data } = await axios.get('/api/v1/data', {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setChannels({
          channels: data.channels,
          currentChannelId: data.currentChannelId,
        }));
        dispatch(setMessages(data.messages));
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      }
    };

    fetchData();
    initSocket(); // подключаем WebSocket один раз
  }, [dispatch, getToken]);

  // Подписка на новые сообщения
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    return () => socket.off('newMessage');
  }, [dispatch]);

  // Отправка сообщения
  const handleSubmit = async (values, { resetForm }) => {
    if (!values.body.trim()) return;

    const message = {
      body: values.body,
      channelId: currentChannelId,
      username: user.username,
    };

    const socket = getSocket();

    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('timeout')), 5000);
        socket.emit('newMessage', message, (response) => {
          clearTimeout(timeout);
          response.status === 'ok' ? resolve() : reject();
        });
      });
      resetForm();
      inputRef.current?.focus();
    } catch (err) {
      console.error('Сообщение не отправлено:', err);
    }
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          {/* Navbar */}
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>

          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white">
              {/* === КАНАЛЫ === */}
              <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                <div className="d-flex justify-content-between mb-2 px-4 pe-2">
                  <span>Каналы</span>
                  <button
                    type="button"
                    className="p-0 text-primary btn btn-group-vertical border-0"
                    onClick={() => showModal('add')}
                  >
                    <i className="bi bi-plus-square" />
                  </button>
                </div>

                <ul className="nav flex-column nav-pills nav-fill px-2 pb-3">
                  {channels.map((channel) => (
                    <li key={channel.id} className="nav-item w-100">
                      <div className="d-flex">
                        <button
                          type="button"
                          className={`flex-grow-1 text-start btn rounded-0 text-truncate ${
                            channel.id === currentChannelId ? 'btn-secondary' : 'btn-light'
                          }`}
                          onClick={() => dispatch(setCurrentChannel(channel.id))}
                        >
                          # {channel.name}
                        </button>

                        {/* Управление только для пользовательских каналов */}
                        {channel.removable && (
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                              className="border-0"
                              id={`dropdown-${channel.id}`}
                            >
                              <span className="visually-hidden">Управление каналом</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => showModal('remove', channel)}>
                                Удалить
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => showModal('rename', channel)}>
                                Переименовать
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* === СООБЩЕНИЯ === */}
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># {currentChannel.name}</b></p>
                    <span className="text-muted">{channelMessages.length} сообщений</span>
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
                              aria-label="Новое сообщение"
                              placeholder="Введите сообщение..."
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
    </div>
  );
};

export default ChatPage
