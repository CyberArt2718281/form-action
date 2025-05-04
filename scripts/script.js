window.onload = function () {  // функция выполняет код внутри когда страница полностью загружена
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
    form.appendChild(buttonLogin); //добавление элемента в блок формы

    password.setAttribute('type', 'password'); //добавление атрибута
    repeatPassword.setAttribute('type', 'password'); //добавление атрибута

    fullName.addEventListener('input', (e) => {
        fullName.value = fullName.value.replace(/[0-9]/g, '');
    }); // отслеживание чтобы пользователь не вводил цифры в поле имя
    username.addEventListener('input', (e) => {
        username.value = username.value.replace(/[, .]/g, '');
    }); // отслеживание чтобы пользователь не вводил запятые и точки в поле username
    password.addEventListener('change', (e) => {
        if (password.value.length < 8) {
            repeatPassword.setAttribute('disabled', 'disabled'); // поле повторить пароль будет задизейблено
            alert('Пароль должен быть не меньше 8 символов');
        }  // если пароль меньше 8 символов вывод alert с сообщением и
        else{
            repeatPassword.removeAttribute('disabled'); // удление атрибута disabled
        }
    });

    repeatPassword.addEventListener('change', (e) => {
        if (password.value === repeatPassword.value) {
        } else {
            alert('Пароли не совпадают'); // вывод сообщения если пароли не совпадают
        }
    });

    let isAgreed = false;

    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            isAgreed = true;
            console.log('Согласен');
        } else {
            isAgreed = false;
            console.log('Не согласен'); // вывод сообщения
        }
    }); // проверка чекбокса

    function clearForm(){
        arrayInput.forEach(input => {
            input.value = '';
        });
    } // функция очистки формы

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
    } // функция создания фомы

    function isUserInput(){
        if(username.value && password.value){
            alert(`Добро пожаловать ${username.value}`);
        }
        else{
            alert('Вы не ввели username или password');
        }
    } // простенькая функция на проверку введен ли пароль и имя

    function buttonUserCreate(){
        if (fullName.value && username.value && email.value && password.value && repeatPassword.value && isAgreed) { // если все поля введены создасться модальное окно с текстом
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

            login.removeEventListener('click', loginClick); // удаление обработчика клика с функцией loginclick

            btnPopUp.addEventListener('click', (e) => { // назначение обработчика события клика на элемент кнопки
                popup.style.display = 'none';
                clearForm();
                createLogin();
                buttonLogin.addEventListener('click', (e) => {
                    isUserInput();
                    clearForm();
                });
            });

        } else { // проверка на наличие значения в поле
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

    function loginClick() { // функция создания формы входа
        createLogin(); // функция содания формы
        buttonLogin.addEventListener('click', (e) => { // навешивание события на кнопку формы входа
            isUserInput(); // проверка на пароль
            clearForm(); // удаление формы
        });
    }

    button.addEventListener('click', (e) => {
        buttonUserCreate(); //  функция регистрации пользователя
    });

    login.addEventListener('click', loginClick); // переключение на форму входа
    console.log('final');
}