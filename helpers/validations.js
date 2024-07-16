
class Validations {
    static username(username) {
        if (typeof username !== 'string') throw new Error('El nombre de usuario debe ser un string');
        if (username.length < 5) throw new Error('El nombre de usuario debe tener al menos 5 caracteres');
    }

    static password(password) {
        if (typeof password !== 'string') throw new Error('La contraseña debe ser un string');
        if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres');
    }
}

module.exports = { Validations };