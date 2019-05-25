import React from 'react';
import { List, Filter, Datagrid, ReferenceInput, BooleanInput, SelectInput, DeleteButton, EditButton, BooleanField, TextInput, TextField, NumberField, translate } from 'admin-on-rest';
import Chip from 'material-ui/Chip';

const IngredientsTitle = () => {
    return <span>Listado de Principios activos</span>;
};

const IngredientsFilter = ({ ...props }) => (
    <Filter {...props}>
        <TextInput label="resources.ingredients.fields.code" source="code" alwaysOn />
        <TextInput label="resources.ingredients.fields.name" source="name" alwaysOn />
    </Filter>
);

export const IngredientsList = (props) => (
    <List filters={<IngredientsFilter />} title={<IngredientsTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <NumberField source="id" label="resources.ingredients.fields.id" />
            <TextField source="code" label="resources.ingredients.fields.code" />
            <TextField source="name" label="resources.ingredients.fields.name" />
            <TextField source="description" label="resources.ingredients.fields.description" />
            <EditButton />
            <DeleteButton /> 
        </Datagrid>
    </List>
);