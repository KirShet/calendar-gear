$(document).ready(function () {
    const modalOverlay = $('#calendar-modal-overlay');
    const selectedDateSpan = $('#selected-date');
    const workTimeContainer = $('#work-time-container');
    const specialTimeContainer = $('#special-time-container');
    const schedule = $('#schedule').text();
    let firstDate = null; // Переменная для хранения первой выбранной даты
    let secondDate = null; // Переменная для второй даты
    let $daysWrapper;

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
    $(document).on('click', '.add-special-day-button, .work-date', function () {
        $('.time-selection-wrapper input[type="time"]').val('00:00'); 
        modalOverlay.addClass('show');

        // console.log($(this).closest('div.days-wrapper'));
        $daysWrapper = $(this).closest('div.days-wrapper')
        $('.flatpickr-calendar').addClass('inline');
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date(); // Получаем текущую дату
        const formattedDate = currentDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
    
        // Ищем скрытые input-поля внутри родительского элемента
        const parent = $(this).closest('div'); // Определяем родительский элемент
        if (parent.length > 0) { // Проверяем, что родительский элемент найден
            // const startTime = parent.find('input[name="schedule[special_time][0][start_time]"]').val();
            // const endTime = parent.find('input[name="schedule[special_time][0][end_time]"]').val();
            const startTimeInput = parent.find(`input[name^="${schedule}[special_time]"][name$="[start_time]"]`);
            // console.log(startTimeInput.length); // Проверка, существует ли элемент
            
            const endTimeInput = parent.find(`input[name^="${schedule}[special_time]"][name$="[end_time]"]`);
            // console.log(endTimeInput.length); // Проверка, существует ли элемент
            
            const startTime = startTimeInput.val();
            // console.log(startTime);  // Печать значения
            
            const endTime = endTimeInput.val();
            // console.log(endTime);  // Печать значения
            
            // Если оба input поля найдены
            if (startTime && endTime) {
                const startDateTime = new Date(startTime);
                const endDateTime = new Date(endTime);
    
                const options = { day: 'numeric', month: 'long', year: 'numeric' };

                // Форматирование начала (только дата)
                const startFormatted = startDateTime.toLocaleDateString('ru-RU', options).replace(' г.', '');
                // console.log(startFormatted);
                // Форматирование конца (только дата)
                const endFormatted = endDateTime.toLocaleDateString('ru-RU', options).replace(' г.', '');
                // console.log(endFormatted);

                const startDate = startDateTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                const endDate = endDateTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                $('.time-selection-wrapper input#startTime').val(startDate);
                $('.time-selection-wrapper input#endTime').val(endDate);
                // Если startFormatted и endFormatted одинаковые, выводим только startFormatted
                if (startFormatted === endFormatted) {
                    $("#selected-date").text(startFormatted);
                } else {
                    $("#selected-date").text(`${startFormatted} - ${endFormatted}`);
                }
                // Передаем в flatpickr период
                // flatpickr({
                //     defaultDate: [startDateTime.toISOString().split('T')[0]], // Устанавливаем период (начало и конец)
                //     mode: "range", // Включаем выбор диапазона
                //     onReady: function () {
                //         $("#selected-date").text(`${startFormatted} - ${endFormatted}`); // Обновляем текст при инициализации
                //     }
                // });

                // console.log([new Date().toISOString().split('T')[0]    ]);
                $(".calendar-input").flatpickr({
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
                            // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
                            const formattedStartHidden = startDate.toISOString().split('T')[0];
                            const formattedEndHidden = endDate.toISOString().split('T')[0];

                            const customText = `${formattedStart} - ${formattedEnd}`;
                            // const hiddenText = `"start_time" => "${formattedStartHidden}", "end_time" => "${formattedEndHidden}"`;
                            
                            // Обновление текста в нужном элементе
                            $("#selected-date").text(customText);
                            $("#start-time-hidden").text(formattedStartHidden);
                            $("#end-time-hidden").text(formattedEndHidden);


                        } else if (selectedDates.length > 0) {
                            const selectedDate = selectedDates[0]; // Выбираем только первую дату
                            const options = { day: 'numeric', month: 'long', year: 'numeric' };
                            const formattedDate = selectedDate.toLocaleDateString('ru-RU', options).replace(' г.', ''); // Форматируем дату
                            const formattedStartHidden = selectedDate.toISOString().split('T')[0];
                            const formattedEndHidden = selectedDate.toISOString().split('T')[0];

                
                            // Обновление текста в нужном элементе
                            $("#selected-date").text(formattedDate);
                            $("#start-time-hidden").text(formattedStartHidden);
                            $("#end-time-hidden").text(formattedEndHidden);
                        }
                    }
                });

                //     // Инициализация календаря для модального окна
                // $('.flatpickr-calendar').addClass('inline rangeMode animate');
            } else {
                // Если input-поля не найдены, показываем текущую дату
                $("#selected-date").text(formattedDate);

                    // Инициализация календаря для модального окна

                // $(".calendar") .flatpickr({
                //     inline: true, // Режим отображения календаря
                //     locale: {
                //         firstDayOfWeek: 1, // Неделя начинается с понедельника
                //         weekdays: {
                //             shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                //             longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
                //         },
                //         months: {
                //             shorthand: [
                //                 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
                //                 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
                //             ],
                //             longhand: [
                //                 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                //                 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
                //             ]
                //         }
                //     },
                //     // "disable": [
                //     //     function(date, selectedDates, mode) {
                //     //         // Если режим "range", отключаем выходные (суббота и воскресенье)
                //     //             return (date.getDay() === 0 || date.getDay() === 6); // Отключаем воскресенье (0) и субботу (6)
                //     //     }        
                //     // ],
                //     mode: "range", // Выбор диапазона
                //     dateFormat: "Y-m-d", // Внутренний формат данных
                //     altInput: true, // Показывать отформатированную строку
                //     altFormat: "d MMMM Y", // Формат отображаемой строки
                //     // defaultDate: [new Date().toISOString().split('T')[0]    ],
                //     onChange: function(selectedDates, dateStr, instance) {
                //         if (selectedDates.length === 2) {
                //             const [startDate, endDate] = selectedDates;
                //             const options = { day: 'numeric', month: 'long', year: 'numeric' };
                //             const formattedStart = startDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                //             const formattedEnd = endDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                //             // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
                //             const formattedStartHidden = startDate.toISOString().split('T')[0];
                //             const formattedEndHidden = endDate.toISOString().split('T')[0];

                //             const customText = `${formattedStart} - ${formattedEnd}`;
                //             // const hiddenText = `"start_time" => "${formattedStartHidden}", "end_time" => "${formattedEndHidden}"`;
                            
                //             // Обновление текста в нужном элементе
                //             $("#selected-date").text(customText);
                //             $("#start-time-hidden").text(formattedStartHidden);
                //             $("#end-time-hidden").text(formattedEndHidden);


                //         } else if (selectedDates.length > 0) {
                //             const selectedDate = selectedDates[0]; // Выбираем только первую дату
                //             const options = { day: 'numeric', month: 'long', year: 'numeric' };
                //             const formattedDate = selectedDate.toLocaleDateString('ru-RU', options).replace(' г.', ''); // Форматируем дату
                //             const formattedStartHidden = selectedDate.toISOString().split('T')[0];
                //             const formattedEndHidden = selectedDate.toISOString().split('T')[0];

                
                //             // Обновление текста в нужном элементе
                //             $("#selected-date").text(formattedDate);
                //             $("#start-time-hidden").text(formattedStartHidden);
                //             $("#end-time-hidden").text(formattedEndHidden);
                //         }
                //     }
                // });

                // Инициализируем Flatpickr с текущей датой по умолчанию (без периода)
                // flatpickr({
                //     defaultDate: currentDate, // Устанавливаем текущую дату по умолчанию
                //     onReady: function () {
                //         $("#selected-date").text(formattedDate); // Обновляем текст при инициализации
                //     }
                // });
                // $("#selected-date").text(formattedDate);
            }
        } else {
            // Если родительский элемент не найден, выводим текущую дату
            // $("#selected-date").text(formattedDate);
            // $(".calendar") .flatpickr({
            //     inline: true, // Режим отображения календаря
            //     locale: {
            //         firstDayOfWeek: 1, // Неделя начинается с понедельника
            //         weekdays: {
            //             shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            //             longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
            //         },
            //         months: {
            //             shorthand: [
            //                 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
            //                 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
            //             ],
            //             longhand: [
            //                 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
            //                 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            //             ]
            //         }
            //     },
            //     // "disable": [
            //     //     function(date, selectedDates, mode) {
            //     //         // Если режим "range", отключаем выходные (суббота и воскресенье)
            //     //             return (date.getDay() === 0 || date.getDay() === 6); // Отключаем воскресенье (0) и субботу (6)
            //     //     }        
            //     // ],
            //     mode: "range", // Выбор диапазона
            //     dateFormat: "Y-m-d", // Внутренний формат данных
            //     altInput: true, // Показывать отформатированную строку
            //     altFormat: "d MMMM Y", // Формат отображаемой строки
            //     // defaultDate: [new Date().toISOString().split('T')[0]    ],
            //     onChange: function(selectedDates, dateStr, instance) {
            //         if (selectedDates.length === 2) {
            //             const [startDate, endDate] = selectedDates;
            //             const options = { day: 'numeric', month: 'long', year: 'numeric' };
            //             const formattedStart = startDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
            //             const formattedEnd = endDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
            //             // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
            //             const formattedStartHidden = startDate.toISOString().split('T')[0];
            //             const formattedEndHidden = endDate.toISOString().split('T')[0];

            //             const customText = `${formattedStart} - ${formattedEnd}`;
            //             // const hiddenText = `"start_time" => "${formattedStartHidden}", "end_time" => "${formattedEndHidden}"`;
                        
            //             // Обновление текста в нужном элементе
            //             $("#selected-date").text(customText);
            //             $("#start-time-hidden").text(formattedStartHidden);
            //             $("#end-time-hidden").text(formattedEndHidden);


            //         } else if (selectedDates.length > 0) {
            //             const selectedDate = selectedDates[0]; // Выбираем только первую дату
            //             const options = { day: 'numeric', month: 'long', year: 'numeric' };
            //             const formattedDate = selectedDate.toLocaleDateString('ru-RU', options).replace(' г.', ''); // Форматируем дату
            //             const formattedStartHidden = selectedDate.toISOString().split('T')[0];
            //             const formattedEndHidden = selectedDate.toISOString().split('T')[0];

            
            //             // Обновление текста в нужном элементе
            //             $("#selected-date").text(formattedDate);
            //             $("#start-time-hidden").text(formattedStartHidden);
            //             $("#end-time-hidden").text(formattedEndHidden);
            //         }
            //     }
            // });
            // Инициализируем Flatpickr с текущей датой по умолчанию
            // flatpickr({
            //     defaultDate: currentDate, // Устанавливаем текущую дату по умолчанию
            //     onReady: function () {
            //         $("#selected-date").text(formattedDate); // Обновляем текст при инициализации
            //     }
            // });\
        }
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
    function removeFlatpickrClasses() {
        $('.flatpickr-day').removeClass('selected startRange inRange endRange');
    }
    var randomValue = 0; 
    // Добавление рабочей записи по нажатию на "Добавить"
    $('.add-btn').on('click', function () {
                // Функция для поиска максимального индекса
        function getMaxIndex() {
            let maxIndex = 0;
            $(`input[name^="${schedule}[special_time]"][name$="[start_time]"]`).each(function() {
                console.log($('input[name^="[special_time]"][name$="[start_time]"]'));
                const match = $(this).attr('name').match(/\[special_time\]\[(\d+)\]\[start_time\]/);
                console.log(match);
                if (match) {
                    const index = parseInt(match[1], 10);
                    console.log(index);
                    if (index > maxIndex) {
                        maxIndex = index;
                    }
                }
            });
            return maxIndex;
        }

        // Получаем максимальный индекс или начинаем с нуля
        console.log(getMaxIndex());
        let maxIndex = getMaxIndex();
        const newIndex = maxIndex + 1;

        const selectedDate = selectedDateSpan.text();

        const startTime = modalOverlay.find('input[type="time"]').eq(0).val();
        // console.log(startTime);
        const endTime = modalOverlay.find('input[type="time"]').eq(1).val();
        // console.log(endTime);

        if (!startTime || !endTime) {
            alert('Пожалуйста, заполните все временные поля.');
            return;
        }
        // Функция для генерации случайного числа в определённом диапазоне
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // if (preg_match('/(\d{1,2}) (\w+) (\d{4}) - (\d{1,2}) (\w+) (\d{4})/', $date_range, $matches)) {
        //     $start_date = "{$matches[3]}-{$matches[2]}-{$matches[1]}"; // Форматируем start_time
        //     $end_date = "{$matches[6]}-{$matches[5]}-{$matches[4]}"; // Форматируем end_time
        // }        
        // Генерация случайного числа
        var startDate = $('#start-time-hidden').text();
        var endDate = $('#end-time-hidden').text();
        const newEntry = `
            <div class="days-wrapper">
                <div class="work-time-info" style="pointer-events: none;">
                    <input type="hidden" name="${schedule}[special_time][${newIndex}][start_time]" value="${startDate} ${startTime}:00">
                    <input type="hidden" name="${schedule}[special_time][${newIndex}][end_time]" value="${endDate} ${endTime}:59">
                    <span class="work-date">${selectedDate}</span>
                </div>
                <div class="time-selection">
                    <input type="time" class="schedule-time start-time" value="${startTime}" disabled>
                    <div class="time-divider"></div>
                    <input type="time" class="schedule-time end-time" value="${endTime}" disabled>
                </div>
                <div class="action-buttons">
                    <button type="button" class="edit-work-time work-time-button" title="Редактировать"></button>
                    <button type="button" class="remove-work-time work-time-button" title="Удалить"></button>
                </div>
                <div id="modal-overlay-message" class="modal-overlay-message">
                        <div class="modal-content">
                            <div class="modal-message">Вы хотите удалить это правило?</div>
                            <div class="modal-buttons">
                            <button type="button" class="cancel-btn">Отмена</button>
                            <button type="button" class="delete-btn">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
                `;
    // console.log($daysWrapper);
    // Предполагается, что $daysWrapper и newEntry уже определены
    if ($daysWrapper.length) { 
        // Удаляем существующий $daysWrapper
        $daysWrapper.remove();
    }

// Добавляем новый элемент newEntry
workTimeContainer.append(newEntry);
        
        modalOverlay.removeClass('show');
        resetDates();
        removeInlineClass()
        removeFlatpickrClasses();

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
            removeFlatpickrClasses();
        });

        $('form').on('submit', function(event) {
            //
            $('.days-wrapper input[type="checkbox"]').prop('disabled', false);

            // Снятие "disabled" с полей времени
            $('.days-wrapper input[type="time"]').prop('disabled', false);
        //
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
        $(this).closest('.days-wrapper').find(`.day input[type="checkbox"][name$="][day]"]`).removeAttr('disabled');
    });

        $(document).on('click', '.edit-work-time', function () {
            var parentWrapper = $(this).closest('.days-wrapper');
            
            // parentWrapper.find('.remove-work-time').addClass('can-remove');
            // parentWrapper.find('.can-remove').removeClass('remove-work-time');
            parentWrapper.find('.edit-work-time').addClass('check-work-time');
            parentWrapper.find('.check-work-time').removeClass('edit-work-time');
            parentWrapper.find('.day').removeClass('disabled');
            parentWrapper.find('.work-time-info').css('pointer-events', 'all');
            updateStyles();

        });
    
        updateStyles();


//  // Функция для обновления стиля для всех чекбоксов
 function updateStyles() {
    $(`input[name$="][day]"]`).each(function() {
        var isChecked = $(this).prop('checked'); // Получаем состояние чекбокса
        var dayCircle = $(this).siblings('.day-circle'); // Находим соседний div.day-circle
        // console.log(isChecked);
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
    $(`input[name$="][day]"]`).each(function() {
        var isChecked = $(this).prop('checked'); // Получаем состояние чекбокса
        var dayCircle = $(this).siblings('.day-circle'); // Находим соседний div.day-circle
        $(`input[name$="][day]"]`).not(this).prop('disabled', true);
    });
}

// $(document).on('click', '.can-remove', function () {
//     var parentWrapper = $(this).closest('.days-wrapper');
//     parentWrapper.find(`input[type="checkbox"][name$="][day]"]`).prop('checked', false).prop('disabled', false);
//     updateStyles();
//     parentWrapper.find('input[type="time"]').val('00:00');;
// });

// // Обработчик события изменения состояния всех чекбоксов
$(document).on('change', `input[name$="][day]"]`, function() {
    // console.log("qw");
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

    $(document).on('click', '.check-work-time', function() {

        let isAnyMatching = false;
        // Найти ближайший родительский элемент с классом .days-wrapper
        var parentWrapper = $(this).closest('.days-wrapper');

        parentWrapper.find('.time-selection input[type="time"]').each(function() {
            let value = $(this).val();
        
            // Убираем класс 'border-thick-slow'
            $(this).removeClass('border-thick-slow');
        
            // Проверяем, если текущее значение равно '00:00' или пустое
            if (value === '00:00' || value === '') {
                // Проверяем наличие других input с value='00:00' среди соседей
                let otherInputs = $(this).siblings('input[type="time"]').filter(function() {
                    return $(this).val() === '00:00';
                });
        
                if (otherInputs.length > 0) {
                    setTimeout(() => {
                        $(this).addClass('border-thick-slow');
                    }, 100);
                    isAnyMatching = true;
                }
            }
        });
        var startTime = parentWrapper.find('.start-time').val();
        var endTime = parentWrapper.find('.end-time').val();

        function timeToMinutes(time) {
            var parts = time.split(':');
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }

       
            if (timeToMinutes(startTime) > timeToMinutes(endTime)) {
                // console.log(timeToMinutes(startTime)+">"+timeToMinutes(endTime));
                setTimeout(() => {
                    parentWrapper.find('.start-time').addClass('border-thick-slow');
                    parentWrapper.find('.end-time').addClass('border-thick-slow');
                }, 100);
                isAnyMatching = true;
            }

        if (!isAnyMatching) {
            // console.log("33"+isAnyMatching);
            var parentWrapper = $(this).closest('.days-wrapper');
            parentWrapper.find('.time-selection input[type="time"]').prop('disabled', true);
            $(this).closest('.days-wrapper').find(`.day input[type="checkbox"][name$="][day]"]`).addClass('disabled');

            // parentWrapper.find('.can-remove').addClass('remove-work-time');
            // parentWrapper.find('.remove-work-time').removeClass('can-remove');
            parentWrapper.find('.check-work-time').addClass('edit-work-time');
            parentWrapper.find('.edit-work-time').removeClass('check-work-time');
            parentWrapper.find('.disabled').removeClass('day');
            parentWrapper.find('.work-time-info').css('pointer-events', 'none');
            disabled();
        }

    });
        // Функция для генерации случайного числа в определённом диапазоне
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Генерация случайного числа
        // const randomValue = getRandomNumber(1, 1000); // Генерация случайного числа от 1 до 100
        // Добавление рабочей часа по нажатию на "Добавить"
        $('.add-work-time').on('click', function () {   
            
            const newEntry = `
        <div class="days-wrapper">
            <div class="weekday-group">
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="1" disabled>
                    <div class="day-circle"><span class="day-name">Пн</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="2" disabled>
                    <div class="day-circle"><span class="day-name">Вт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="3" disabled>
                    <div class="day-circle"><span class="day-name">Ср</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="4" disabled>
                    <div class="day-circle"><span class="day-name">Чт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="5" disabled>
                    <div class="day-circle"><span class="day-name">Пт</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="6" disabled>
                    <div class="day-circle"><span class="day-name">Сб</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][day]" value="7" disabled>
                    <div class="day-circle"><span class="day-name">Вс</span></div>
                </label>
            </div>
            <div class="time-selection">
                <input type="time" class="schedule-time start-time" name="" value="00:00" disabled>
                <div class="time-divider"></div>
                <input type="time" class="schedule-time end-time" name="" value="00:00" disabled>
            </div>
            <div class="action-buttons">
                <button type="button" class="edit-work-time work-time-button" title="Редактировать"></button>
                <button type="button" class="remove-work-time work-time-button" title="Удалить"></button>
            </div>
            <div id="modal-overlay-message" class="modal-overlay-message">
                        <div class="modal-content">
                            <div class="modal-message">Вы хотите удалить это правило?</div>
                            <div class="modal-buttons">
                                <button type="button" class="cancel-btn">Отмена</button>
                                <button type="button" class="delete-btn">Удалить</button>
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
    // $("input[type='time']") .flatpickr({
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
        // defaultDate: [new Date().toISOString().split('T')[0]    ],
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                const [startDate, endDate] = selectedDates;
                // console.log(selectedDates);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedStart = startDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                const formattedEnd = endDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
                const formattedStartHidden = startDate.toISOString().split('T')[0];
                const formattedEndHidden = endDate.toISOString().split('T')[0];

                const customText = `${formattedStart} - ${formattedEnd}`;
                // const hiddenText = `"start_time" => "${formattedStartHidden}", "end_time" => "${formattedEndHidden}"`;
                
                // Обновление текста в нужном элементе
                $("#selected-date").text(customText);
                $("#start-time-hidden").text(formattedStartHidden);
                $("#end-time-hidden").text(formattedEndHidden);


            } else if (selectedDates.length > 0) {
                const selectedDate = selectedDates[0]; // Выбираем только первую дату
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = selectedDate.toLocaleDateString('ru-RU', options).replace(' г.', ''); // Форматируем дату
                const formattedStartHidden = selectedDate.toISOString().split('T')[0];
                const formattedEndHidden = selectedDate.toISOString().split('T')[0];

    
                // Обновление текста в нужном элементе
                $("#selected-date").text(formattedDate);
                $("#start-time-hidden").text(formattedStartHidden);
                $("#end-time-hidden").text(formattedEndHidden);
            }
        }
    });

    function updateScheduleInputs() {
        // Массив для хранения индексов активных элементов
        var activeIndexes = [];
        indexChecked=0;

        $('input[name*="[work_time]"][name*="end_time"]').remove();
        $('input[name*="[work_time]"][name*="start_time"]').remove();
    
        // Проходим по всем инпутам с нужным name
        $(`input[type="checkbox"][name$="][day]"]`).each(function(index, element) {

            // console.log("Проходим по всем инпутам снова0");

            // Проверяем, активен ли инпут (например, если он чекбокс или радио и он отмечен)
            if ($(element).is(':checked') && $(element).val() !== '') {

                // console.log("Проходим по всем инпутам снова0.1");
                activeIndexes.push(indexChecked++);  // Добавляем индекс активного элемента

            }
        });
    
        // Проходим по всем инпутам снова и присваиваем новые имена с индексами
        $(`input[type="checkbox"][name$="][day]"]`).each(function(i, element) {

            // console.log("Проходим по всем инпутам снова");

            if ($(element).is(':checked') && $(element).val() !== '') {

                var activeIndex = activeIndexes.shift(); // Получаем следующий индекс для time инпутов
                // Обновляем атрибут name, ставя индекс
                var newName = `${schedule}[work_time][${activeIndex}][day]`;
                $(element).attr('name', newName);
                
                // Находим ближайший родительский элемент .days-wrapper
                var $daysWrapper = $(element).closest('.days-wrapper');
                
                // Извлекаем значения времени из инпутов с классами .schedule-time.start-time и .schedule-time.end-time
                var startTime = $daysWrapper.find('.schedule-time.start-time').val() + ":00" || '00:00' + ":00"; // Если значение не указано, берем дефолтное
                var endTime = $daysWrapper.find('.schedule-time.end-time').val() + ":59" || '00:00' + ":59"; // То же для end-time
    
                // Добавляем инпуты time в блок time-selection
                if ($(element).is(':checked')) {
                    // Проверяем, существует ли уже инпут для start_time с данным activeIndex
                    var existingStartTimeInput = $(`input[name="${schedule}[work_time][${activeIndex}][start_time]"]`);
                    if (existingStartTimeInput.length > 0) {
                        // Если существует, заменяем значение
                        existingStartTimeInput.val(startTime);
                    } else {
                        // Если не существует, создаем новый инпут
                        var startTimeInput = $('<input>', {
                            type: 'time',
                            name: `${schedule}[work_time][${activeIndex}][start_time]`,
                            value: startTime,
                            disabled: true,
                            class:"hidden-checkbox"
                        });

                        // Добавляем его в блок с классом .time-selection
                        $('.time-selection').append(startTimeInput);
                    }

                    // Аналогично для end_time
                    var existingEndTimeInput = $(`input[name="${schedule}work_time][${activeIndex}][end_time]"]`);
                    if (existingEndTimeInput.length > 0) {
                        // Если существует, заменяем значение
                        existingEndTimeInput.val(endTime);
                    } else {
                        // Если не существует, создаем новый инпут
                        var endTimeInput = $('<input>', {
                            type: 'time',
                            name: `${schedule}[work_time][${activeIndex}][end_time]`,
                            value: endTime,
                            disabled: true,
                            class:"hidden-checkbox"
                        });

                        // Добавляем его в блок с классом .time-selection
                        $('.time-selection').append(endTimeInput);
                    }
                }
            }
        });
        activeIndexes = [];

    }
    
    // Обработчик изменения состояния чекбоксов с классом .days-checkbox
    $(document).on('change', '.days-checkbox', function() {
        // console.log('Изменение произошло');
        updateScheduleInputs();
    });
    
    // Делегируем событие для изменения значений инпутов с классами .schedule-time.start-time и .schedule-time.end-time
    $(document).on('change', '.schedule-time.start-time, .schedule-time.end-time', function() {
        // console.log('Изменение произошло');
        updateScheduleInputs();
    });

    updateScheduleInputs();
    
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  function translateDate(dateString) {

    const englishMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let i = 0; i < englishMonths.length; i++) {
      const regex = new RegExp(englishMonths[i], 'g');
      dateString = dateString.replace(regex, months[i]);
    }
    
    return dateString;
  }

  $('.work-date').each(function() {
    let text = $(this).html();
    text = translateDate(text);
    $(this).html(text);
  });


//   $('#orgregistry-form').on('beforeSubmit', function(e) {
//     // console.log($('#schedule-form').yiiActiveForm('valid'));
//     var form = $(this);
//     console.log(form);
//     console.log($('#orgregistry-form').yiiActiveForm('validate'));
//     alert(form);
//     // Проверяем, если форма невалидна (есть ошибки)
//     if (!form.yiiActiveForm('validate')) {
//         console.log("22");
//         e.preventDefault();  // Останавливаем отправку формы
//         alert('There are validation errors. Please fix them before submitting.');
//         return false;
//     }
//     // e.preventDefault();  // Останавливаем отправку формы
//     // Форма будет отправлена только если валидация прошла успешно
//     return true;
// });

// // Убедитесь, что форма отправляется с помощью AJAX
// $('#orgregistry-form').on('beforeSubmit', function (e) {
//     // Этот код выполнится перед отправкой формы
//     var form = $(this);
    
//     // Получаем данные формы и отправляем их с помощью AJAX
//     $.ajax({
//         url: form.attr('action'),  // URL формы
//         type: form.attr('method'),  // Метод (POST)
//         data: form.serialize(),  // Сериализация данных формы
//         success: function(response) {
//             var res = JSON.parse(response);
//             if (res.valid) {
//                 // Если валидация успешна, отправляем данные, например, сохраняем
//                 form.submit();  // Если валидация успешна, можно продолжить отправку формы
//             } else {
//                 // Если есть ошибки, показываем их пользователю
//                 $.each(res.errors, function (field, errors) {
//                     var errorMessage = errors.join(', ');
//                     form.find('[name="' + field + '"]').after('<div class="error">' + errorMessage + '</div>');
//                 });
//             }
//         },
//         error: function () {
//             alert('Ошибка отправки формы.');
//         }
//     });

//     // Останавливаем стандартную отправку формы
//     return false;
// });
});