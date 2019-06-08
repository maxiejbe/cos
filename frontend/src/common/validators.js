import * as _ from 'lodash'

const validator = (rule, errorMessage) => value => {
  if (!rule(value)) {
    return errorMessage
  }
}

const pattern = (regex, errorMessage = 'Formato inválido') =>
  validator(value => _.isEmpty(value) || regex.test(value), errorMessage);

const passwordValidation = pattern(
    /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
    'Debe contener mayúsculas, minúsculas y números'
  )

export {
    passwordValidation
}