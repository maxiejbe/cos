import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  RadioButtonGroupInput
} from 'admin-on-rest';

import {passwordValidation} from '../common/validators';

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
        <TextInput source="email" validate={[required, maxLength(20)]} />
        <TextInput source="name" validate={[required, maxLength(40)]} />
        <TextInput source="password" type="password" label="resources.users.fields.newPassword" validate={[required, maxLength(40), passwordValidation]} />
        <RadioButtonGroupInput source="role" choices={[
            { id: 'admin', name: 'admin' },
            { id: 'client', name: 'client' }
        ]} />
    </SimpleForm>
  </Create>
);
