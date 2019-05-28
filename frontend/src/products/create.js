import React from 'react';
import RichTextInput from 'aor-rich-text-input';
import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  NumberInput,
  TextInput,
  ImageField,
  ImageInput,
  maxLength,
  required
} from 'admin-on-rest';

export const ProductCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list">
        <TextInput source="code" validate={[required, maxLength(6)]} />
        <TextInput source="name" validate={[required, maxLength(20)]} />
        <RichTextInput source="description" validate={[maxLength(100)]} />
        
        <ReferenceInput
          label="resources.products.fields.ingredient"
          source="ingredient.id"
          reference="ingredients"
          allowEmpty
          validate={[required]}
          perPage={100}
          sort={{ field: 'name', order: 'ASC' }}>
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="size" validate={[required]} />
        <ImageInput
          source="image"
          label=""
          accept="image/*"
          placeholder={<p>Click aquí o arrastre y suelte la imágen</p>}
        >
          <ImageField source="src" title="title" />
        </ImageInput>

    </SimpleForm>
  </Create>
);
