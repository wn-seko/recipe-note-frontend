import React, { useEffect } from 'react'

import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
// import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Segment } from 'semantic-ui-react'

import { checkLogin } from '../../../domains/auth'
import yup, { EmailSchema, PasswordSchema } from '../../../domains/validation'
// import { actions, selectors } from '../../../modules'
import history from '../../../modules/store/history'
import { SubmitButton } from '../../atoms/Formik/Button'
import { FormikInput } from '../../atoms/Formik/Input'
import { Alert } from '../../molecules/Message'

import style from './style.css'

export interface FormValues {
  email: string
  password: string
}

const Login = () => {
  const { t } = useTranslation('login')

  useEffect(() => {
    if (checkLogin()) {
      history.push('/')
    }
  }, [])

  const initialValues = { email: '', password: '' }

  const onSubmit = (values: FormValues) => {
    const { email, password } = values
    console.log({ email, password })
    // dispatch(actions.auth.requestLogin(email, password))
  }

  const validationSchema = yup.object().shape({
    email: EmailSchema(),
    password: PasswordSchema(),
  })

  // TODO: impl me
  const DUMMY_ERROR = false
  const DUMMY_LOADING = false
  const DUMMY_MESSAGE = ''

  return (
    <Container className={style.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form size="large" error={DUMMY_ERROR} loading={DUMMY_LOADING}>
          <Segment className={style.loginSegment}>
            <FormikInput
              className={style.inputBox}
              fluid={true}
              icon="user"
              iconPosition="left"
              placeholder={t('email')}
              name="email"
              type="text"
            />
            <FormikInput
              className={style.inputBox}
              fluid={true}
              icon="lock"
              iconPosition="left"
              placeholder={t('password')}
              name="password"
              type="password"
            />
            <SubmitButton className="login" primary={true} fluid={true} size="large">
              {t('login')}
            </SubmitButton>
            {DUMMY_MESSAGE && <Alert key={DUMMY_MESSAGE} content={DUMMY_MESSAGE} />}
          </Segment>
        </Form>
      </Formik>
    </Container>
  )
}

export default Login
