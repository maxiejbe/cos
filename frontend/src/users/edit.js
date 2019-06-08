import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  maxLength,
  required,
  RadioButtonGroupInput
} from 'admin-on-rest';

import {passwordValidation} from '../common/validators';

const UserTitle = ({ record }) => {
  return (
    <span>Usuario {record ? `"${record.email}"` : ''}</span>
  );
};

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm redirect="list">
        <TextInput source="email" validate={[required, maxLength(20)]} />
        <TextInput source="name" validate={[required, maxLength(40)]} />
        <TextInput source="password" label="resources.users.fields.newPassword" type="password" validate={[maxLength(40), passwordValidation]} />
        <RadioButtonGroupInput source="role" choices={[
            { id: 'admin', name: 'Administrador' },
            { id: 'client', name: 'Cliente' }
        ]} />
        
    </SimpleForm>
  </Edit>
);
