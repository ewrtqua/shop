const { createApp } = Vue

createApp({
    data() {
        return {
            message: 'Hello Vue!',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            fetch('http://studentsystem.xyz:8080/user', {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then((response) => {
                switch (response.status) {
                    case 403:
                        alert('Такой пользователь уже существует')
                        break;
                    case 400:
                        alert('Не верные данные')
                        break;
                }
                return response.json();
            }).then((data) => {
                alert('Вы успешно зарегистрировались')
                // location.href='/'
            }).catch((err) => {
                console.error("Невозможно отправить запрос", err);
            });
        }, login() {
            fetch('http://studentsystem.xyz:8080/user/auth', {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then((response) => {
                switch (response.status) {
                    case 403:
                        alert('Не верный логин или пароль')
                        break;
                    case 400:
                        alert('Не верные данные')
                        break;
                }
                return response.json();
            }).then((data) => {
                if (data['access_token']) {
                    alert('Вы успешно вошли')

                    // location.href='/'
                }
            }).catch((err) => {
                console.error("Невозможно отправить запрос", err);
            });
        }
    },


}).mount('#app')

