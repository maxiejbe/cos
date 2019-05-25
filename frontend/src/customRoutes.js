import React from 'react';
import { Route } from 'react-router-dom';
import SignupForm from './signUpForm';

export default [
    <Route exact path="/signup" component={SignupForm} noLayout/>,
];
