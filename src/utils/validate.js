export const getValidate = (type) => {
    switch (type) {
        case "input":
        case "select":
        case "date":
            return validateEmpty;
        case "number":
            return validateNumber;
        case "phone":
            return validatePhone;
        case "email":
            return validateEmail;
        default:
            return validateEmpty;
    }
}

const validateEmpty = (rule, value, callback) => {
    if (value === '' || value == undefined || value == null) {
        if (rule.required) {
            return callback(new Error('不能为空'))
        }
    }
    callback()
}

const validateNumber = (rule, value, callback) => {
    let rex = /^\d+$/;
    if (value === '' || value == undefined || value == null) {
        if (rule.required) {
            return callback(new Error('不能为空'))
        }
    } else if (!rex.test(value)) {
        return callback(new Error('必须为数字'))
    }
    callback()
}

const validatePhone = (rule, value, callback) => {
    let rex = /^1[3456789]\d{9}$/;
    if (value === '' || value == undefined || value == null) {
        if (rule.required) {
            return callback(new Error('不能为空'))
        }
    } else if (!rex.test(value)) {
        return callback(new Error('输入手机号格式错误'))
    }
    callback()
}

const validateEmail = (rule, value, callback) => {
    let rex = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
    if (value === '' || value == undefined || value == null) {
        if (rule.required) {
            return callback(new Error('不能为空'))
        }
    } else if (!rex.test(value)) {
        return callback(new Error('输入邮箱格式错误'))
    }
    callback()
}