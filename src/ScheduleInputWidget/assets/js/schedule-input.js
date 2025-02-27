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
            // Если новый элемент с классом 'flatp ickr-calendar' добавлен в DOM
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
            // const startTime = parent.find('input[name="schedule[special_time][0][star t_time]"]').val();
            // const endTime = parent.find('input[name="schedule[special_time][0][end_ time]"]').val();
            const startTimeInput = parent.find(`input[name^="${schedule}[special_time]"][name$="[time_start]"]`);
            // console.log(startTimeInput.length); // Проверка, существует ли элемент
            
            const endTimeInput = parent.find(`input[name^="${schedule}[special_time]"][name$="[time_end]"]`);
            // console.log(endTimeInput.length); // Проверка, существует ли элемент

            const startDateInput = parent.find(`input[name^="${schedule}[special_time]"][name$="[date_start]"]`);
            // console.log(startTimeInput.length); // Проверка, существует ли элемент
            
            const endDateInput = parent.find(`input[name^="${schedule}[special_time]"][name$="[date_end]"]`);
            // console.log(endTimeInput.length); // Проверка, существует ли элемент
            
            const startTime = startTimeInput.val();
            // console.log(startTime);  // Печать значения
            
            const endTime = endTimeInput.val();
            // console.log(endTime);  // Печать значения

            const startDateValue = startDateInput.val();
            // console.log(startDateValue);  // Печать значения
            
            const endDateValue = endDateInput.val();
            // console.log(endDateValue);  // Печать значени
            
            // console.log(endDate+' '+endTime);  // Печать значени
            // Если оба input поля найдены
            if (startTime && endTime && startDateValue && endDateValue) {
                // console.log(endDate+' '+endTime);  // ReferenceError: Cannot access 'endDate' before initialization
                const startDateTime = new Date(startTime +' '+ startDateValue);  // Combine date and time
                const endDateTime = new Date(endTime +' '+ endDateValue);  // Combine date and time
    
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

                var defaultStartDate = startDateValue.length > 0 ? startDateValue : new Date().toISOString().split('T')[0]; // Текущая дата в формате YYYY-MM-DD
                var defaultEndDate = endDateValue.length > 0 ? endDateValue : new Date().toISOString().split('T')[0]; // Текущая дата в формате YYYY-MM-DD
                var defaultDate = [defaultStartDate, defaultEndDate];
                // console.log(defaultDate); // Для проверки в консоли
                // Если startFormatted и endFormatted одинаковые, выводим только startFormatted

                startDateValue1 = new Date(startDateValue);
                endDateValue1 = new Date(endDateValue);

                if (startFormatted === endFormatted) {
                    $("#selected-date").text(startFormatted);
                    $("#start-time-hidden").text("11");
                    // console.log(startDateValue);  // Печать значения
                    $("#end-time-hidden").text("11");
                    // console.log(endDateValue);  // Печать значени
                } else {
                    $("#selected-date").text(`${startFormatted} - ${endFormatted}`);
                    $("#start-time-hidden").text("11");;
                    // console.log(startDateValue);  // Печать значения
                    $("#end-time-hidden").text("11");;
                    // console.log(endDateValue);  // Печать значени
                }
                if (Array.isArray(calendars)) {
                    calendars.forEach(function(calendar) {
                        calendar.setDate(defaultDate, true); // Устанавливаем новую дефолтную дату
                    });
                } else {
                    // Если это одиночный объект, применяем метод напрямую
                    calendars.setDate(defaultDate, true);
                }
            
                // Открываем календарь после изменения дефолтной даты
                if (Array.isArray(calendars)) {
                    calendars.forEach(function(calendar) {
                        calendar.open();
                    });
                } else {
                    calendars.open();
                }
                // console.log(calendars);
                // $(".calendar")[1].flatpi ckr({
                //     defaultDate: defaultDate1 // Устанавливаем defaultDate
                // }).open();
                // $(".calendar").flatp ickr({
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
                //     defaultDate: defaultDate1,
                //     onChange: function(selectedDates, dateStr, instance) {
                //         if (selectedDates.length === 2) {
                //             const [startDate, endDate] = selectedDates;
                //             // console.log(selectedDates);
                //             const options = { day: 'numeric', month: 'long', year: 'numeric' };
                //             const formattedStart = startDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                //             const formattedEnd = endDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                //             // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
                //             const formattedStartHidden = startDate.toISOString().split('T')[0];
                //             const formattedEndHidden = endDate.toISOString().split('T')[0];
            
                //             const customText = `${formattedStart} - ${formattedEnd}`;
                //             // const hiddenText = `"sta rt_time" => "${formattedStartHidden}", "end_ time" => "${formattedEndHidden}"`;
                            
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

                // Передаем в flatpi ckr период
                // flatp ickr({
                //     defaultDate: [startDateTime.toISOString().split('T')[0]], // Устанавливаем период (начало и конец)
                //     mode: "range", // Включаем выбор диапазона
                //     onReady: function () {
                //         $("#selected-date").text(`${startFormatted} - ${endFormatted}`); // Обновляем текст при инициализации
                //     }
                // });

                // console.log([new Date().toISOString().split('T')[0]    ]);
                // $(". calendar-input").flatpic kr({
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
                //     defaultDate: ["2025-01-20"],
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
                //             // const hiddenText = `"star t_time" => "${formattedStartHidden}", "end_ time" => "${formattedEndHidden}"`;
                            
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

                //     // Инициализация календаря для модального окна
                // $('.flatpic kr-calendar').addClass('inline rangeMode animate');
            } else {
                // Если input-поля не найдены, показываем текущую дату
                $("#selected-date").text(formattedDate);
                const today = new Date(); // Получаем текущую дату

                if (Array.isArray(calendars)) { 
                    calendars.forEach(function(calendar) {
                        calendar.setDate(today, true); // Устанавливаем сегодняшнюю дату
                    });
                } else {
                    // Если это одиночный объект, применяем метод напрямую
                    calendars.setDate(today, true);
                }
                
                // Открываем календарь после изменения даты
                if (Array.isArray(calendars)) {
                    calendars.forEach(function(calendar) {
                        calendar.open();
                    });
                } else {
                    calendars.open();
                }
                // console.log(startDateValue);
                    // Инициализация календаря для модального окна

                // $(" .calendar") .flat pickr({
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
                //             // const hiddenText = `"sta rt_time" => "${formattedStartHidden}", "end_ time" => "${formattedEndHidden}"`;
                            
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

                // Инициализируем Flatpi ckr с текущей датой по умолчанию (без периода)
                // flat pickr({
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
            // $(" .calendar") .flatp ickr({
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
            //             // const hiddenText = `"sta rt_time" => "${formattedStartHidden}", "end_ time" => "${formattedEndHidden}"`;
                        
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
            // Инициализируем Flatpi ckr с текущей датой по умолчанию
            // flat pickr({
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
        // $('.flatpi ckr-day').removeClass('selected startRange inRange endRange');
    }
    var randomValue = 0; 
    // Добавление рабочей записи по нажатию на "Добавить"
    $('.add-btn').on('click', function () {
                // Функция для поиска максимального индекса
        function getMaxIndex() {
            let maxIndex = 0;
            $(`input[name^="${schedule}[special_time]"][name$="[time_start]"]`).each(function() {
                // console.log($('input[name^="[special_time]"][name$="[time_start]"]'));
                const match = $(this).attr('name').match(/\[special_time\]\[(\d+)\]\[time_start\]/);
                // console.log(match);
                if (match) {
                    const index = parseInt(match[1], 10);
                    // console.log(index);
                    if (index > maxIndex) {
                        maxIndex = index;
                    }
                }
            });
            return maxIndex;
        }

        // Получаем максимальный индекс или начинаем с нуля
        // console.log(getMaxIndex());
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
        //     $start_date = "{$matches[3]}-{$matches[2]}-{$matches[1]}"; // Форматируем star t_time
        //     $end_date = "{$matches[6]}-{$matches[5]}-{$matches[4]}"; // Форматируем end_ time
        // }        
        // Генерация случайного числа
        var startDate = $('#start-time-hidden').text();
        var endDate = $('#end-time-hidden').text();
        const newEntry = `
            <div class="days-wrapper">
                <div class="work-time-info" style="pointer-events: none;">
                    <input type="hidden" class="work-time_date_start" name="${schedule}[special_time][${newIndex}][date_start]" value="${startDate}">
                    <input type="hidden" class="work-time_date_end" name="${schedule}[special_time][${newIndex}][date_end]" value="${endDate}">
                     <input type="hidden" class="work-time_time_start" name="${schedule}[special_time][${newIndex}][time_start]" value="${startTime}:00">
                    <input type="hidden" class="work-time_time_end" name="${schedule}[special_time][${newIndex}][time_end]" value="${endTime}:59">
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
        // Заменяем содержимое $daysWrapper на содержимое newEntry
        $daysWrapper.replaceWith(newEntry);
    } else {
        // Если $daysWrapper не существует, добавляем новый элемент
        workTimeContainer.append(newEntry);
    }
        
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
            updateScheduleInputs();
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
        $(this).closest('.days-wrapper').find(`.day input[type="checkbox"][name$="][week_day]"]`).removeAttr('disabled');
    });

        $(document).on('click', '.edit-work-time', function () {
            var parentWrapper = $(this).closest('.days-wrapper');
            
            // parentWrapper.find('.remove-work-time').addClass('can-remove');
            // parentWrapper.find('.can-remove').removeClass('remove-work-time');
            parentWrapper.find('.edit-work-time').addClass('check-work-time');
            parentWrapper.find('.check-work-time').removeClass('edit-work-time');
            parentWrapper.find('.day').removeClass('disabled');
            parentWrapper.find('.work-date').css({'pointer-events': 'all', 'color': '#515151',});
            updateStyles();

        });
    
        updateStyles();


//  // Функция для обновления стиля для всех чекбоксов
 function updateStyles() {
    $(`input[name$="][week_day]"]`).each(function() {
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
function disabled(parent) {
    $(parent).find(`input[name$="][week_day]"]`).each(function() {
        var isChecked = $(this).prop('checked'); // Получаем состояние чекбокса
        var dayCircle = $(this).siblings('.day-circle'); // Находим соседний div.day-circle
        $(parent).find(`input[name$="][week_day]"]`).not(this).prop('disabled', true);
        // parentWrapper.find('.edit-work-time').removeClass('check-work-time');
    });
}

// $(document).on('click', '.can-remove', function () {
//     var parentWrapper = $(this).closest('.days-wrapper');
//     parentWrapper.find(`input[type="checkbox"][name$="][day]"]`).prop('checked', false).prop('disabled', false);
//     updateStyles();
//     parentWrapper.find('input[type="time"]').val('00:00');;
// });

// // Обработчик события изменения состояния всех чекбоксов
$(document).on('change', `input[name$="][week_day]"]`, function() {
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
        });
        var startTime = parentWrapper.find('.start-time').val();
        var endTime = parentWrapper.find('.end-time').val();

        function timeToMinutes(time) {
            var parts = time.split(':');
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }

        if (!isAnyMatching) {
            // console.log("33"+isAnyMatching);
            var parentWrapper = $(this).closest('.days-wrapper');
            parentWrapper.find('.time-selection input[type="time"]').prop('disabled', true);
            $(this).closest('.days-wrapper').find(`.day input[type="checkbox"][name$="][week_day]"]`).addClass('disabled');

            // parentWrapper.find('.can-remove').addClass('remove-work-time');
            // parentWrapper.find('.remove-work-time').removeClass('can-remove');
            parentWrapper.find('.check-work-time').addClass('edit-work-time');
            parentWrapper.find('.edit-work-time').removeClass('check-work-time');
            parentWrapper.find('.disabled').removeClass('day');
            parentWrapper.find('.work-date').css({'pointer-events': 'none', 'color': '#BABABA',});
            disabled(parentWrapper);
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
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="1" disabled>
                    <div class="day-circle"><span class="day-name">Пн</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="2" disabled>
                    <div class="day-circle"><span class="day-name">Вт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="3" disabled>
                    <div class="day-circle"><span class="day-name">Ср</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="4" disabled>
                    <div class="day-circle"><span class="day-name">Чт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="5" disabled>
                    <div class="day-circle"><span class="day-name">Пт</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="6" disabled>
                    <div class="day-circle"><span class="day-name">Сб</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][][week_day]" value="7" disabled>
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

    // // Инициализация Flatp ickr для полей времени
    // $("input[type='time']") .flatpi ckr({
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
    // Получаем значения из span и проверяем их наличие
    var startDate = $('#start-time-hidden').text().trim();
    var endDate = $('#end-time-hidden').text().trim();

    // Устанавливаем текущую дату, если span пуст
    var defaultStartDate = startDate.length > 0 ? startDate : new Date().toISOString().split('T')[0];
    var defaultEndDate = endDate.length > 0 ? endDate : new Date().toISOString().split('T')[0];

    // Формируем массив с датами
    var defaultDate = [defaultStartDate, defaultEndDate];
    // console.log(defaultDate);
    // $('.work-date').on('click', function() {
    //     var startDate = $('#start-time-hidden').text().trim();
    //     var endDate = $('#end-time-hidden').text().trim();

    //     // Устанавливаем текущую дату, если span пуст
    //     var defaultStartDate = startDate.length > 0 ? startDate : new Date().toISOString().split('T')[0];
    //     var defaultEndDate = endDate.length > 0 ? endDate : new Date().toISOString().split('T')[0];

    //     // Формируем массив с датами
    //     defaultDate = [defaultStartDate, defaultEndDate];
    //     // console.log(defaultDate);
    // });
    // $('.work-date').on('click', function() {
    //             // При клике на .work-date обновляем defaultDate
    // // Проверяем, является ли calendars массивом или одиночным объектом
    // if (Array.isArray(calendars)) {
    //     calend ars.forEach(function(calendar) {
    //         calen dar.setDate(defaultDate, true); // Устанавливаем новую дефолтную дату
    //     });
    // } else {
    //     // Если это одиночный объект, применяем метод напрямую
    //     calend ars.setDate(defaultDate, true);
    // }

    // // Открываем календарь после изменения дефолтной даты
    // if (Array.isArray(calendars)) {
    //     calend ars.forEach(function(calendar) {
    //         calen dar.open();
    //     });
    // } else {
    //     calen dars.open();
    // }

    // console.log(calendars); // Для отладки
    // });
    // Инициализация календаря для модального окна
    const calendars = $(".calendar").flatpickr({
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
        altFormat: "d MMMM Y",
        defaultDate: defaultDate,
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                var [startDate, endDate] = selectedDates;
                // console.log(selectedDates);
                startDate = new Date(startDate);
                endDate = new Date(endDate);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedStart = startDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                const formattedEnd = endDate.toLocaleDateString('ru-RU', options).replace(' г.', '');
                // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
                const formattedStartHidden = startDate.getFullYear() + '-' + (startDate.getMonth() + 1).toString().padStart(2, '0') + '-' + startDate.getDate().toString().padStart(2, '0');
                const formattedEndHidden = endDate.getFullYear() + '-' + (endDate.getMonth() + 1).toString().padStart(2, '0') + '-' + endDate.getDate().toString().padStart(2, '0');

                const customText = `${formattedStart} - ${formattedEnd}`;
                // const hiddenText = `"sta rt_time" => "${formattedStartHidden}", "end_ time" => "${formattedEndHidden}"`;
                
                // Обновление текста в нужном элементе
                $("#selected-date").text(customText);
                $("#start-time-hidden").text(formattedStartHidden);
                // console.log(formattedStartHidden);
                $("#end-time-hidden").text(formattedEndHidden);
                // console.log(formattedEndHidden);
            } else if (selectedDates.length > 0) {
                var selectedDate = selectedDates[0]; // Выбираем только первую дату
                startDate = new Date(startDate);
                endDate = new Date(endDate);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = selectedDate.toLocaleDateString('ru-RU', options).replace(' г.', ''); // Форматируем дату
                const formattedStartHidden = startDate.getFullYear() + '-' + (startDate.getMonth() + 1).toString().padStart(2, '0') + '-' + startDate.getDate().toString().padStart(2, '0');
                const formattedEndHidden = endDate.getFullYear() + '-' + (endDate.getMonth() + 1).toString().padStart(2, '0') + '-' + endDate.getDate().toString().padStart(2, '0');

    
                // Обновление текста в нужном элементе
                $("#selected-date").text(formattedDate);
                $("#start-time-hidden").text(formattedStartHidden);
                // console.log(formattedStartHidden);
                $("#end-time-hidden").text(formattedEndHidden);
                // console.log(formattedEndHidden);
            }
        }
    });

    function updateScheduleInputs() {
        // Массив для хранения индексов активных элементов
        var activeIndexes = [];
        indexChecked=0;

        $('input[name*="[work_time]"][name*="time_end"]').remove();
        $('input[name*="[work_time]"][name*="time_start"]').remove();
    
        // Проходим по всем инпутам с нужным name
        $(`input[type="checkbox"][name$="][week_day]"]`).each(function(index, element) {

            // console.log("Проходим по всем инпутам снова0");

            // Проверяем, активен ли инпут (например, если он чекбокс или радио и он отмечен)
            if ($(element).is(':checked') && $(element).val() !== '') {

                // console.log("Проходим по всем инпутам снова0.1");
                activeIndexes.push(indexChecked++);  // Добавляем индекс активного элемента

            }
        });
    
        // Проходим по всем инпутам снова и присваиваем новые имена с индексами
        $(`input[type="checkbox"][name$="][week_day]"]`).each(function(i, element) {

            // console.log("Проходим по всем инпутам снова");

            if ($(element).is(':checked') && $(element).val() !== '') {

                var activeIndex = activeIndexes.shift(); // Получаем следующий индекс для time инпутов
                // Обновляем атрибут name, ставя индекс
                var newName = `${schedule}[work_time][${activeIndex}][week_day]`;
                $(element).attr('name', newName);
                
                // Находим ближайший родительский элемент .days-wrapper
                var $daysWrapper = $(element).closest('.days-wrapper');
                
                // Извлекаем значения времени из инпутов с классами .schedule-time.start-time и .schedule-time.end-time
                var startTime = $daysWrapper.find('.schedule-time.start-time').val() + ":00" || '00:00' + ":00"; // Если значение не указано, берем дефолтное
                var endTime = $daysWrapper.find('.schedule-time.end-time').val() + ":59" || '00:00' + ":59"; // То же для end-time
                // Добавляем инпуты time в блок time-selection
                if ($(element).is(':checked')) {
                                            // Проверяем, существует ли уже инпут для st art_time с данным activeIndex
                        var existingStartTimeInput = $(`input[name="${schedule}[work_time][${activeIndex}][time_start]"]`);
                        if (existingStartTimeInput.length > 0) {
                            // Если существует, заменяем значение
                            existingStartTimeInput.val(startTime);
                        } else {
                            // Если не существует, создаем новый инпут
                            var startTimeInput = $('<input>', {
                                type: 'time',
                                name: `${schedule}[work_time][${activeIndex}][time_start]`,
                                value: startTime,
                                disabled: true,
                                class:"hidden-checkbox"
                            });

                            // Добавляем его в блок с классом .time-selection
                            $('.time-selection').first().append(startTimeInput);
                            // console.log(startTimeInput);
                        }

                        // Аналогично для end_ time
                        var existingEndTimeInput = $(`input[name="${schedule}work_time][${activeIndex}][time_end]"]`);
                        if (existingEndTimeInput.length > 0) {
                            // Если существует, заменяем значение
                            existingEndTimeInput.val(endTime);
                        } else {
                            // Если не существует, создаем новый инпут
                            var endTimeInput = $('<input>', {
                                type: 'time',
                                name: `${schedule}[work_time][${activeIndex}][time_end]`,
                                value: endTime,
                                disabled: true,
                                class:"hidden-checkbox"
                            });

                            // Добавляем его в блок с классом .time-selection
                            $('.time-selection').first().append(endTimeInput);
                            // console.log(endTimeInput);
                        }
                }
            }
        });
        activeIndexes = [];

    }
    
        // Функция для обработки изменения значений
    function updateWorkTimeInfo(element) {
        // console.log('1');
        var $daysWrapper = $(element).closest('.days-wrapper');

        // Извлекаем значения времени из инпутов с классами .schedule-time.start-time и .schedule-time.end-time
        var startTime = $daysWrapper.find('.schedule-time.start-time').val() + ":00" || '00:00' + ":00"; // Если значение не указано, берем дефолтное
        var endTime = $daysWrapper.find('.schedule-time.end-time').val() + ":00" || '00:00' + ":00"; // То же для end-time

        // Получаем элемент .work-time-info в $daysWrapper
        var $workTimeInfo = $daysWrapper.find('.work-time-info');
            // console.log('2');
        if ($workTimeInfo.length > 0) {

            // console.log('3');
            // Добавляем инпуты time в блок time-selection
            // if ($(element).is(':checked')) {
                // Проверяем, существует ли уже инпут для start_time с данным activeIndex
                var existingStartTimeInput = $daysWrapper.find('.work-time_time_start');
                // console.log(existingStartTimeInput);
                if (existingStartTimeInput.length > 0) {
                    // Если существует, заменяем значение
                    existingStartTimeInput.val(startTime);
                    // console.log(startTime);
                                // Проверка, ввелось ли значение
                    if (existingStartTimeInput.val() === startTime) {
                        // console.log('start_time успешно обновлено:', startTime);
                    } else {
                        // console.log('Не удалось обновить start_time');
                    }
                } else {
                    // Если не существует, создаем новый инпут
                    var startTimeInput = $('<input>', {
                        type: 'time',
                        name: `${schedule}[special_time][][time_start]`,
                        value: startTime,
                        disabled: true,
                        class: "hidden-checkbox"
                    });

                    // Добавляем его в блок с классом .work-time-info (или .time-selection, если это нужно)
                    $('.work-time-info').append(startTimeInput); // Или $('.time-selection').append(startTimeInput); если нужен другой контейнер
                    // console.log(startTimeInput);
                }

                // Аналогично для end_time
                var existingEndTimeInput = $daysWrapper.find('.work-time_time_end');
                if (existingEndTimeInput.length > 0) {
                    // Если существует, заменяем значение
                    existingEndTimeInput.val(endTime);
                    // console.log(endTime);
                } else {
                    // Если не существует, создаем новый инпут
                    var endTimeInput = $('<input>', {
                        type: 'time',
                        name: `${schedule}[special_time][][time_end]`,
                        value: endTime,
                        disabled: true,
                        class: "hidden-checkbox"
                    });

                    // Добавляем его в блок с классом .work-time-info (или .time-selection, если это нужно)
                    $('.work-time-info').append(endTimeInput); // Или $('.time-selection').append(endTimeInput); если нужен другой контейнер
                    // console.log(endTimeInput);
                }
            // }
        } else {
            // console.log('Элемент .work-time-info не найден.');
        }

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
        updateWorkTimeInfo(this);
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