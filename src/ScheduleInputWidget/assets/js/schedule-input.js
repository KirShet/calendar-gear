$(document).ready(function () {
    const modalOverlay = $('#calendar-modal-overlay');
    const selectedDateSpan = $('#selected-date');
    const workTimeContainer = $('#work-time-container');
    const specialTimeContainer = $('#special-time-container');

    let firstDate = null; // Переменная для хранения первой выбранной даты
    let secondDate = null; // Переменная для второй даты

    let workItemToDelete = null;

// Функция для удаления класса 'inline'
function removeInlineClass() {
    $('.flatpickr-calendar').removeClass('inline');
}

// Создаем наблюдатель за изменениями в DOM
const observer = new MutationObserver((mutationsList, observer) => {
    // Проверяем все изменения DOM
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
            // Если новый элемент с классом 'flatpickr-calendar' добавлен в DOM
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.matches('.flatpickr-calendar')) {
                    removeInlineClass();
                }
            });
        }
    });
});

// Настройка наблюдателя: отслеживаем добавление новых узлов в body
observer.observe(document.body, { childList: true, subtree: true });

// Вызовем сразу на случае, если элемент уже существует на момент инициализации
removeInlineClass();
    // Открытие модального окна
    $('.add-special-day-button').on('click', function () {
        modalOverlay.addClass('show');

        $('.flatpickr-calendar').addClass('inline');
    });

    // брос выборов
    function resetDates() {
        firstDate = null;
        secondDate = null;
        $('.days .green-selected').removeClass('green-selected');
    }

    // Выбор дня в календаре
    $('.days div').on('click', function () {
        const month = $(this).closest('.month').find('h3').text();
        const dayNumber = $(this).text();
    
        if (!firstDate) {
            firstDate = `${dayNumber} ${month}`;
            $(this).addClass('green-selected');
            selectedDateSpan.text(`${firstDate}`);
        } else if (!secondDate) {
            secondDate = `${dayNumber} ${month}`;
            $(this).addClass('green-selected');
            const startDate = new Date(`${firstDate} 2024`);
            const endDate = new Date(`${secondDate} 2024`);
            const displayDates =
                startDate <= endDate
                    ? `${firstDate} — ${secondDate}`
                    : `${secondDate} — ${firstDate}`;
            selectedDateSpan.text(displayDates);
        } else {
            resetDates();
        }
    });

    // Добавление рабочей записи по нажатию на "Добавить"
    $('.add-btn').on('click', function () {
        const selectedDate = selectedDateSpan.text();

        const startTime = modalOverlay.find('input[type="time"]').eq(0).val();
        const endTime = modalOverlay.find('input[type="time"]').eq(1).val();
        
        if (!startTime || !endTime) {
            alert('Пожалуйста, заполните все временные поля.');
            return;
        }
        const newEntry = `
            <div class="days-wrapper">
                <div class="work-time-info">
                    <span class="work-date">${selectedDate}</span>
                </div>
                <div class="time-selection">
                    <input type="time" value="${startTime}" disabled>
                    <div class="time-divider"></div>
                    <input type="time" value="${endTime}" disabled>
                </div>
                <div class="action-buttons">
                    <button type="button" class="edit-work-time" title="Редактировать"></button>
                    <button type="button" class="remove-work-time" title="Удалить"></button>
                </div>
                <div id="modal-overlay-message" class="modal-overlay-message">
                        <div class="modal-content">
                            <div class="modal-message">Вы хотите удалить это правило?</div>
                            <div class="modal-buttons">
                            <button class="cancel-btn">Отмена</button>
                            <button class="delete-btn">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
                `;
        workTimeContainer.append(newEntry);
        
        modalOverlay.removeClass('show');
        resetDates();
        removeInlineClass()
    });
        
    $(document).ready(function () {
        let modalMessage;  // Переносим объявление переменной сюда, чтобы она была доступна везде внутри $(document).ready
    
        // Удаление рабочей записи
        $(document).on('click', '.remove-work-time', function () {
            workItemToDelete = $(this).closest('.days-wrapper');
            modalMessage = $(this).closest('.action-buttons').next('div');  // Присваиваем значение переменной
            modalMessage.addClass('show');
        });
    
        // Используем делегирование события на родительский элемент (например, body)
        $(document).on('click', '.delete-btn', function () {
            if (workItemToDelete) {
                workItemToDelete.remove();
            }
            if (modalMessage) {  // Добавляем проверку на null или undefined
                modalMessage.removeClass('show');
            }
        });
    
        // Закрытие модального окна
        $(document).on('click', '.cancel-btn', function () {
            if (modalMessage) {  // Добавляем проверку на null или undefined
                modalMessage.removeClass('show');
            }
        });
    });
        // Закрытие модального окна
        $('.calendar-cancel-btn').on('click', function () {
            modalOverlay.removeClass('show');
            removeInlineClass();
        });

    $('form').on('submit', function(event) {
        event.preventDefault();
    });

    $('.action-row .switch').click(function() {
        var checkboxes = $(this).closest('.action-row').find('input[type="checkbox"]');
        
        checkboxes.each(function() {
            $(this).prop('checked', !$(this).prop('checked'));
        });
        
        $(this).toggleClass('active');
    });

    $(document).on('click', '.edit-work-time', function () {
        var parentWrapper = $(this).closest('.days-wrapper');
        parentWrapper.find('.time-selection input[type="time"]').prop('disabled', false);
        $(this).closest('.days-wrapper').find('.day input[type="checkbox"][name="days"]').removeAttr('disabled');
    });

        $(document).on('click', '.edit-work-time', function () {
            var parentWrapper = $(this).closest('.days-wrapper');
            
            parentWrapper.find('.remove-work-time').addClass('can-remove');
            parentWrapper.find('.can-remove').removeClass('remove-work-time');
            parentWrapper.find('.edit-work-time').addClass('check-work-time');
            parentWrapper.find('.check-work-time').removeClass('edit-work-time');
            parentWrapper.find('.day').removeClass('disabled');
            updateStyles();

        });
    



//  // Функция для обновления стиля для всех чекбоксов
 function updateStyles() {
    $('input[name="days"]').each(function() {
        var isChecked = $(this).prop('checked'); // Получаем состояние чекбокса
        var dayCircle = $(this).siblings('.day-circle'); // Находим соседний div.day-circle
        
        if (isChecked) {
            // Если чекбокс включен, добавляем классы
            dayCircle.addClass('highlighted-circle');
            dayCircle.find('.day-name').addClass('text-white');
        } else {
            // Если чекбокс выключен, убираем классы
            dayCircle.removeClass('highlighted-circle');
            dayCircle.find('.day-name').removeClass('text-white');
        }
    });
}
function disabled() {
    $('input[name="days"]').each(function() {
        var isChecked = $(this).prop('checked'); // Получаем состояние чекбокса
        var dayCircle = $(this).siblings('.day-circle'); // Находим соседний div.day-circle
        $('input[name="days"]').not(this).prop('disabled', true);
    });
}

$(document).on('click', '.can-remove', function () {
    var parentWrapper = $(this).closest('.days-wrapper');
    parentWrapper.find('input[type="checkbox"][name="days"]').prop('checked', false).prop('disabled', false);
    updateStyles();
    parentWrapper.find('input[type="time"]').val('00:00');;
});

// // Обработчик события изменения состояния всех чекбоксов
$('input[name="days"]').on('change', function() {
    updateStyles();
});


$(document).on('change', '.checkbox', function () {
    if (!$(this).prop('disabled')) {
        // Убираем старые классы enabled
        $(this).removeClass('enabled-on enabled-off');
        // Добавляем новый класс
        $(this).addClass($(this).is(':checked') ? 'enabled-on' : 'enabled-off');
        
        // Находим div day-circle в том же родительском day
        const $dayCircle = $(this).closest('.day').find('.day-circle');
        if ($(this).is(':checked')) {
            $dayCircle.addClass('circle-checked').removeClass('circle-unchecked');
        } else {
            $dayCircle.addClass('circle-unchecked').removeClass('circle-checked');
        }
    }
});

// Определяем именную функцию
// function enableWorkTimeEditing() {
//     console.log('22')
//     var parentWrapper = $(this).closest('.days-wrapper');
//     parentWrapper.find('.time-selection input[type="time"]').prop('disabled', true);
//     $(this).closest('.days-wrapper').find('.day input[type="checkbox"][name="days"]').addClass('disabled');
// }

    $(document).on('click', '.check-work-time', function() {

        let isAnyMatching = false;
        // Найти ближайший родительский элемент с классом .days-wrapper
        var parentWrapper = $(this).closest('.days-wrapper');

        parentWrapper.find('.time-selection input[type="time"]').each(function() {
            let value = $(this).val();

            $(this).removeClass('border-thick-slow');
            
                if (value == '00:00' || value === '') {
                    setTimeout(() => {
                        $(this).addClass('border-thick-slow');
                    }, 100);
                    isAnyMatching = true;
                    console.log("11"+isAnyMatching);
                }

            console.log("22"+isAnyMatching);

        });

        if (!isAnyMatching) {
            console.log("33"+isAnyMatching);
            var parentWrapper = $(this).closest('.days-wrapper');
            parentWrapper.find('.time-selection input[type="time"]').prop('disabled', true);
            $(this).closest('.days-wrapper').find('.day input[type="checkbox"][name="days"]').addClass('disabled');

            parentWrapper.find('.can-remove').addClass('remove-work-time');
            parentWrapper.find('.remove-work-time').removeClass('can-remove');
            parentWrapper.find('.check-work-time').addClass('edit-work-time');
            parentWrapper.find('.edit-work-time').removeClass('check-work-time');
            parentWrapper.find('.disabled').removeClass('day');
            disabled();
        }

    });

        // Добавление рабочей часа по нажатию на "Добавить"
        $('.add-work-time').on('click', function () {   
            
            const newEntry = `
                        <div class="days-wrapper">
            <div class="weekday-group">
                <label class="day">
                    <input type="checkbox" name="days" value="Пн" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Пн</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" name="days" value="Вт" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Вт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" name="days" value="Ср" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Ср</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" name="days" value="Чт" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Чт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" name="days" value="Пт" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Пт</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" name="days" value="Сб" disabled>
                    <div class="day-circle"><span class="day-name text-white">Сб</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" name="days" value="Вс" disabled>
                    <div class="day-circle"><span class="day-name text-white">Вс</span></div>
                </label>
            </div>
            <div class="time-selection">
                <input type="time" value="12:00" disabled>
                <div class="time-divider"></div>
                <input type="time" value="19:00" disabled>
            </div>
            <div class="action-buttons">
                <button type="button" class="edit-work-time" title="Редактировать"></button>
                <button type="button" class="remove-work-time" title="Удалить"></button>
            </div>
            <div id="modal-overlay-message" class="modal-overlay-message">
                <div class="modal-content">
                    <div class="modal-message">Вы хотите удалить это правило?</div>
                    <div class="modal-buttons">
                        <button class="cancel-btn">Отмена</button>
                        <button class="delete-btn">Удалить</button>
                    </div>
                    </div>
                </div>
            </div>
                    `;
                specialTimeContainer.append(newEntry);
            
            modalOverlay.removeClass('show');
            resetDates();
        });

    // // Инициализация Flatpickr для полей времени
    // $("input[type='time']").flatpickr({
    //     // // enableTime: true,
    //     // // // mode: "range",  // Диапазон выбора дат
    //     // // dateFormat: "H:i",  // Формат даты и времени
    //     // // // disable: [
    //     // // //     function($date) {
    //     // // //         // Отключаем выходные (воскресенье и субботу)
    //     // // //         return ($date.getDay() === 0 || $date.getDay() === 6);
    //     // // //     }
    //     // // // ],
    //     // // locale: 'ru',  // Локализация на русский
    //     // // // weekNumbers: true,  // Отображать номера недель
    //     // // // Пример подключения плагинов (если нужно)
    //     // // // plugins: [new confirmDatePlugin({})]
    //     // enableTime: true,
    //     // noCalendar: true,
    //     // dateFormat: "H:i",
    //     // time_24hr: true
    // });

    // Инициализация календаря для модального окна
    $(".calendar").flatpickr({
        inline: true, // Режим отображения календаря
        locale: {
            firstDayOfWeek: 1, // Неделя начинается с понедельника
            weekdays: {
                shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
            },
            months: {
                shorthand: [
                    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
                    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
                ],
                longhand: [
                    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                ]
            }
        },
        // "disable": [
        //     function(date, selectedDates, mode) {
        //         // Если режим "range", отключаем выходные (суббота и воскресенье)
        //             return (date.getDay() === 0 || date.getDay() === 6); // Отключаем воскресенье (0) и субботу (6)
        //     }        
        // ],
        mode: "range", // Выбор диапазона
        dateFormat: "Y-m-d", // Внутренний формат данных
        altInput: true, // Показывать отформатированную строку
        altFormat: "d MMMM Y", // Формат отображаемой строки
        defaultDate: [new Date().toISOString().split('T')[0]    ],
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                const [startDate, endDate] = selectedDates;
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedStart = startDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                const formattedEnd = endDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                const customText = `${formattedStart} - ${formattedEnd}`;
                
                // Обновление текста в нужном элементе
                $("#selected-date").text(customText);
            } else if (selectedDates.length > 0) {
                const selectedDate = selectedDates[0]; // Выбираем только первую дату
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = selectedDate.toLocaleDateString('ru-RU', options).replace(' г.', ''); // Форматируем дату
    
                // Обновление текста в нужном элементе
                $("#selected-date").text(formattedDate);
            }
        }
    });
});

