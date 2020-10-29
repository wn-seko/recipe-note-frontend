import React, { FC } from 'react'
import { Header, FormInput, Form, Button, Container, FormSelect, FormTextArea } from 'semantic-ui-react'
import { Formik } from 'formik'
import { SubmitButton } from '../../atoms/Formik/Button'
import { FormikTagInput } from '../../atoms/Formik/Input'

const CreateRecipe: FC = () => {
  const handleSubmit = () => {
    console.log('submit')
  }

  // TODO: implement me
  const tagOptions: Array<{ key: string; value: string; text: string }> = []

  return (
    <Container>
      <Header>レシピ登録</Header>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form>
          <Form.Group>
            <Form.Field width="6">
              <label>名前</label>
              <FormInput name="name" />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="6">
              <label>分類</label>
              <FormSelect name="category" options={[]} />
            </Form.Field>
            <Form.Field width="6">
              <label>人数</label>
              <FormInput name="numberOfPeople" />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="6">
              <label>素材</label>
              <FormInput name="material" options={[]} />
            </Form.Field>
            <Form.Field width="6">
              <label>分量</label>
              <FormInput name="quantity" />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="12">
              <label>工程</label>
              <FormTextArea name="process" />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width="12">
              <label>タグ</label>
              <FormikTagInput name="tag" options={tagOptions} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Button>キャンセル</Button>
            </Form.Field>
            <Form.Field>
              <SubmitButton primary={true}>保存</SubmitButton>
            </Form.Field>
          </Form.Group>
        </Form>
      </Formik>
    </Container>
  )
}

export default CreateRecipe
