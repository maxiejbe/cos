import React from 'react';
import { List, Filter, Datagrid, ReferenceInput, BooleanInput, SelectInput, EditButton, BooleanField, TextInput, TextField, NumberField, translate } from 'admin-on-rest';
import Chip from 'material-ui/Chip';

const CategoriesTitle = () => {
    return <span>Listado de Categorías</span>;
};

// const QuickFilter = translate(({ label, translate }) => <Chip style={{ marginBottom: 8 }}>{translate(label)}</Chip>);

const CategoriesFilter = ({ ...props }) => (
    <Filter {...props}>
        <ReferenceInput label="resources.categories.fields.parent.name" source="parent" reference="categories" allowEmpty sort={{ field: 'name', order: 'ASC' }}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <BooleanInput label="resources.categories.fields.featured" source="featured" />  
        <TextInput label="resources.categories.fields.name" source="name" alwaysOn />
    </Filter>
);

export const CategoriesList = (props) => (
    <List filters={<CategoriesFilter />} title={<CategoriesTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <NumberField source="id" label="resources.categories.fields.id" />
            <TextField source="name" label="resources.categories.fields.name" />
            <TextField source="parent.name" label="resources.categories.fields.parent.name" />
            <BooleanField source="featured" label="resources.categories.fields.featured" />            
            <EditButton />
        </Datagrid>
    </List>
);