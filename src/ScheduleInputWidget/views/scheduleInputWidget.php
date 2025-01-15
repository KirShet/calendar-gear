<?php
use yii\helpers\Html;
/** @var yii\base\Model $model */
/** @var bool $enableTimeZone */
/** @var bool $enableSpecialTime */
/** @var bool $enableProductionCalendar */
/** @var bool $allowMultipleItems */
/** @var string $header */
/** @var string $preheader */
// print_r($model);
?>
<div class="container">
    <div class="frame schedule-widget card p-3">
        <div class="header"><?= htmlspecialchars($header) ?></div>
        <div class="sub-header"><?= htmlspecialchars($preheader) ?></div>
        <div id="schedule"><?= htmlspecialchars($name)?></div>
        <div class="divider"></div>

    <?php if ($enableTimeZone): ?>
        <div class="action-row">
            <div class="schedule-label-with-icon">
                <label class="schedule-label">
                    <input type="checkbox" id="enable_time_zone" name="<?= $name ?>[enable_time_zone]" value="true"
                    <?= isset($model->schedule['enable_time_zone']) && $model->schedule['enable_time_zone'] ? 'checked' : '' ?> class="hidden-checkbox">
                    Учитывать часовой пояс
                </label>
                <div data-tooltip="Всплывающая подсказка сообщает о чём-то многозначном и полезном..."
                    class="icon-margin day disabled"></div>
            </div>
            <div class="switch <?= isset($model->schedule['enable_time_zone']) && $model->schedule['enable_time_zone'] ? 'active' : '' ?>" id="timezone-switch">
                <div class="switch-thumb"></div>
            </div>
        </div>
    <?php endif; ?>
    <?php if ($enableProductionCalendar): ?>
        <div class="action-row">
            <div class="schedule-label-with-icon">
                <label class="schedule-label">
                    <input type="checkbox" id="enable_production_calendar" name="<?= $name ?>[enable_production_calendar]" value="true"
                    <?= isset($model->schedule['enable_production_calendar']) && $model->schedule['enable_production_calendar'] ? 'checked' : '' ?> class="hidden-checkbox">
                    Использовать производственный календарь
                </label>
                <div data-tooltip="Всплывающая подсказка сообщает о чём-то многозначном и полезном..."
                    class="icon-margin day disabled"></div>
            </div>
            <div class="switch <?= isset($model->schedule['enable_production_calendar']) && $model->schedule['enable_production_calendar'] ? 'active' : '' ?>">
                <div class="switch-thumb"></div>
            </div>
        </div>
    <?php endif; ?>

        <div id="special-time-container">
            <?php
            ?>
            <?php

            $grouped_work_time = [];
            if (isset($model->schedule['work_time']) && is_array($model->schedule['work_time'])) {

                foreach ($model->schedule['work_time'] as $item) {
                    $key = $item['time_start'] . '|' . $item['time_end'];
                    if (!isset($grouped_work_time[$key])) {
                        $grouped_work_time[$key] = [
                            'time_start' => $item['time_start'],
                            'time_end' => $item['time_end'],
                            'week_day' => []
                        ];
                    }

                    $grouped_work_time[$key]['week_day'][] = $item['week_day'];
                }


                foreach ($grouped_work_time as $key => $group) {
                    ?>
                    <div class="days-wrapper">
                        <?php

                        if (substr($group['time_start'], -3) === ':00') {
                            $startTime = substr($group['time_start'], 0, -3); 
                        }

                        if (substr($group['time_end'], -3) === ':59') {
                            $endTime = substr($group['time_end'], 0, -3); 
                        }
                        ?>
                        <div class="weekday-group">
<?php 

$daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']; 
foreach ($daysOfWeek as $index => $day) {
    ?>
    <label class="day" >
        <input type="checkbox" class="days-checkbox" name="<?=$name?>[work_time][][week_day]" 
               value="<?php echo $index + 1; ?>" 
               id="day-<?php echo $index + 1; ?>" 
               <?php echo in_array($index + 1, $group['week_day']) ? 'checked' : ''; ?> disabled>
        <div class="day-circle">
            <span class="day-name text-white"><?php echo $day; ?></span>
        </div>
    </label>
    <?php
}
?>
                        </div>
                        <div class="time-selection">
                            <input type="time" class="schedule-time start-time"
                                value="<?php echo !empty($startTime) ? $startTime : '00:00'; ?>" disabled>
                            <div class="time-divider"></div>
                            <input type="time" class="schedule-time end-time"
                                value="<?php echo !empty($endTime) ? $endTime : '00:00'; ?>" disabled>
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
                        <?php
                }
            } else {
                ?>
                    <div class="days-wrapper">
                        <div class="weekday-group">

                        <?php 

$daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']; 
foreach ($daysOfWeek as $index => $day) {
    ?>
    <label class="day">
        <input type="checkbox" class="days-checkbox" name="<?=$name?>[work_time][][week_day]" 
               value="<?php echo $index + 1; ?>" 
               id="day-<?php echo $index + 1; ?>" 
                disabled>
        <div class="day-circle">
            <span class="day-name text-white"><?php echo $day; ?></span>
        </div>
    </label>
    <?php
}
?>
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
                        <?php
            }
            ?>
                </div>
            
            <div id="work-time-container">
                <?php
                if (isset($model->schedule['special_time']) && is_array($model->schedule['special_time'])) {
                    foreach ($model->schedule['special_time'] as $key => $timeSlot) {
                        $startDate = new DateTime($timeSlot['date_start'] . ' ' . $timeSlot['time_start']);
                        $endDate = new DateTime($timeSlot['date_end'] . ' ' . $timeSlot['time_end']);

                        $startFormatted = $startDate->format('j F Y');
                        $endFormatted = $endDate->format('j F Y');
                        // list($date_start, $time_start) = explode(' ', $timeSlot['time_start']);
                        // list($date_end, $time_end) = explode(' ', $timeSlot['time_end']);


                        $dateRange = ($startFormatted === $endFormatted) ? $startFormatted : $startFormatted . ' - ' . $endFormatted;


                        $startTime = $startDate->format('H:i');
                        $endTime = $endDate->format('H:i');

                        ?>
                        <div class="days-wrapper">
                            <div class="work-time-info" style="pointer-events: none;">
                                <input type="hidden" class="work-time_date_start" name="<?= $name ?>[special_time][<?php echo $key; ?>][date_start]"
                                    value="<?php echo $timeSlot['date_start'] ?>">
                                <input type="hidden" class="work-time_date_end" name="<?= $name ?>[special_time][<?php echo $key; ?>][date_end]"
                                    value="<?php echo  $timeSlot['date_end']; ?>">

                                    <input type="hidden" class="work-time_time_start" name="<?= $name ?>[special_time][<?php echo $key; ?>][time_start]"
                                    value="<?php echo $timeSlot['time_start']; ?>">
                                <input type="hidden" class="work-time_time_end" name="<?= $name ?>[special_time][<?php echo $key; ?>][time_end]"
                                    value="<?php echo $timeSlot['time_end']; ?>">
                                <span class="work-date"><?php echo $dateRange; ?></span>
                            </div>
                            <div class="time-selection">
                                <input type="time" class="schedule-time start-time" value="<?php echo $startTime; ?>"
                                    disabled="">
                                <div class="time-divider"></div>
                                <input type="time" class="schedule-time end-time" value="<?php echo $endTime; ?>" disabled="">
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
                        <?php
                    }
                }
                ?>

            </div>
            <div class="button-group schedule-row d-flex align-items-center">
            <?php if ($allowMultipleItems): ?>
                <button type="button" class="btn btn-primary add-work-time button-calendar time-button-add">Добавить
                    рабочие часы</button>
            <?php endif; ?>
            <?php if ($enableSpecialTime): ?>
                <button type="button"
                    class="btn btn-secondary add-special-time button-calendar add-special-day-button">Добавить особенные
                    дни</button>
            <?php endif; ?>
            </div>
        </div>

        <div class="calendar-modal-overlay" id="calendar-modal-overlay" aria-labelledby="modal-title"
            aria-describedby="modal-description" role="dialog">
            <div class="modal-wrapper">
                <div class="modal-header">
                    <h2 id="modal-title">Добавление особенного дня</h2>
                    <button type="button" class="calendar-cancel-btn calendar-close-btn"></button>
                </div>
                <p id="modal-description">Выберите день или период, когда режим работы не совпадает с рабочим днем или
                    дополнительным интервалом.</p>
                <section class="calendar">
                </section>
                <section class="time-selection-wrapper">
                    <span id="selected-date">10 декабря</span> с
                    <span id="start-time-hidden"></span>
                    <span id="end-time-hidden"></span>
                    <input type="time" value="00:00" id="startTime">
                    <span>до</span>
                    <input type="time" value="00:00" id="endTime">
                </section>
                <div class="divider"></div>
                <div class="buttons">
                    <button type="button" class="add-btn">Добавить</button>
                    <button type="button" class="calendar-cancel-btn">Отменить</button>
                </div>
            </div>
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
    