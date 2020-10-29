import React, { FocusEvent, useState } from 'react'

import { FieldAttributes, useField, useFormikContext } from 'formik'
import { CheckboxProps, Dropdown, DropdownProps, Form, FormSelectProps } from 'semantic-ui-react'

import ErrorPopup from '../ErrorPopup'
import { errorField } from './style.css'

export interface FormikInputProps {
  className?: string
}

export const FormikInput = (props: FormikInputProps & FieldAttributes<any>) => {
  const { className, ...rest } = props

  const [field, meta] = useField(rest)

  const [isFocus, setFocus] = useState(false)

  const isError = meta.touched && !!meta.error
  const isOpen = isError && isFocus

  const handleBlur = (e: FocusEvent<any>) => {
    field.onBlur(e)
    setFocus(true)
  }

  const handleFocus = () => {
    setFocus(true)
  }

  return (
    <ErrorPopup isOpen={isOpen} message={meta.error}>
      <Form.Input
        {...rest}
        {...field}
        className={isError ? `${className} ${errorField}` : className}
        error={isError}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </ErrorPopup>
  )
}

export const FormikTextArea = (props: FormikInputProps & FieldAttributes<any>) => {
  const { className, ...rest } = props

  const [field, meta] = useField(rest)

  const [isFocus, setFocus] = useState(false)

  const isError = meta.touched && !!meta.error
  const isOpen = isError && isFocus

  const handleBlur = (e: FocusEvent<any>) => {
    field.onBlur(e)
    setFocus(true)
  }

  const handleFocus = () => {
    setFocus(true)
  }

  return (
    <ErrorPopup isOpen={isOpen} message={meta.error}>
      <Form.TextArea
        {...rest}
        {...field}
        className={isError ? `${className} ${errorField}` : className}
        error={isError}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </ErrorPopup>
  )
}

export const FormikSelect = (props: FormSelectProps & FieldAttributes<any>) => {
  const { className, options, name, ...rest } = props

  const [field, meta] = useField({ name })
  const { setFieldValue } = useFormikContext()

  const isError = meta.touched && !!meta.error

  const handleChange = (_: any, data: DropdownProps) => {
    setFieldValue(name as never, data.value)
    if (props.onChange) {
      props.onChange(data.value)
    }
  }

  return (
    <ErrorPopup isOpen={false} message={meta.error}>
      <Form.Select
        {...rest}
        name={field.name}
        onChange={handleChange}
        value={field.value}
        options={options}
        className={isError ? `${className} ${errorField}` : className}
        error={isError}
      />
    </ErrorPopup>
  )
}

export const FormikDropdown = (props: DropdownProps & FieldAttributes<any>) => {
  const { className, options, name, ...rest } = props

  const [field, meta] = useField({ name })
  const { setFieldValue } = useFormikContext()

  const isError = meta.touched && !!meta.error

  const handleChange = (_: any, data: DropdownProps) => {
    setFieldValue(name as never, data.value)
  }

  return (
    <ErrorPopup isOpen={false} message={meta.error}>
      <Dropdown
        {...rest}
        name={field.name}
        onChange={handleChange}
        defaultValue={field.value}
        options={options}
        className={isError ? `${className} ${errorField}` : className}
        error={isError}
      />
    </ErrorPopup>
  )
}

export const FormikSelectLabel = (props: DropdownProps & FieldAttributes<any>) => (
  <FormikDropdown
    compact={true}
    fluid={true}
    labeled={true}
    multiple={true}
    selection={true}
    search={true}
    scrolling={true}
    {...props}
  />
)

export const FormikTagInput = (props: DropdownProps & FieldAttributes<any>) => {
  const { options, ...rest } = props

  const handleAddition = (_: React.KeyboardEvent<HTMLElement>, { value }: DropdownProps) => {
    if (typeof value === 'string') {
      options.push({ key: value, value, text: value })
    }
  }

  return (
    <FormikSelectLabel
      allowAdditions={true}
      additionLabel="タグを追加"
      options={options}
      onAddItem={handleAddition}
      {...rest}
    />
  )
}

export const FormikDropSelect = (props: DropdownProps & FieldAttributes<any>) => (
  <FormikDropdown compact={true} fluid={true} search={true} selection={true} scrolling={true} {...props} />
)

interface RadioOption {
  key: string
  value: string
  text: string
  disabled?: boolean
}

interface FormikRadioProps {
  className?: string
  containerClassName?: string
  inline?: boolean
  options: RadioOption[]
  onChange?: (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void
}

export const FormikRadio = (props: FormikRadioProps & DropdownProps & FieldAttributes<any>) => {
  const { className, containerClassName, options, name, inline, onChange } = props

  const [field, meta] = useField({ name })
  const { setFieldValue } = useFormikContext()

  const isError = meta.touched && !!meta.error

  const handleChange = (e: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    if (onChange) {
      onChange(e, data)
    }
    setFieldValue(name as never, data.value)
  }

  return (
    <ErrorPopup isOpen={false} message={meta.error}>
      <Form.Group inline={inline} className={containerClassName}>
        {(options as RadioOption[]).map((option, i) => (
          <Form.Radio
            key={i}
            label={option.text}
            name={name}
            value={option.value}
            onChange={handleChange}
            checked={option.value === field.value}
            className={isError ? `${className} ${errorField}` : className}
            disabled={option.disabled}
          />
        ))}
      </Form.Group>
    </ErrorPopup>
  )
}
