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
        <div id="special-time-container"></div>
        <div id="work-time-container"></div>
    <div class="button-group schedule-row d-flex align-items-center">
        <button type="button" class="btn btn-primary add-work-time button-calendar time-button-add">Добавить рабочие часы</button>
        <button type="button" class="btn btn-secondary add-special-time button-calendar add-special-day-button">Добавить особенные дни</button>
        <!-- <button class="add-time-button btn d-flex justify-content-center align-items-center w-50 p-0 mt-3 border border-dashed rounded-pill fw-semibold text-white" 
        style="background-color: #28B956; border-color: #28B956; height: 32px; font-size: 14px; cursor: pointer; transition: background-color 0.3s ease;">
            Текст кнопки
        </button> -->

    </div>

    <!--  -->
    <input type="hidden" name="<?= htmlspecialchars($name) ?>[work_times]" id="work-times-data">
    <input type="hidden" name="<?= htmlspecialchars($name) ?>[special_times]" id="special-times-data">

    </div>
</div>

<div class="calendar-modal-overlay" id="calendar-modal-overlay" aria-labelledby="modal-title" aria-describedby="modal-description" role="dialog">
        <div class="modal-wrapper">
            <h2 id="modal-title">Добавление особенного дня</h2>
            <p id="modal-description">Выберите день или период, когда режим работы не совпадает с рабочим днем или дополнительным интервалом.</p>
            <section class="calendar">
            <div class="icon-arrow arrow_back"></div>
                <article class="month">
                    <h3>Ноябрь 2024</h3>
                        <div class="weekdays"><div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div></div>
                        <div class="days">
                            <div></div><div></div><div></div><div></div><div>1</div><div>2</div><div>3</div>
                            <div>4</div><div>5</div><div>6</div><div>7</div>
                            <div>8</div><div>9</div><div>10</div>
                            <div>11</div><div>12</div><div>13</div><div>14</div>
                            <div>15</div><div>16</div><div>17</div>
                            <div>18</div><div>19</div><div>20</div><div>21</div>
                            <div>22</div><div>23</div><div>24</div>
                            <div>25</div><div>26</div><div>27</div><div>28</div>
                            <div>29</div><div>30</div>
                        </div>
                    </article>
                    <article class="month">
                    <h3>Декабрь 2024</h3>
                        <div class="weekdays"><div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div></div>
                        <div class="days">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div>1</div><div>2</div><div>3</div><div>4</div>
                            <div>5</div><div>6</div><div>7</div><div>8</div>
                            <div>9</div><div>10</div><div>11</div><div>12</div>
                            <div>13</div><div>14</div><div>15</div><div>16</div>
                            <div>17</div><div>18</div><div>19</div><div>20</div>
                            <div>21</div><div>22</div><div>23</div><div>24</div>
                            <div>25</div><div>26</div><div>27</div><div>28</div>
                            <div>29</div><div>30</div><div>31</div>
                        </div>
                    </article>
                <div class="icon-arrow arrow_forward"></div>
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