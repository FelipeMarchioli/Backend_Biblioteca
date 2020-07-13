class BaseValidator {
    isValidEmail (email) {
        let error = 'Email inválido'
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        if (reg.test(email)) {
        error = ''
        }
        return { error }
    }
}

module.exports = new BaseValidator()