import React from 'react'
import { Button, ButtonProps, Icon } from 'semantic-ui-react'
import style from './style.css'

interface CustomButtonProps extends ButtonProps {
  children: React.ReactChildren
}

export const PrimaryButton = (props: ButtonProps) => {
  const { className, ...rest } = props
  return <Button className={`${style.primaryButton} ${className}`} primary={true} {...rest} />
}

export const PlusButton = (props: CustomButtonProps) => {
  const { children, ...rest } = props

  return (
    <div className={style.plusButton}>
      <PrimaryButton size="mini" {...rest}>
        <Icon name="plus" /> {children}
      </PrimaryButton>
    </div>
  )
}

export const EditButton = (props: CustomButtonProps) => {
  const { children, ...rest } = props

  return (
    <PrimaryButton size="mini" {...rest}>
      <Icon name="edit" /> {children}
    </PrimaryButton>
  )
}

export const DeleteButton = (props: CustomButtonProps) => {
  const { children, ...rest } = props

  return (
    <PrimaryButton size="mini" {...rest}>
      <Icon name="trash alternate" /> {children}
    </PrimaryButton>
  )
}
