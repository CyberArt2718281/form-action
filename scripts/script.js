window.onload = function () {
    const main = document.querySelector('main');
    const form = document.getElementById('form');
    const fullName = document.getElementById('full-name');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeat-password');
    const checkbox = document.getElementById('checkbox');
    const button = document.getElementById('btn');
    const login = document.getElementById('login');
    const mainTitle = document.getElementById('main-title');
    const arrayInput = document.querySelectorAll('input');
    const labelCheckbox = document.getElementById('label-checkbox');
    const labelFullName = document.getElementById('label-full-name');
    const labelEmail = document.getElementById('label-email');
    const labelRepeatPassword = document.getElementById('label-repeat');
    const labelPassword =  document.getElementById('label-password');
    const buttonLogin = document.createElement('button');

    buttonLogin.classList.add('btn');
    buttonLogin.setAttribute('type', 'button');
    buttonLogin.textContent = 'Sign in';
    buttonLogin.style.display = 'none';
    form.appendChild(buttonLogin);

    password.setAttribute('type', 'password');
    repeatPassword.setAttribute('type', 'password');

    fullName.addEventListener('input', (e) => {
        fullName.value = fullName.value.replace(/[0-9]/g, '');
    });
    username.addEventListener('input', (e) => {
        username.value = username.value.replace(/[, .]/g, '');
    });
    password.addEventListener('change', (e) => {
        if (password.value.length < 8) {
            repeatPassword.setAttribute('disabled', 'disabled');
            alert('Пароль должен быть не меньше 8 символов');
        }
        else{
            repeatPassword.removeAttribute('disabled');
        }
    });

    repeatPassword.addEventListener('change', (e) => {
        if (password.value === repeatPassword.value) {
        } else {
            alert('Пароли не совпадают');
        }
    });

    let isAgreed = false;

    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            isAgreed = true;
            console.log('Согласен');
        } else {
            isAgreed = false;
            console.log('Не согласен');
        }
    });

    function clearForm(){
        arrayInput.forEach(input => {
            input.value = '';
        });
    }

    function createLogin(){
        clearForm();
        buttonLogin.style.display = 'block';
        mainTitle.textContent = 'Log in to the system';
        labelFullName.style.display = 'none';
        labelEmail.style.display = 'none';
        labelRepeatPassword.style.display = 'none';
        labelCheckbox.style.display = 'none';
        login.style.display = 'none';
        button.style.display = 'none';
        labelPassword.style.marginBottom = '40px';
    }

    function isUserInput(){
        if(username.value && password.value){
            alert(`Добро пожаловать ${username.value}`);
        }
        else{
            alert('Вы не ввели username или password');
        }
    }

    function buttonUserCreate(){
        if (fullName.value && username.value && email.value && password.value && repeatPassword.value && isAgreed) {
            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.style.display = 'flex';
            const popupTitle = document.createElement('span');
            popupTitle.classList.add('popup-title');
            popupTitle.textContent = 'Дорогой пользователь!';
            const popupDescription = document.createElement('p');
            popupDescription.classList.add('popup-description');
            popupDescription.textContent = 'На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию';
            const btnPopUp = document.createElement('button');
            btnPopUp.classList.add('popup-btn');
            btnPopUp.setAttribute('type', 'button');
            btnPopUp.textContent = 'ОК';

            popup.append(popupTitle, popupDescription, btnPopUp);
            main.appendChild(popup);

            login.removeEventListener('click', loginClick);

            btnPopUp.addEventListener('click', (e) => {
                popup.style.display = 'none';
                clearForm();
                createLogin();
                buttonLogin.addEventListener('click', (e) => {
                    isUserInput();
                    clearForm();
                });
            });

        } else {
            if (fullName.value === '') {
                alert('Введите ФИО');
            } else if (username.value === '') {
                alert('Введите username');
            } else if (email.value === '') {
                alert('Введите E-mail');
            } else if (password.value === '') {
                alert('Введите Password');
            } else if (repeatPassword.value === '') {
                alert('Введите Repeat password');
            } else if (!isAgreed) {
                alert('Заполните чек бокс');
            }
        }
    }

    function loginClick(e) {
        createLogin();
        buttonLogin.addEventListener('click', (e) => {
            isUserInput();
            clearForm();
        });
    }

    button.addEventListener('click', (e) => {
        buttonUserCreate();
    });

    login.addEventListener('click', loginClickHandler);
}