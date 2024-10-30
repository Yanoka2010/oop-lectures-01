// паттерны

// ne luchi
// class Registration {
//     constructor(props) {
//         this.options = {...props};
//     }

//     // email, pass, username
//     validateEmail() {
//         const check = {};
//         if (!this.options.email.includes('@')) {
//             check.sobaka = 'net sobaki';
//         }
//         if (!this.options.email.includes('.')) {
//             check.domain = 'net domena';
//         }
//         return check;
//     }
// }

// const vanechka = new Registration ({email: 'vanya@2005.ru'})
// console.log(vanechka.validateEmail())

// variant luche
class Registration {
    static default = {
        hasAt: true,
        hasDot: true,
    }

    constructor(props = {}) {
        this.props = {...this.constructor.default, ...props};
    }

    validateEmail(email = '', props = {}) {
        const {hasAt, hasDot} = {...this.props, ...props};
        const check = {};
        //console.log(hasDot)
        if (email.includes('@') !== hasAt) {
            check.hasAt = `should be ${hasAt}`;
        }

        if (email.includes('.') !== hasDot) {
            check.hasAt = `should be ${hasDot}`;
        }
        
        return check;
    }
}

const validator1 = new Registration();
console.log(validator1.validateEmail('vanya@2005.ru'));

const validator2 = new Registration({hasAt: false});
console.log(validator2.validateEmail('vanya@2005.ru'));
//validator2.validateEmail('', {hasDot: null});

// object - конкретная регистрация + методы валтдации
// объект - набоор св-в валидации + методы валид по св-в люб реги 