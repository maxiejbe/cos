import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';

const SignupForm = () => (
    <Card>
        <ViewTitle title="Register" />
        <CardText>             
            <div>This is the register page.</div>
        </CardText>
    </Card>
);

export default SignupForm;