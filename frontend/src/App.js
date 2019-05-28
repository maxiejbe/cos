import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';

import Login from './login';
import customRoutes from './customRoutes';

import myApiRestClient from './common/restClient'
import authClient from './common/authClient';

import { IngredientsList, IngredientCreate, IngredientEdit } from './ingredients';
import IngredientIcon from 'material-ui/svg-icons/action/label';

import { ProductsList, ProductCreate, ProductEdit, ProductShow } from './products';
import ProductIcon from 'material-ui/svg-icons/action/shopping-cart';

import { FaqsList, FaqCreate, FaqEdit } from './faqs';
import FaqIcon from 'material-ui/svg-icons/action/question-answer';

import { ContactList, ContactCreate } from './contact';
import ContactIcon from 'material-ui/svg-icons/action/search';

import spanishMessages from 'aor-language-spanish';
import customSpanishMessages from './common/i18n/es';

const messages = {
    es: { ...spanishMessages, ...customSpanishMessages }
};

const ADMIN_ROLE = 'admin';
const CLIENT_ROLE = 'client';

const App = () => (
    <Admin loginPage={Login} authClient={authClient} restClient={myApiRestClient} customRoutes={customRoutes} title="Cos" locale="es" messages={messages}>
        {permissions => [
            <Resource name="products" 
                list={ProductsList} 
                create={permissions === ADMIN_ROLE ? ProductCreate : null}                 
                edit={permissions === ADMIN_ROLE ? ProductEdit : null} 
                show={ProductShow} 
                icon={ProductIcon} 
                remove={permissions === ADMIN_ROLE ? Delete : null} />,
            permissions === ADMIN_ROLE 
                ? <Resource name="ingredients" list={IngredientsList} create={IngredientCreate} edit={IngredientEdit} icon={IngredientIcon} remove={Delete} />
                : <Resource name="ingredients" />
            ,
            <Resource name="faqs" 
                list={FaqsList} 
                create={permissions === ADMIN_ROLE ? FaqCreate : null}                 
                edit={permissions === ADMIN_ROLE ? FaqEdit : null} 
                icon={FaqIcon} 
                remove={Delete} />
            ,
            <Resource name="contacts" 
                list={ContactList} 
                create={permissions === CLIENT_ROLE ? ContactCreate : null}                 
                icon={ContactIcon} />
        ]}
    </Admin>
);

export default App;