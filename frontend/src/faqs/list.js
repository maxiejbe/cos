import React from 'react';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest/lib/mui';
import { List, Filter, Datagrid, DeleteButton, EditButton, TextInput, TextField } from 'admin-on-rest';
const ADMIN_ROLE = 'admin';

const FaqsTitle = () => {
    return <span>Preguntas frecuentes</span>;
};

const FaqsFilter = ({ ...props }) => (
    <Filter {...props}>
        <TextInput label="resources.faqs.fields.question" source="question" alwaysOn />
    </Filter>
);

const headerStyle = {
    fontWeight: 'bold'
};

const cardStyle = {
    width: '100%',
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const FaqsGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
    {ids.map(id =>
        <Card key={id} style={cardStyle}>
            <CardHeader style={headerStyle}
                title={<TextField record={data[id]} source="question" />}
            />
            <CardText>
                <TextField record={data[id]} source="answer" />
            </CardText>
            {localStorage.getItem('role') === ADMIN_ROLE && <CardActions style={{ textAlign: 'right' }}>
                <EditButton resource="faqs" basePath={basePath} record={data[id]} />
                <DeleteButton resource="faqs" basePath={basePath} record={data[id]} />
            </CardActions>
            }
            
        </Card>
    )}
    </div>
);
FaqsGrid.defaultProps = {
    data: {},
    ids: [],
};
export const FaqsList = (props) => (
    <List filters={<FaqsFilter />} title={<FaqsTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>    
        <FaqsGrid />
    </List>
);