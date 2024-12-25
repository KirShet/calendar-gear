<?php
/**
 * @var string $name
 * @var bool $enableTimeZone
 * @var bool $enableProductionCalendar
 */
?>
<div class="container">
    <div class="frame schedule-widget card p-3">
        <div class="header">Рабочие часы</div>
        <div class="sub-header">Установить рабочие часы</div>
        <div class="divider"></div>

        <div class="action-row">
            <div class="schedule-label">
                <label class="schedule-label">
                    <input type="checkbox" name="<?= htmlspecialchars($name) ?>[enable_time_zone]" value="1" <?= $enableTimeZone ? 'checked' : '' ?> class="hidden-checkbox">
                    Учитывать часовой пояс
                </label>
                <div data-tooltip="Всплывающая подсказка сообщает о чём-то многозначном и полезном..." class="icon-margin day disabled"></div>
            </div>
            <div class="switch <?php echo $enableTimeZone ? 'active' : ''; ?>" id="timezone-switch">
                <div class="switch-thumb"></div>
            </div>
        </div>

        <div class="action-row">
            <div class="schedule-label-with-icon">
                <label class="schedule-label">
                    <input type="checkbox" name="<?= htmlspecialchars($name) ?>[enable_production_calendar]" value="1" <?= $enableProductionCalendar ? 'checked' : '' ?> class="hidden-checkbox">
                    Использовать производственный календарь
                </label>
                <div data-tooltip="Всплывающая подсказка сообщает о чём-то многозначном и полезном..." class="icon-margin day disabled"></div>
            </div>
            <div class="switch <?php echo $enableProductionCalendar ? 'active' : ''; ?>">
                <div class="switch-thumb"></div>
            </div>
        </div>

        <div class="days-wrapper">
            <div class="weekday-group">
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Mon" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Пн</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Tue" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Вт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Wed" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Ср</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Thu" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Чт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Fri" disabled checked>
                    <div class="day-circle"><span class="day-name text-white">Пт</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Sat" disabled>
                    <div class="day-circle"><span class="day-name text-white">Сб</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="days-wrapper[0][days][]" value="Sun" disabled>
                    <div class="day-circle"><span class="day-name text-white">Вс</span></div>
                </label>
            </div>
            <div class="time-selection">
                <input type="time" name="days-wrapper[0][time-selection][]" value="12:00" disabled>
                <div class="time-divider"></div>
                <input type="time" name="days-wrapper[0][time-selection][]" value="19:00" disabled>
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
        <div id="special-time-container"></div>
        <div id="work-time-container"></div>
    <div class="button-group schedule-row d-flex align-items-center">
        <button type="button" class="btn btn-primary add-work-time button-calendar time-button-add">Добавить рабочие часы</button>
        <button type="button" class="btn btn-secondary add-special-time button-calendar add-special-day-button">Добавить особенные дни</button>
        <!-- <button type="button" class="add-work1">1</button> -->

    </div>

    <!--  -->
    <input type="hidden" name="<?= htmlspecialchars($name) ?>[work_times]" id="work-times-data">
    <input type="hidden" name="<?= htmlspecialchars($name) ?>[special_times]" id="special-times-data">

    </div>
</div>

<div class="calendar-modal-overlay" id="calendar-modal-overlay" aria-labelledby="modal-title" aria-describedby="modal-description" role="dialog">
        <div class="modal-wrapper">
            <div class="modal-header">
                <h2 id="modal-title">Добавление особенного дня</h2>
                <button class="calendar-cancel-btn calendar-close-btn"></button>
            </div>
            <p id="modal-description">Выберите день или период, когда режим работы не совпадает с рабочим днем или дополнительным интервалом.</p>
            <section class="calendar">
            </section>
            <section class="time-selection-wrapper">
                <span id="selected-date">10 декабря</span> с
                <input type="time" value="12:00">
                <span>до</span>
                <input type="time" value="19:00">
            </section>
            <div class="divider"></div>
            <div class="buttons">
                <button class="add-btn">Добавить</button>
                <button class="calendar-cancel-btn">Отменить</button>
            </div>
        </div>
</div>

<!-- Модальное окно подтверждения удаления -->
<div id="modal-overlay-message" class="modal-overlay-message">
    <div class="modal-content">
        <div class="modal-message">Вы хотите удалить это правило?</div>
        <div class="modal-buttons">
            <button class="cancel-btn">Отмена</button>
            <button class="delete-btn">Удалить</button>
        </div>
    </div>
</div>
<script>
// // клик на кнопке
document.querySelector('.add-work1').addEventListener('click', function(event) {
//     // данные формы в объект
//     const scheduleData = {
//         enable_time_zone: document.querySelector('input[name="schedule[enable_time_zone]"]').checked,
//         enable_production_calendar: document.querySelector('input[name="schedule[enable_production_calendar]"]').checked,
//         days: Array.from(document.querySelectorAll('input[name="days"]:checked')).map(day => day.value),
//         work_times: {
//             start_time: document.querySelector('.time-selection input[type="time"]:first-child').value,
//             end_time: document.querySelector('.time-selection input[type="time"]:last-child').value
//         }
//     };

//     //  данные в консоль проверки
//     console.log('Отправляемые данные:', scheduleData);

    // // нужно через AJAX
    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "/save_schedule", true);
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.onload = function () {
    //     if (xhr.status === 200) {
    //         console.log("отправлены");
    //     } else {
    //         console.log("Ошибка");
    //     }
    // };
    // xhr.send(JSON.stringify(scheduleData));

    // // стандартным методом
    // event.preventDefault();

        // Снятие "disabled" с чекбоксов
        let checkboxes = document.querySelectorAll('.days-wrapper input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.disabled = false;
        });

        // Снятие "disabled" с полей времени
        let timeFields = document.querySelectorAll('.days-wrapper input[type="time"]');
        timeFields.forEach(function(timeField) {
            timeField.disabled = false;
        });

    const form = document.getElementById('w0');
    form.submit();
});
</script>