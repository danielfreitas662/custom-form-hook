# Custom React Form Hook

## How to use

Install package in your project by running `npm install custom-form-hook`

### `Quick start example`

```sh
import React from 'react';
import { Form, Button, TextInput } from 'custom-form-hook';

function TestView() {
  const initialValues = {
    contacts: [
      { mobile: '84888928939' },
      { mobile: '78993890949' },
    ],
    firstName: 'Daniel',
    lastName: 'Freitas',
    address: {
      street: 'Julio Ferreira',
      number: '45',
    },
  };
  const form = Form.useForm(initialValues);

  return (
    <div>
      <Form form={form} colon onFinish={(values) => console.log(values)}>
        <Form.Field name="firstName" label="First Name">
          <TextInput />
        </Form.Field>
        <Form.Field name="lastName" label="Last Name">
          <TextInput />
        </Form.Field>
        <Form.Field name={['address', 'street']} label="Street">
          <TextInput />
        </Form.Field>
        <Form.Field name={['address', 'number']} label="Number">
          <TextInput />
        </Form.Field>
        <Form.List name="contacts">
          {(fields, { addItem, removeItem }) => (
            <div>
              {fields.map((field, index) => {
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Field
                      name={[index, 'mobile']}
                      label="Mobile"
                      rules={[{ required: true, message: 'Required Field' }]}
                    >
                      <TextInput />
                    </Form.Field>

                    <Button onClick={() => removeItem(field.key)}>Remove</Button>
                  </div>
                );
              })}
              <Button onClick={() => addItem()}>Add Item</Button>
            </div>
          )}
        </Form.List>
        <Button onClick={() => form.submit()}>Enviar</Button>
      </Form>
    </div>
  );
}

export default TestView;

```
