window.onload = function () {  // функция выполняет код внутри когда страница полностью загружена
    const main = document.querySelector('main');
    const form = document.getElementById('form');
    const fullName = document.getElementById('full-name');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');
    const checkbox = document.getElementById('checkbox');
    const login = document.getElementById('login');
    const mainTitle = document.getElementById('main-title');
    const arrayInput = document.querySelectorAll('input');
    const labelCheckbox = document.getElementById('label-checkbox');
    const labelFullName = document.getElementById('label-full-name');
    const labelEmail = document.getElementById('label-email');
    const labelRepeatPassword = document.getElementById('label-repeat');
    const labelPassword = document.getElementById('label-password');
    const footerForm = document.querySelector('#form');
    const registration = document.createElement('a');

    const userNameSignIn = document.querySelector('#usernameSignIn');
    const userPasswordSignIn = document.querySelector('#passwordSignIn');

    const USER_PAGE_KEY = 'userCurrentPage';
    const USER_SESSION_STORE_KEY = 'userSession';
    const correctElement = document.querySelectorAll('.correct');
    const uncorrectElement = document.querySelectorAll('.uncorrect');

    const buttonLogin = document.createElement('button');
    const buttonExit = document.createElement('button');
    const buttonSignUp = document.getElementById('btnSignIn');

    // переменные хранят текущее состояние страницы из localStorage и имя авторизированного из sessionStorage пользователя
    const currentPage = localStorage.getItem(USER_PAGE_KEY);
    const sessionPage = sessionStorage.getItem(USER_SESSION_STORE_KEY);

    // сохранение в localStorage страницы входа или выхода так же если пользователь уже авторизирован он будет при обновлении страницы автоматически переброшен в личный кабинет
    function getCurrentPage() {
        if (currentPage) {
            if(sessionPage){
                personalRoom(`${sessionPage}`);
                return;
            }
            if (currentPage === 'registration') {
                createRegister();
                return;
            }
            if (currentPage === 'login') {
                createLogin();
                return;
            }
        }
        return ;
    }
    // вызов функции при обновлении страницы
    getCurrentPage();

    // объект регулярок для валидации
    const validationObject = {
        fullName: /^[А-ЯЁA-Z][а-яёa-z]+$/,
        userName: /[!@#$%^&*()+=[\]{};':"\\|,.<>/?]/,
        email: /^\w+@mail\.(com|ru)$/,
        password: /^(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/g,
    }

    // значения состояний input
    let isValidateFullName = false;
    let isValidateUserName = false;
    let isValidateEmail = false;
    let isValidatePassword = false;
    let isValidateRepeatPassword = false;

    // значение состояния пароля для повтора пароль
    let correctPassword = false;
    // значение состояния checkbox
    let isAgreed = false;

    // обработчики input
    fullName.addEventListener('input', (e) => {
        const correctElement = document.querySelector('.correctName');
        const uncorrectElement = document.querySelector('.uncorrectName');
        let formatString = e.target.value.replace(/\s+/g, ' ').replace(/^\s/, '');
        fullName.value = formatString;
        if (formatString && formatString.length > 0) {

            if (validationObject.fullName.test(formatString)) {
                uncorrectElement.style.display = 'none';
                correctElement.style.display = 'block';
                isValidateFullName = true;
            } else {
                correctElement.style.display = 'none';
                uncorrectElement.style.display = 'block';
                isValidateFullName = false;
            }
        } else {
            correctElement.style.display = 'none';
            uncorrectElement.style.display = 'none';
        }
    });
    username.addEventListener('input', (e) => {
        const correctElement = document.querySelector('.correctUserName');
        const uncorrectElement = document.querySelector('.uncorrectUserName');
        let formatString = e.target.value.replace(/\s+/g, ' ').replace(/^\s/, '');
        username.value = formatString;
        if (formatString && formatString.length > 0) {
            if (validationObject.userName.global) {
                validationObject.userName.lastIndex = 0;
            }

            if (!validationObject.userName.test(formatString) && formatString.length > 1) {
                uncorrectElement.style.display = 'none';
                correctElement.style.display = 'block';
                isValidateUserName = true;
            } else {
                correctElement.style.display = 'none';
                uncorrectElement.style.display = 'block';
                isValidateUserName = false;
            }
        } else {
            correctElement.style.display = 'none';
            uncorrectElement.style.display = 'none';
        }
    });
    email.addEventListener('input', (e) => {
        const correctElement = document.querySelector('.correctEmail');
        const uncorrectElement = document.querySelector('.uncorrectEmail');
        let formatString = e.target.value.replace(/\s+/g, ' ').replace(/^\s/, '');
        email.value = formatString;
        if (formatString && formatString.length > 0) {
            if (validationObject.email.global) {
                validationObject.email.lastIndex = 0;
            }

            if (validationObject.email.test(formatString)) {
                uncorrectElement.style.display = 'none';
                correctElement.style.display = 'block';
                isValidateEmail = true;
            } else {
                correctElement.style.display = 'none';
                uncorrectElement.style.display = 'block';
                isValidateEmail = false;
            }
        } else {
            correctElement.style.display = 'none';
            uncorrectElement.style.display = 'none';
        }
    });
    password.addEventListener('input', (e) => {
        const correctElement = document.querySelector('.correctPassword');
        const uncorrectElement = document.querySelector('.uncorrectPassword');
        const correctElementRepeat = document.querySelector('.correctRepeatPassword');
        const uncorrectElementRepeat = document.querySelector('.uncorrectRepeatPassword');

        let formatString = e.target.value.replace(/\s/g, '');
        password.value = formatString;

        if (formatString && formatString.length > 0) {
            if (validationObject.password.global) {
                validationObject.password.lastIndex = 0;
            }

            if (validationObject.password.test(formatString)) {
                uncorrectElement.style.display = 'none';
                correctElement.style.display = 'block';
                isValidatePassword = true;
                correctPassword = true;
                if (password.value === repeatPassword.value && repeatPassword.value.length > 1) {
                    correctElementRepeat.style.display = 'block';

                } else {
                    uncorrectElementRepeat.style.display = 'none';
                    correctElementRepeat.style.display = 'none';
                    repeatPassword.value = '';
                }
            } else {
                correctElement.style.display = 'none';
                uncorrectElement.style.display = 'block';
                isValidatePassword = false;
                correctPassword = false;
                repeatPassword.value = '';
                uncorrectElementRepeat.style.display = 'none';
                if (password.value === repeatPassword.value && repeatPassword.value.length > 1) {
                    uncorrectElementRepeat.style.display = 'block';
                } else {
                    correctElementRepeat.style.display = 'none';
                }
            }

        } else {
            correctElement.style.display = 'none';
            uncorrectElement.style.display = 'none';
            repeatPassword.value = '';
        }
        if(password.value === '') {
            correctElementRepeat.style.display = 'none';
            uncorrectElementRepeat.style.display = 'none';
            repeatPassword.value = '';
        }
    });
    repeatPassword.addEventListener('input', (e) => {
        const correctElement = document.querySelector('.correctRepeatPassword');
        const uncorrectElement = document.querySelector('.uncorrectRepeatPassword');
        let formatString = e.target.value.replace(/\s/g, '');
        repeatPassword.value = formatString;
        if (password.value.length !== 0 && repeatPassword.value.length > 0) {
            if (formatString && (formatString === password.value) && correctPassword) {
                uncorrectElement.style.display = 'none';
                correctElement.style.display = 'block';
                isValidateRepeatPassword = true;
            } else {
                correctElement.style.display = 'none';
                uncorrectElement.style.display = 'block';
                isValidateRepeatPassword = false;
            }
        } else {
            uncorrectElement.style.display = 'none';
            correctElement.style.display = 'none';
            repeatPassword.value = '';
        }

    });
    // обработчик input-checkbox
    checkbox.addEventListener('change', (e) => {
        isAgreed = e.target.checked;
    });

    ///////////////////////////////////
    // обработчик кнопки регистрации
    buttonSignUp.addEventListener('click', () => {
        if (isValidateFullName && isValidateUserName && isValidateEmail && isValidatePassword && isValidateRepeatPassword && correctPassword && isAgreed) {
            if (localStorage.getItem(username.value)) {
                const store = JSON.parse(localStorage.getItem(username.value));
                if (store.password === password.value) {
                    sessionStorage.setItem(USER_SESSION_STORE_KEY, `${fullName.value}`);
                    personalRoom(store.fullName);
                }else{
                    let userName = username.value;
                    createLogin(userName);
                    changedUserData();
                }
            } else {
                sessionStorage.setItem(USER_SESSION_STORE_KEY, `${fullName.value}`);
                setLocalStorageUser(username.value);
                createPopup(fullName.value);
            }
        }
    });
    // обработчик кнопки входа
    buttonLogin.addEventListener('click', () => {
        changedUserData();
    });
    // обработчик кнопки выхода из лк
    buttonExit.addEventListener('click',
        fromRoomToRegister
    )

    // функция личного кабинета
    function personalRoom(name) {
        form.style.display = 'none';
        document.querySelector('.main-description').style.display = 'none';
        document.querySelector('.main-img').style.display = 'none';
        mainTitle.textContent = `Welcome, ${name}`;
        buttonExit.classList.add('btn');
        buttonExit.style.display = 'block';
        buttonExit.textContent = 'Exit';
        buttonExit.type = 'button';
        document.querySelector('.main-text-form').appendChild(buttonExit);
    }

    //////////////////////////////////////

    // функция для очистки полей input
    function clearForm() {
        arrayInput.forEach(input => {
            input.value = '';
        });
        checkbox.checked = false;
    }

    // функция для добавления в localStorage
    function setLocalStorageUser(username) {
        const USER_KEY_STORE = `${username}`;
        localStorage.setItem(USER_KEY_STORE, JSON.stringify({
            fullName: fullName.value,
            userName: username,
            email: email.value,
            password: password.value,
        }));
    }


    /////////////////////////////////
    // функции для создания страницы регистрации и входа
    function createLogin(userNameInputValue='') {
        clearForm();
        const userName = userNameInputValue || '';
        localStorage.setItem(USER_PAGE_KEY, 'login');
        correctElement.forEach(item => item.style.display = 'none');
        uncorrectElement.forEach(item => item.style.display = 'none');
        buttonLogin.classList.add('btn');
        buttonLogin.setAttribute('type', 'button');
        buttonLogin.textContent = 'Sign in';
        buttonLogin.style.display = 'none';
        form.appendChild(buttonLogin); //добавление элемента в блок формы
        buttonLogin.style.display = 'block';
        mainTitle.textContent = 'Log in to the system';
        labelFullName.style.display = 'none';
        document.querySelector('#label-userName').style.display = 'none';
        document.querySelector('#label-userNameSignIn').style.display = 'block';
        userNameSignIn.value = userName;
        document.querySelector('#label-passwordSingIn').style.display = 'block';
        labelEmail.style.display = 'none';
        labelPassword.style.display = 'none';
        labelRepeatPassword.style.display = 'none';
        labelCheckbox.style.display = 'none';
        login.style.display = 'none';
        buttonSignUp.style.display = 'none';
        registration.textContent = 'Report for page register';
        registration.style.display = 'block';
        registration.classList.add('login-link');
        registration.href = '#'
        footerForm.appendChild(registration);
        labelPassword.style.marginBottom = '40px';
    }
    // функция создания страницы Регистрации
    function createRegister() {
        clearForm();
        localStorage.setItem(USER_PAGE_KEY, 'registration');
        document.querySelector('.uncorrectPassword').textContent = 'Password is uncorrect';
        correctElement.forEach(item => item.style.display = 'none');
        uncorrectElement.forEach(item => item.style.display = 'none');
        buttonLogin.style.display = 'block';
        mainTitle.textContent = 'Get your free account';
        labelFullName.style.display = 'block';
        document.querySelector('#label-userName').style.display = 'block';
        document.querySelector('#label-userNameSignIn').style.display = 'none';
        document.querySelector('#label-passwordSingIn').style.display = 'none';
        labelEmail.style.display = 'block';
        labelPassword.style.display = 'block';
        labelRepeatPassword.style.display = 'block';
        labelCheckbox.style.display = 'block';
        registration.style.display = 'none';
        buttonLogin.style.display = 'none';
        login.style.display = 'block';
        buttonSignUp.style.display = 'block';
        labelPassword.style.marginBottom = '40px';
    }
    // функция для выхода из личного кабинета на страницу регистрации
    function fromRoomToRegister() {
        form.style.display = 'flex';
        document.querySelector('.main-description').style.display = 'none';
        document.querySelector('.main-img').style.display = 'block';
        buttonExit.style.display = 'none';
        createRegister();
    }

    /////////////////////////

    // функция создания popup
    function createPopup(fullName) {
        clearForm();
        const popup = document.createElement('div'); // создание элемента div
        popup.classList.add('popup'); // добавление класса элементу popup
        popup.style.display = 'flex'; // добавление свойства display
        const popupTitle = document.createElement('span'); //создание элемента span
        popupTitle.classList.add('popup-title'); // добавление класса
        popupTitle.textContent = 'Дорогой пользователь!'; // добавление текста в элемент
        const popupDescription = document.createElement('p');// создание эенлмента
        popupDescription.classList.add('popup-description'); // добавление класса
        popupDescription.textContent = 'На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию'; // добавление текста в элементу
        const btnPopUp = document.createElement('button');
        btnPopUp.classList.add('popup-btn');
        btnPopUp.setAttribute('type', 'button'); // добавление атрибута с type=button
        btnPopUp.textContent = 'ОК';

        popup.append(popupTitle, popupDescription, btnPopUp); // добавление элементов в родительский элмент popup
        main.appendChild(popup); // добавление popup в элемент main

        login.removeEventListener('click', createLogin); // удаление обработчика клика с функцией loginclick
        // обработчик кнопки popup
        btnPopUp.addEventListener('click', () => { // назначение обработчика события клика на элемент кнопки
            popup.style.display = 'none';
            personalRoom(fullName);
        });
    }


    // функция для проверки пользователя из LocalStorage
    function changedUserData() {
        const invalidPassword = document.querySelector('.invalidPassword');
        const userNotFound = document.querySelector('.notFoundUserName');

        const store = JSON.parse(localStorage.getItem(userNameSignIn.value)) || '';
        if (store) {
            userNotFound.style.display = 'none';
            if (userPasswordSignIn.value) {
                if (store.password === userPasswordSignIn.value) {
                    const fullName = store.fullName.toString();
                    invalidPassword.style.display = 'none';
                    sessionStorage.setItem(USER_SESSION_STORE_KEY, `${store.fullName}`);
                    personalRoom(fullName);
                } else {
                    invalidPassword.textContent = 'Invalid Password';
                    invalidPassword.style.display = 'block';
                }
            } else {
                invalidPassword.textContent = 'please yor password';
                invalidPassword.style.display = 'block';
            }
        } else {
            userNotFound.style.display = 'block';
        }

    }


    // обработчики ссылок на страницы регистрации и входа
    registration.addEventListener('click', createRegister);
    login.addEventListener('click', ()=>createLogin('')); // переключение на форму входа
}