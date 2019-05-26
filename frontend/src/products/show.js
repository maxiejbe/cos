import React from 'react';
import RichTextInput from 'aor-rich-text-input';
import {
  TextField,
  NumberField,
  Show,
  SimpleShowLayout,
  RichTextField,
  ImageField
} from 'admin-on-rest';

const ProductTitle = ({ record }) => {
  return (
    <span>Producto {record ? `"${record.code + ' ' + record.name}"` : ''}</span>
  );
};

export const ProductShow = props => (
  <Show title={<ProductTitle />} {...props}>
       <SimpleShowLayout>
          <TextField source="code" label="resources.products.fields.code" />
          <TextField source="name" label="resources.products.fields.name" />
          <RichTextField source="description" label="resources.products.fields.description" />
          <TextField source="ingredient.name" label="resources.products.fields.ingredient" />
          <TextField source="size" label="resources.products.fields.size" />
          <ImageField source="singleImage" label="resources.products.fields.image" />
             
       </SimpleShowLayout>
  </Show>
);
