import React from 'react';
import { List, Filter, Datagrid, ReferenceInput, BooleanInput, SelectInput, EditButton, BooleanField, TextInput, TextField, NumberField, translate } from 'admin-on-rest';
import Chip from 'material-ui/Chip';

const ProductsTitle = () => {
    return <span>Listado de Productos</span>;
};

const ProductsFilter = ({ ...props }) => (
    <Filter {...props}>
        <ReferenceInput label="resources.products.fields.category" source="category" reference="categories" allowEmpty sort={{ field: 'name', order: 'ASC' }}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput label="resources.products.fields.name" source="name" alwaysOn />
        <TextInput label="resources.products.fields.code" source="code" alwaysOn />
    </Filter>
);

export const ProductsList = (props) => (
    <List filters={<ProductsFilter />} title={<ProductsTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <NumberField source="id" label="resources.products.fields.id" />
            <TextField source="code" label="resources.products.fields.code" />
            <BooleanField source="enabled" label="resources.products.fields.enabled" />
            <TextField source="name" label="resources.products.fields.name" />
            <TextField source="category.name" label="resources.products.fields.category" />
            <NumberField source="price" label="resources.products.fields.price" />
            <EditButton />
        </Datagrid>
    </List>
);