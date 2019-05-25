import React from 'react';
import { Edit, DisabledInput, ReferenceInput, SelectInput, SimpleForm, BooleanInput, TextInput, translate, maxLength, required } from 'admin-on-rest';

const CategoryTitle = ({ record }) => {
    return <span>Categoría {record ? `"${record.name}"` : ''}</span>;
};

export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm redirect="list"> 
            <DisabledInput source="id" />
            <TextInput source="name" validate={[ required, maxLength(100) ]} />
            <ReferenceInput label="resources.categories.fields.parent.name" source="parent.id" reference="categories" allowEmpty validation={{ required: true }} sort={{ field: 'name', order: 'ASC' }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <BooleanInput source="featured" />                
        </SimpleForm>
    </Edit>
);
