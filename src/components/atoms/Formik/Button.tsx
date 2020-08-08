import React, { ReactChildren, ReactNode, useCallback } from 'react'

import { useFormikContext } from 'formik'
import { ButtonProps } from 'semantic-ui-react'
import { PrimaryButton } from '../Button'

export type SubmitButtonProps = ButtonProps & {
  children: ReactChildren | ReactNode
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { children } = props
  const { submitForm, isValid, setSubmitting } = useFormikContext()

  const onClickSubmit = useCallback(() => {
    submitForm()
    setSubmitting(false)
  }, [])

  return (
    <PrimaryButton {...props} onClick={onClickSubmit} disabled={!isValid}>
      {children}
    </PrimaryButton>
  )
}
