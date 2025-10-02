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

            }
        } else {

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
        console.log(33);

        // Получаем максимальный индекс или начинаем с нуля
        // console.log(get MaxIndex());
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
// При отправке формы удаляем неотмеченные дни
$(document).on('submit', 'form', function(event) {
    // event.preventDefault();

    const $form = $(this);
    console.log("Начало обработки формы");
    
    // Перебираем все блоки days-wrapper внутри формы
    $form.find('.days-wrapper').each(function() {
        const $widget = $(this);
        console.log("Обрабатываем блок:", $widget);
        
        // Находим первый чекбокс, чтобы извлечь префикс
        const $firstCheckbox = $widget.find('input[type="checkbox"][name*="[work_time]"]').first();
        if ($firstCheckbox.length === 0) {
            console.log("Чекбоксы не найдены");
            return;
        }
        
        const name = $firstCheckbox.attr('name');
        const prefixMatch = name.match(/^(.*?)\[work_time\]/);
        if (!prefixMatch) {
            console.log("Не удалось извлечь префикс");
            return;
        }
        
        const schedulePrefix = prefixMatch[1];
        console.log("Префикс:", schedulePrefix);
        
        // Создаем массив для хранения индексов отмеченных дней
        const checkedIndexes = [];
        
        // Сначала собираем все отмеченные индексы
        $widget.find(`input[name^="${schedulePrefix}[work_time]"][name$="[week_day]"]`).each(function() {
            const $checkbox = $(this);
            if ($checkbox.is(':checked')) {
                const nameAttr = $checkbox.attr('name');
                const indexMatch = nameAttr.match(/\[work_time\]\[(\d+)\]/);
                if (indexMatch) {
                    checkedIndexes.push(indexMatch[1]);
                }
            }
        });
        
        console.log("Отмеченные индексы:", checkedIndexes);
        
        // Теперь удаляем ВСЕ поля work_time
        $widget.find(`input[name^="${schedulePrefix}[work_time]"]`).remove();
        
        // И создаем заново только для отмеченных дней
        checkedIndexes.forEach(index => {
            // Добавляем чекбокс
            $widget.append(`<input type="checkbox" name="${schedulePrefix}[work_time][${index}][week_day]" value="${index}" checked="checked" style="display:none;">`);
            
            // Добавляем time_start и time_end
            // Здесь нужно взять реальные значения из ваших полей ввода времени
            const $timeSelection = $widget.find('.time-selection');
            const startTime = $timeSelection.find('.start-time').val() + ':00';
            const endTime = $timeSelection.find('.end-time').val() + ':59';
            
            $widget.append(`<input type="hidden" name="${schedulePrefix}[work_time][${index}][time_start]" value="${startTime}">`);
            $widget.append(`<input type="hidden" name="${schedulePrefix}[work_time][${index}][time_end]" value="${endTime}">`);
        });
        
        console.log("После обработки осталось полей:", $widget.find(`input[name^="${schedulePrefix}[work_time]"]`).length);
    });
    
    // Теперь отправляем форму
    // $form.unbind('submit').submit();
});

// $('form').on('submit', function() {
//     // Remove time fields for unchecked days
//     $(`input[name$="[time_start]"], input[name$="[time_end]"]`).each(function() {
//         const name = $(this).attr('name');
//         const dayIndex = name.match(/\[work_time\]\[(\d+)\]/)[1];
//         const $checkbox = $(`input[name="${name.replace(/\[(time_start|time_end)\]/, '[week_day]')}"]`);
        
//         if (!$checkbox.is(':checked')) {
//             // $(this).remove();
//         }
//     });
// });

    $('.action-row .switch').click(function() {
        var checkboxes = $(this).closest('.action-row').find('input[type="checkbox"]');
        
        checkboxes.each(function() {
            $(this).prop('checked', !$(this).prop('checked'));
        });
        
        $(this).toggleClass('active-shebule');
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
        
        $('.add-work-time').on('click', function () {   
            console.log("222");
            const parentWidget = $(this).closest('.schedule-widget-plain'); 
            const workTimeContainer = parentWidget.find('#work-time-container');
            const schedule = parentWidget.find('#schedule').text();
        
            const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
            
            let newEntry = `
            <div class="days-wrapper">
                <div class="weekday-group">`;
        
            daysOfWeek.forEach((dayName, index) => {
                const dayNumber = index + 1;
                newEntry += `
                    <label class="day">
                        <input type="checkbox" class="days-checkbox" name="${schedule}[work_time][${dayNumber}][week_day]" value="${dayNumber}" disabled>
                        <input type="hidden" name="${schedule}[work_time][${dayNumber}][time_start]" value="00:00">
                        <input type="hidden" name="${schedule}[work_time][${dayNumber}][time_end]" value="00:00">
                        <div class="day-circle"><span class="day-name">${dayName}</span></div>
                    </label>`;
            });
        
            // Rest of your HTML structure remains the same...
            newEntry += `
                </div>
                <div class="time-selection">
                    <input type="time" class="schedule-time start-time" value="00:00" disabled>
                    <div class="time-divider"></div>
                    <input type="time" class="schedule-time end-time" value="00:00" disabled>
                </div>
                <div class="action-buttons">
                    <button type="button" class="edit-work-time work-time-button" title="Редактировать"></button>
                    <button type="button" class="remove-work-time work-time-button" title="Удалить"></button>
                </div>
            </div>`;
        
            workTimeContainer.append(newEntry);
        });


    // Получаем значения из span и проверяем их наличие
    var startDate = $('#start-time-hidden').text().trim();
    var endDate = $('#end-time-hidden').text().trim();

    // Устанавливаем текущую дату, если span пуст
    var defaultStartDate = startDate.length > 0 ? startDate : new Date().toISOString().split('T')[0];
    var defaultEndDate = endDate.length > 0 ? endDate : new Date().toISOString().split('T')[0];

    // Формируем массив с датами
    var defaultDate = [defaultStartDate, defaultEndDate];

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
// 
function updateScheduleInputs() {

} 




// / Функция для обновления времени в work_time блоке
function updateWorkTimeBlock($block) {
    const startTime = $block.find('.start-time').val() + ':00';
    const endTime = $block.find('.end-time').val() + ':00';
    
    // Обновляем ВСЕ скрытые поля времени в этом блоке
    $block.find('input[name$="[time_start]"]').val(startTime);
    $block.find('input[name$="[time_end]"]').val(endTime);
}

// Обработчик изменения времени
$(document).on('change', '.days-wrapper .schedule-time.start-time, .days-wrapper .schedule-time.end-time', function() {
    const $block = $(this).closest('.days-wrapper');
    updateWorkTimeBlock($block);
});
    
        // Функция для обработки изменения значений
    function updateWorkTimeInfo(element) {
        console.log("44");
        // console.log('1');
        var $daysWrapper = $(element).closest('.days-wrapper');

        // Извлекаем значения времени из инпутов с классами .schedule-time.start-time и .schedule-time.end-time
        var startTime = $daysWrapper.find('.schedule-time.start-time').val() + ":00" || '00:00' + ":00"; // Если значение не указано, берем дефолтное
        var endTime = $daysWrapper.find('.schedule-time.end-time').val() + ":00" || '00:00' + ":00"; // То же для end-time

        // Получаем элемент .work-time-info в $daysWrapper
        var $workTimeInfo = $daysWrapper.find('.work-time-info');
            // console.log('2');
        if ($workTimeInfo.length > 0) {

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


    // Function to update all time fields in a work_time block
    function updateWorkTimeFields($block, startTime, endTime) {
        $block.find('input[name$="[time_start]"]').val(startTime + ':00');
        $block.find('input[name$="[time_end]"]').val(endTime + ':00');
    }

    // Event handler for time changes
    $(document).on('change', '.schedule-time.start-time, .schedule-time.end-time', function() {
        const $block = $(this).closest('.days-wrapper');
        const startTime = $block.find('.start-time').val();
        const endTime = $block.find('.end-time').val();
        
        updateWorkTimeFields($block, startTime, endTime);
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
});