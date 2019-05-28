import React from 'react';
import { List, Filter, Datagrid, DeleteButton, EditButton, TextInput, TextField } from 'admin-on-rest';

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
            <TextField source="code" label="resources.ingredients.fields.code" />
            <TextField source="name" label="resources.ingredients.fields.name" />
            <EditButton />
            <DeleteButton /> 
        </Datagrid>
    </List>
);