document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на основные элементы
    const startRegistrationButton = document.getElementById('start-registration');
    const initialFrame = document.getElementById('initial-frame');
    const registrationFrameContainer = document.getElementById('registration-frame-container');
    const progressIndicator = document.getElementById('registration-progress');

    // Секции шагов
    const frame1 = document.getElementById('frame_1');
    const frame2 = document.getElementById('frame_2');
    const frame3 = document.getElementById('frame_3');
    const finalFrame = document.getElementById('final-frame');

    // Элементы Шага 1
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const countrySelect = document.getElementById('country');
    const nextStep1Button = document.getElementById('next-step1');
    const cancelStep1Button = document.getElementById('cancel-step1');

    // Элементы Шага 2
    const phoneNumberInput = document.getElementById('phoneNumber');
    const sendCodeButton = document.getElementById('send-code');
    const verificationCodeSection = document.getElementById('verification-code-section');
    const verificationCodeInput = document.getElementById('verificationCode');
    const checkCodeButton = document.getElementById('check-code');
    const nextStep2Button = document.getElementById('next-step2');
    const backStep2Button = document.getElementById('back-step2');

    // Элементы Шага 3
    const cardPartInputs = document.querySelectorAll('.card-part');
    const cardNameInput = document.getElementById('cardName');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const finishRegistrationButton = document.getElementById('finish-registration');
    const backStep3Button = document.getElementById('back-step3');

    // Элементы Финала
    const resetRegistrationButton = document.getElementById('reset-registration');

    let currentStep = 0; // 0: начальная страница, 1: Шаг 1, 2: Шаг 2, 3: Шаг 3, 4: Финал

    // --- Вспомогательные функции ---

    // Функция для переключения видимости секций
    function showStep(stepNumber) {
        // Скрываем все секции шагов
        document.querySelectorAll('.registration-step').forEach(section => {
            section.style.display = 'none';
        });

        // Показываем нужную секцию
        switch (stepNumber) {
            case 0:
                initialFrame.style.display = 'block';
                break;
            case 1:
                frame1.style.display = 'block';
                break;
            case 2:
                frame2.style.display = 'block';
                break;
            case 3:
                frame3.style.display = 'block';
                break;
            case 4:
                finalFrame.style.display = 'block';
                break;
        }
        currentStep = stepNumber;
        updateProgressBar(stepNumber);
    }

    // Функция для обновления индикатора прогресса
    function updateProgressBar(step) {
        let percentage = 0;
        if (step === 1) percentage = 0; // Начало 1 шага - 0%
        else if (step === 2) percentage = 33; // Начало 2 шага - 33%
        else if (step === 3) percentage = 66; // Начало 3 шага - 66%
        else if (step === 4) percentage = 100; // Финал - 100%
        progressIndicator.style.width = percentage + '%';
        progressIndicator.style.opacity = (step === 0) ? '0' : '1'; // Скрываем на начальной странице
    }

    // --- Логика Шага 1: Персональные данные ---
    function checkStep1Validity() {
        const isFirstNameValid = firstNameInput.value.trim() !== '';
        const isLastNameValid = lastNameInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && emailInput.checkValidity(); // checkValidity() для проверки формата email
        const isPasswordValid = passwordInput.value.length >= 6; // Минимум 6 символов для пароля
        const doPasswordsMatch = passwordInput.value === confirmPasswordInput.value && passwordInput.value.trim() !== '';
        const isCountrySelected = countrySelect.value !== ''; // Проверяем, что страна выбрана

        // Кнопка "Далее" активируется, если все поля заполнены и пароли совпадают
        if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && doPasswordsMatch && isCountrySelected) {
            nextStep1Button.disabled = false;
        } else {
            nextStep1Button.disabled = true;
        }
    }

    // Динамическое заполнение списка стран
    function populateCountries() {
        const countries = [
            'Выберите страну', // Опция по умолчанию
            'Молдова', 'Румыния', 'Украина', 'Россия', 'США', 'Канада',
            'Германия', 'Франция', 'Великобритания', 'Италия', 'Испания',
            'Китай', 'Япония', 'Австралия', 'Бразилия'
        ];
        countries.forEach((country, index) => {
            const option = document.createElement('option');
            option.value = (index === 0) ? '' : country; // Пустое значение для "Выберите страну"
            option.textContent = country;
            if (index === 0) option.selected = true; // Сделать выбранной по умолчанию
            countrySelect.appendChild(option);
        });
    }

    // --- Логика Шага 2: Телефонный номер ---
    function checkPhoneNumberValidity() {
        // Простая валидация: не пусто и содержит хотя бы 7 цифр
        return phoneNumberInput.value.trim().length >= 7 && /^\+?[0-9\s-()]+$/.test(phoneNumberInput.value);
    }

    function checkVerificationCodeValidity() {
        // Простая валидация: 4 цифры
        return verificationCodeInput.value.length === 4 && /^[0-9]{4}$/.test(verificationCodeInput.value);
    }

    // --- Логика Шага 3: Метод оплаты ---
    function checkPaymentFormValidity() {
        const isCardNumberComplete = Array.from(cardPartInputs).every(input => input.value.length === 4);
        const isCardNameValid = cardNameInput.value.trim() !== '';
        const isExpiryDateValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDateInput.value); // MM/YY формат
        const isCvvValid = cvvInput.value.length === 3 && /^[0-9]{3}$/.test(cvvInput.value);

        if (isCardNumberComplete && isCardNameValid && isExpiryDateValid && isCvvValid) {
            finishRegistrationButton.disabled = false;
        } else {
            finishRegistrationButton.disabled = true;
        }
    }

    // --- Обработчики событий ---

    // Начать регистрацию
    startRegistrationButton.addEventListener('click', () => {
        initialFrame.style.display = 'none'; // Скрываем начальную страницу
        showStep(1); // Показываем первый шаг
    });

    // Валидация Шага 1 при вводе
    [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', checkStep1Validity);
    });
    countrySelect.addEventListener('change', checkStep1Validity);

    // Кнопка "Далее" на Шаге 1
    nextStep1Button.addEventListener('click', () => {
        if (!nextStep1Button.disabled) { // Проверяем, что кнопка не заблокирована
            showStep(2); // Переходим ко второму шагу
            // Дополнительно: можно сбросить состояние полей Шага 2, если они были ранее заполнены
            phoneNumberInput.value = '';
            verificationCodeInput.value = '';
            verificationCodeSection.style.display = 'none';
            sendCodeButton.disabled = false; // Разблокировать кнопку "Отправить"
            nextStep2Button.disabled = true; // Заблокировать кнопку "Далее" на шаге 2
        }
    });

    // Кнопка "Отмена" на Шаге 1
    cancelStep1Button.addEventListener('click', () => {
        showStep(0); // Возвращаемся к начальной странице
        // Сбрасываем поля формы Шага 1
        document.getElementById('personal-data-form').reset();
        checkStep1Validity(); // Обновить состояние кнопки "Далее"
    });

    // Логика Шага 2: Отправка кода
    sendCodeButton.addEventListener('click', () => {
        if (checkPhoneNumberValidity()) {
            alert('Код подтверждения отправлен (на самом деле нет 😉). Введите 4 цифры.');
            verificationCodeSection.style.display = 'block'; // Показываем поле для кода
            sendCodeButton.disabled = true; // Блокируем кнопку "Отправить"
            verificationCodeInput.value = ''; // Очищаем поле для кода
            nextStep2Button.disabled = true; // Снова блокируем "Далее"
        } else {
            alert('Пожалуйста, введите корректный номер телефона.');
        }
    });

    // Логика Шага 2: Проверка кода
    checkCodeButton.addEventListener('click', () => {
        if (checkVerificationCodeValidity()) {
            alert('Код проверен! Можете переходить далее.');
            nextStep2Button.disabled = false; // Активируем кнопку "Далее"
        } else {
            alert('Пожалуйста, введите корректный 4-значный код.');
        }
    });

    // Кнопка "Далее" на Шаге 2
    nextStep2Button.addEventListener('click', () => {
        if (!nextStep2Button.disabled) {
            showStep(3); // Переходим к третьему шагу
            // Сбросить поля формы Шага 3, если нужно
            document.getElementById('payment-form').reset();
            finishRegistrationButton.disabled = true; // Заблокировать кнопку "Завершить" на шаге 3
            cardPartInputs.forEach(input => input.value = ''); // Очистить поля карты
        }
    });

    // Кнопка "Назад" на Шаге 2
    backStep2Button.addEventListener('click', () => {
        showStep(1); // Возвращаемся к первому шагу
    });

    // Логика Шага 3: Автоматический переход фокуса для номера карты
    cardPartInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 4) {
                if (index < cardPartInputs.length - 1) {
                    cardPartInputs[index + 1].focus();
                }
            }
            checkPaymentFormValidity(); // Проверить валидность формы оплаты при вводе
        });

        // Обработка Backspace для перехода назад
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0) {
                if (index > 0) {
                    cardPartInputs[index - 1].focus();
                }
            }
        });
    });

    // Валидация Шага 3 при вводе
    [cardNameInput, expiryDateInput, cvvInput].forEach(input => {
        input.addEventListener('input', checkPaymentFormValidity);
    });

    // Кнопка "Завершить" на Шаге 3
    finishRegistrationButton.addEventListener('click', () => {
        if (!finishRegistrationButton.disabled) {
            showStep(4); // Переходим к финальной секции
        }
    });

    // Кнопка "Назад" на Шаге 3
    backStep3Button.addEventListener('click', () => {
        showStep(2); // Возвращаемся ко второму шагу
    });

    // Кнопка "Начать заново" на финальной странице
    resetRegistrationButton.addEventListener('click', () => {
        // Сбросить все формы и вернуться к начальной странице
        document.getElementById('personal-data-form').reset();
        document.getElementById('payment-form').reset();
        phoneNumberInput.value = '';
        verificationCodeInput.value = '';
        verificationCodeSection.style.display = 'none'; // Скрыть секцию кода
        checkStep1Validity(); // Обновить состояние кнопок
        showStep(0); // Показываем начальный экран
    });

    // Инициализация
    populateCountries(); // Заполняем выпадающий список стран при загрузке
    showStep(0); // Изначально показываем начальную страницу (или лоадер, который сам скроет ее после 2 сек)
});