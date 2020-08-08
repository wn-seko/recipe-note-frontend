import * as yup from 'yup'
import i18n from '../i18n'

type MyMixedSchema = yup.MixedSchema & MySchema

interface MySchema {
  sameAs: (r: yup.Ref, m: string) => MyMixedSchema
}

yup.addMethod(yup.mixed, 'sameAs', function (ref, message) {
  return (this as yup.MixedSchema).test('sameAs', message, function (value: string) {
    const other = this.resolve(ref)

    return !other || !value || value === other
  })
})

const mixedSchema = yup.mixed() as MyMixedSchema

export const EmailSchema = (emailList: string[] = []) =>
  yup
    .string()
    .email(i18n.t('validation:invalidEmail'))
    .max(256, i18n.t('validation:tooLongLetter', { n: 256 }))
    .notOneOf(emailList, i18n.t('validation:userDuplicated'))
    .required(i18n.t('validation:required'))

export const PasswordSchema = () =>
  yup
    .string()
    .min(8, i18n.t('validation:tooShortLetter', { n: 8 }))
    .max(64, i18n.t('validation:tooLongLetter', { n: 64 }))
    .matches(/^[\x21-\x7e]+$/, i18n.t('validation:onlyAlphanumericOrSymbols'))
    .required(i18n.t('validation:required'))

export const PasswordConfirmSchema = (path = 'password') =>
  mixedSchema.sameAs(yup.ref(path), i18n.t('validation:passwordNotMatched')).required(i18n.t('validation:required'))

export default yup
