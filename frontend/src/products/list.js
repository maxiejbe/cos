import React from 'react';
import { List, Filter, Datagrid, ReferenceInput, BooleanInput, SelectInput, DeleteButton, EditButton, BooleanField, TextInput, TextField, NumberField, translate } from 'admin-on-rest';
import Chip from 'material-ui/Chip';

const ProductsTitle = () => {
    return <span>Listado de Productos</span>;
};

const ProductsFilter = ({ ...props }) => (
    <Filter {...props}>
        <ReferenceInput label="resources.products.fields.ingredient" source="ingredient" reference="ingredients" allowEmpty sort={{ field: 'code', order: 'ASC' }}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput label="resources.products.fields.code" source="code" alwaysOn />
        <TextInput label="resources.products.fields.name" source="name" alwaysOn />
    </Filter>
);

export const ProductsList = (props) => (
    <List filters={<ProductsFilter />} title={<ProductsTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="code" label="resources.products.fields.code" />
            <TextField source="name" label="resources.products.fields.name" />
            <TextField source="description" label="resources.products.fields.description" />
            <TextField source="ingredient.name" label="resources.products.fields.ingredient" />
            <TextField source="image" label="resources.products.fields.image" />
            <NumberField source="size" label="resources.products.fields.size" />        
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);