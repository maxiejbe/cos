import { Notification, translate, userLogin as userLoginAction } from 'admin-on-rest';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import actions from 'redux-form/lib/actions';
const queryString = require('query-string');

const componentActions = {
    Login: 'Login',
    Register: 'Register',
    RecoverPassword: 'RecoverPassword',
    ResetPassword: 'ResetPassword'
}

let loginLabel = 'ACCEDER'; //translate('aor.auth.sign_in');
let registerLabel = 'REGISTRARSE'; //translate('resources.register.label');
let resetPasswordLabel = 'RESETEAR PASSWORD';
let sendCodeLabel = 'ENVIAR CÓDIGO'; //translate('aor.auth.sign_in');


const actionsParams = {
    [componentActions.Login]: {
        primaryLabel: loginLabel,
        secondaryLabel: registerLabel,
        thirdLabel: resetPasswordLabel,
        secondaryAction: componentActions.Register,
        thirdAction: componentActions.ResetPassword
    },
    [componentActions.Register]: {
        primaryLabel: registerLabel,
        secondaryLabel: loginLabel,
        thirdLabel: resetPasswordLabel,
        secondaryAction: componentActions.Login,
        thirdAction: componentActions.ResetPassword
    },
    [componentActions.ResetPassword]: {
        primaryLabel: sendCodeLabel,
        secondaryLabel: loginLabel,
        thirdLabel: registerLabel,
        secondaryAction: componentActions.Login,
        thirdAction: componentActions.Register
    },
}

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 300,
    },
    avatar: {
        margin: '1em',
        textAlign: 'center ',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        display: 'flex',
    },
    hint: {
        textAlign: 'center',
        marginTop: '1em',
        color: '#ccc',
    },
};

function getColorsFromTheme(theme) {
    if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
    const {
        palette: {
            primary1Color,
            accent1Color,
        },
      } = theme;
    return { primary1Color, accent1Color };
}

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>
    <TextField
        errorText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />;

/*
Custom routes are not working correctly with admin-on-rest
For now, general auth behavior is contained inside login:
Login, Register, Recover password
*/
class Login extends Component {
    componentDidMount() {
        let action = componentActions.Login;
        try{
            const parsedQuery = queryString.parse(this.props.location.search);
            const actionParam = parsedQuery.action;

            if (actionParam) {
                action = actionParam
            }
        }
        catch(err){
        };
        
        
        this.setState({action: action});
    }

    login = ({ email, password, name }) => {
        const { userLogin, location } = this.props;
        const selectedAction = this.state && this.state.action ? this.state.action : componentActions.Login;
        userLogin({ email, password, name, action: selectedAction }, location.state ? location.state.nextPathname : '/');
    }

    changeToAction = (action) => {
        this.setState({action: action});
    }

    render() {
        const { handleSubmit, submitting, theme, translate } = this.props;
        const muiTheme = getMuiTheme(theme);
        const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);

        let selectedAction = this.state && this.state.action ? actionsParams[this.state.action] : actionsParams[componentActions.Login];
        let primaryLabel = selectedAction.primaryLabel;
        let secondaryLabel = selectedAction.secondaryLabel;
        let thirdLabel = selectedAction.thirdLabel;
        
        let secondaryAction = selectedAction.secondaryAction;
        let thirdAction = selectedAction.thirdAction;
        
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{ ...styles.main, backgroundColor: primary1Color }}>
                    <Card style={styles.card}>
                        <div style={styles.avatar}>
                            <Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
                        </div>
                        <form onSubmit={handleSubmit(this.login)}>
                            <div style={styles.form}>
                                <p style={styles.hint}>Hint: demo / demo</p>
                                <div style={styles.input} >
                                    <Field
                                        name="email"
                                        component={renderInput}
                                        floatingLabelText={translate('resources.register.email')}
                                        type="email"
                                    />
                                </div>
                                
                                { this.state && this.state.action === componentActions.RecoverPassword &&                                
                                    <div style={styles.input}>
                                        <Field
                                            name="code"
                                            component={renderInput}
                                            floatingLabelText={translate('resources.recoverPassword.code')}
                                            type="password"
                                        />
                                    </div>
                                }

                                { (!this.state || this.state.action !== componentActions.ResetPassword) &&                                
                                    <div style={styles.input}>
                                        <Field
                                            name="password"
                                            component={renderInput}
                                            floatingLabelText={translate('aor.auth.password')}
                                            type="password"
                                        />
                                    </div>
                                }

                                { this.state && (this.state.action === componentActions.Register
                                    || this.state.action === componentActions.RecoverPassword) && 
                                    <div>
                                        
                                        <div style={styles.input}>
                                            <Field
                                                name="repeatpassword"
                                                component={renderInput}
                                                floatingLabelText={translate('resources.register.repeatpassword')}
                                                type="password"
                                            />
                                        </div>

                                        <div style={styles.input} >
                                            <Field
                                                name="name"
                                                component={renderInput}
                                                floatingLabelText={translate('resources.register.name')}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            <CardActions>
                                <RaisedButton type="submit" primary disabled={submitting} label={primaryLabel} fullWidth />
                            </CardActions>
                        </form>
                        
                        <RaisedButton onClick={() => this.changeToAction(secondaryAction)} disabled={submitting} label={secondaryLabel} fullWidth />
                            
                        <RaisedButton onClick={() => this.changeToAction(thirdAction)} disabled={submitting} label={thirdLabel} fullWidth />
                        

                    </Card>
                    <Notification />
                </div>
            </MuiThemeProvider>
        );
    }
}

Login.propTypes = {
    ...propTypes,
    authClient: PropTypes.func,
    previousRoute: PropTypes.string,
    theme: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

Login.defaultProps = {
    theme: {},
};

const enhance = compose(
    translate,
    reduxForm({
        form: 'signIn',
        validate: (values, props) => {
            const EMAIL_LENGTH = 20;
            const PASSWORD_LENGTH = 20;
            const NAME_LENGTH = 40;

            const errors = {};
            const { translate } = props;
            if (!values.email) errors.email = translate('aor.validation.required');
            if (values.email && values.email.length > EMAIL_LENGTH){
                errors.email = translate('resources.register.errors.emailLength');
            }
            let isValidPassword =  /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(values.password);
            if( ! isValidPassword) errors.password = translate('resources.register.errors.invalidPassword');


            if (!values.password) errors.password = translate('aor.validation.required');
            if (values.password && values.password.length > PASSWORD_LENGTH){
                errors.password = translate('resources.register.errors.passwordLength');
            }

            if (values.repeatpassword && (values.password !== values.repeatpassword)){
                errors.repeatpassword = translate('resources.register.errors.repeatpassword');
            } 
            
            if (!values.name) {
                errors.name = translate('aor.validation.required');
            }
            if (values.name && values.name.length > NAME_LENGTH){
                errors.name = translate('resources.register.errors.nameLength');
            }
            
            
            return errors;
        },
    }),
    connect(null, { userLogin: userLoginAction }),
);

export default enhance(Login);