<?php
use yii\helpers\Html;
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


        <div id="special-time-container">
            <?php
                // $daysCount = array_count_values(array_column($work_time, 'days'));
            ?>
<!--  -->
<?php
// Массив для хранения уникальных комбинаций start_time и end_time
$grouped_work_time = [];
if (isset($model->schedule['special_time']) && is_array($model->schedule['special_time'])) {
// Группируем по start_time и end_time
foreach ($model->schedule['work_time'] as $item) {
    $key = $item['start_time'] . '|' . $item['end_time'];  // ключ по комбинации времени
    if (!isset($grouped_work_time[$key])) {
        $grouped_work_time[$key] = [
            'start_time' => $item['start_time'],
            'end_time' => $item['end_time'],
            'days' => []
        ];
    }
    // Добавляем день в группу
    $grouped_work_time[$key]['days'][] = $item['days'];
}

// Выводим HTML
foreach ($grouped_work_time as $key => $group) {
    ?>
    <div class="days-wrapper">
        <?php
                                // Удаляем последние три символа, если это ':00'
                                if (substr($group['start_time'], -3) === ':00') {
                                    $startTime = substr($group['start_time'], 0, -3);  // Удаляем последние 3 символа
                                }
        
                                if (substr($group['end_time'], -3) === ':00') {
                                    $endTime = substr($group['end_time'], 0, -3);  // Удаляем последние 3 символа
                                }
        ?>
            <div class="weekday-group">

                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="1" 
                        <?php echo in_array(1,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Пн</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="2" 
                        <?php echo in_array(2,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Вт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="3" 
                        <?php echo in_array(3,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Ср</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="4" 
                        <?php echo in_array(4,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Чт</span></div>
                </label>
                <label class="day">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="5" 
                        <?php echo in_array(5,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Пт</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="6" 
                        <?php echo in_array(6,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Сб</span></div>
                </label>
                <label class="day disabled">
                    <input type="checkbox" class="days-checkbox" name="schedule[work_time][][days]" value="7" 
                        <?php echo in_array(7,  $group['days']) ? 'checked' : ''; ?> disabled>
                    <div class="day-circle"><span class="day-name text-white">Вс</span></div>
                </label>
            </div>


            <div class="time-selection">
                

                    <!-- HTML форма с инпутами -->
                    <input type="time" class="schedule-time start-time" value="<?php echo !empty($startTime) ? $startTime : '00:00'; ?>" disabled>
                    <div class="time-divider"></div>
                    <input type="time" class="schedule-time end-time" value="<?php echo !empty($endTime) ? $endTime : '00:00'; ?>" disabled>
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
        <?php
}
}
?>
<!--  -->
        </div>
        <div id="work-time-container">
            <?php
            if (isset($model->schedule['special_time']) && is_array($model->schedule['special_time'])) {
                foreach ($model->schedule['special_time'] as $key => $timeSlot) {
                    $startDate = new DateTime($timeSlot['start_time']);
                    $endDate = new DateTime($timeSlot['end_time']);
                    
                    // Форматируем дату в нужном формате
                    $startFormatted = $startDate->format('j F Y');
                    $endFormatted = $endDate->format('j F Y');

                    // Определяем диапазон дат
                    $dateRange = ($startFormatted === $endFormatted) ? $startFormatted : $startFormatted . ' - ' . $endFormatted;

                    // Форматируем время
                    $startTime = $startDate->format('H:i');
                    $endTime = $endDate->format('H:i');

                    ?>
                    <div class="days-wrapper">
                        <div class="work-time-info">
                            <input type="hidden" name="schedule[special_time][<?php echo $key; ?>][start_time]" value="<?php echo $timeSlot['start_time']; ?>">
                            <input type="hidden" name="schedule[special_time][<?php echo $key; ?>][end_time]" value="<?php echo $timeSlot['end_time']; ?>">
                            <span class="work-date"><?php echo $dateRange; ?></span>
                        </div>
                        <div class="time-selection">
                            <input type="time" value="<?php echo $startTime; ?>" disabled="">
                            <div class="time-divider"></div>
                            <input type="time" value="<?php echo $endTime; ?>" disabled="">
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
                    <?php
                }
            }
            ?>
        </div>
    <div class="button-group schedule-row d-flex align-items-center">
        <button type="button" class="btn btn-primary add-work-time button-calendar time-button-add">Добавить рабочие часы</button>
        <button type="button" class="btn btn-secondary add-special-time button-calendar add-special-day-button">Добавить особенные дни</button>
        <button type="button" class="add-work1">1</button>

    </div>

    <!--  -->
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
                <span id="start-time-hidden"></span>
                <span id="end-time-hidden"></span>
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

        // Пример входных данных (аналогичные данным PHP)
const data = {
    schedule: {
        work_time: [
            {
                days: [1, 2, 3, 4, 5],
                start_time: "09:00",
                end_time: "18:00"
            }
        ],
        special_time: [
            {
                start_date: "2024-12-25",
                start_time: "10:00",
                end_date: "2024-12-25",
                end_time: "14:00"
            }
        ],
        enable_time_zone: 1,
        enable_production_calendar: 1
    }
};

// Функция для обработки данных
function formatSchedule(data) {
    let schedule = {};

    // Преобразуем рабочее время
    if (data.schedule && data.schedule.work_time) {
        schedule.work_time = [];
        data.schedule.work_time.forEach(work_time => {
            work_time.days.forEach(day => {
                schedule.work_time.push({
                    day: day,
                    start_time: work_time.start_time ? work_time.start_time + ":00" : "08:00:00",
                    end_time: work_time.end_time ? work_time.end_time + ":00" : "18:00:00"
                });
            });
        });
    }

    // Преобразуем специальные дни
    if (data.schedule && data.schedule.special_time) {
        schedule.special_time = [];
        data.schedule.special_time.forEach(special_day => {
            schedule.special_time.push({
                start_time: `${special_day.start_date} ${special_day.start_time}:00`,
                end_time: `${special_day.end_date} ${special_day.end_time}:00`
            });
        });
    }

    // Добавляем другие параметры
    if (data.schedule && data.schedule.enable_time_zone !== undefined) {
        schedule.enable_time_zone = parseInt(data.schedule.enable_time_zone);
    }

    if (data.schedule && data.schedule.enable_production_calendar !== undefined) {
        schedule.enable_production_calendar = parseInt(data.schedule.enable_production_calendar);
    }

    // Форматируем результат в нужный формат
    const formattedSchedule = {
        schedule: {
            work_time: schedule.work_time || [],
            special_time: schedule.special_time || [],
            enable_time_zone: schedule.enable_time_zone !== undefined ? schedule.enable_time_zone : 1,
            enable_production_calendar: schedule.enable_production_calendar !== undefined ? schedule.enable_production_calendar : 1
        }
    };

    return formattedSchedule;
}

// Формируем результат
const formattedSchedule = formatSchedule(data);

// Выводим результат в консоль
console.log(JSON.stringify(formattedSchedule, null, 2));

    const form = document.getElementById('w0');
    form.submit();
});
</script>