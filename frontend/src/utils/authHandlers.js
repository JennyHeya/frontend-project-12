export const handleSignupSubmit = async (values, formikActions, auth, navigate, t, toast, api, userRoutes, pagesRoutes) => {
  auth.updateAuthError(null)

  try {
    const res = await api('post', userRoutes.signupPath(), values)
    localStorage.setItem('userId', JSON.stringify(res.data))
    const { username } = values
    auth.logIn()
    auth.addUser({ username })
    navigate(pagesRoutes.chat())
    toast.success(t('signup.success'))
  }
  catch (err) {
    const authError = err.status ?? err.code
    auth.updateAuthError(authError)

    if (authError === 409) {
      formikActions.setFieldError('username', t('signup.errors.userExists'))
      return
    }

    toast.error(t([`errors.${authError}`, 'errors.default']))
  }
  finally {
    formikActions.setSubmitting(false)
  }
}
