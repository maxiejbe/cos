import React from 'react';
import RichTextInput from 'aor-rich-text-input';
import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  BooleanInput,
  NumberInput,
  TextInput,
  TabbedForm,
  FormTab,
  ImageField,
  ImageInput,
  FileInput,
  FileField,
  translate,
  maxLength,
  required
} from 'admin-on-rest';

export const ProductCreate = props => (
  <Create {...props}>
    <TabbedForm redirect="list">
      <FormTab label="resources.products.tabs.general">
        <TextInput source="code" validate={[required, maxLength(10)]} />
        <TextInput source="name" validate={[required, maxLength(100)]} />
        <ReferenceInput
          label="resources.products.fields.category"
          source="category"
          reference="categories"
          allowEmpty
          validate={[required]}
          perPage={100}
          sort={{ field: 'name', order: 'ASC' }}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <BooleanInput source="enabled" defaultValue={true} />
        <BooleanInput source="featured" />
        <NumberInput source="price" />
        <NumberInput source="quantityPerPackage" />
        <RichTextInput source="description" />
      </FormTab>
      <FormTab label="resources.products.tabs.manual">
        <FileInput
          source="manual"
          label=""
          accept="application/pdf"
          placeholder={<p>Click aquí o arrastre y suelte el manual (PDF)</p>}
        >
          <FileField source="src" title="title" />
        </FileInput>
      </FormTab>
      <FormTab label="resources.products.tabs.images">
        <ImageInput
          multiple
          source="images"
          label=""
          accept="image/*"
          placeholder={<p>Click aquí o arrastre y suelte las imágenes</p>}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </FormTab>
      <FormTab label="resources.products.tabs.hdImages">
        <ImageInput
          multiple
          source="hdImages"
          label=""
          accept="image/*"
          placeholder={<p>Click aquí o arrastre y suelte las imágenes</p>}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </FormTab>
      <FormTab label="resources.products.tabs.catalogImages">
        <ImageInput
          multiple
          source="catalogImages"
          label=""
          accept="image/*"
          placeholder={<p>Click aquí o arrastre y suelte las imágenes</p>}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </FormTab>
    </TabbedForm>
  </Create>
);
