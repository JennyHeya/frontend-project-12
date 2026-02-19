export const handleAddChannelSubmit = async (
  values,
  formikActions,
  addChannel,
  dispatch,
  changeActiveChannel,
  toastPromise,
  message,
  handleClose,
  filter
) => {
  const name = filter.clean(values.name)
  const response = addChannel({ name })
    .unwrap()
    .then(({ id }) => dispatch(changeActiveChannel(id)))

  toastPromise(response, message)
  handleClose()
  formikActions.setSubmitting(false)
}

export const handleRenameChannelSubmit = async (
  values,
  formikActions,
  renameChannel,
  id,
  toastPromise,
  message,
  handleClose,
  filter
) => {
  const name = filter.clean(values.name)
  const response = renameChannel({ name, id }).unwrap()

  toastPromise(response, message)
  handleClose()
  formikActions.setSubmitting(false)
}
