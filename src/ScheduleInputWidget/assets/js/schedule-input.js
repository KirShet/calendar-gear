$(document).ready(function () {
  const modalOverlay = $("#calendar-modal-overlay");
  const selectedDateSpan = $("#selected-date");
  const workTimeContainer = $("#work-time-container");
  const specialTimeContainer = $("#special-time-container");
  const schedule = $("#schedule").text();
  let firstDate = null;
  let secondDate = null;
  let $daysWrapper;
  let $workTimeContainer;
  let workItemToDelete = null;
  let $widget;
  let $modalOverlay;

  function removeInlineClass() {
    $(".flatpickr-calendar").removeClass("inline");
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.matches(".flatpickr-calendar")) {
            removeInlineClass();
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  removeInlineClass();

  const flatpickrConfig = {
    inline: true,
    locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        longhand: [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
        ],
      },
      months: {
        shorthand: [
          "Янв",
          "Фев",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек",
        ],
        longhand: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
      },
    },

    mode: "range",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d MMMM Y",
    defaultDate: defaultDate,
    onChange: function (selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        var [startDate, endDate] = selectedDates;

        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedStart = startDate
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");
        const formattedEnd = endDate
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");

        const formattedStartHidden =
          startDate.getFullYear() +
          "-" +
          (startDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          startDate.getDate().toString().padStart(2, "0");
        const formattedEndHidden =
          endDate.getFullYear() +
          "-" +
          (endDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          endDate.getDate().toString().padStart(2, "0");

        const customText = `${formattedStart} - ${formattedEnd}`;

        $("#selected-date").text(customText);
        $("#start-time-hidden").text(formattedStartHidden);

        $("#end-time-hidden").text(formattedEndHidden);
      } else if (selectedDates.length > 0) {
        var selectedDate = selectedDates[0];
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = selectedDate
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");
        const formattedStartHidden =
          startDate.getFullYear() +
          "-" +
          (startDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          startDate.getDate().toString().padStart(2, "0");
        const formattedEndHidden =
          endDate.getFullYear() +
          "-" +
          (endDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          endDate.getDate().toString().padStart(2, "0");

        $("#selected-date").text(formattedDate);
        $("#start-time-hidden").text(formattedStartHidden);

        $("#end-time-hidden").text(formattedEndHidden);
      }
    },
  };

  $(document).on("click", ".work-days-btn, .work-date", function () {
    $widget = $(this).closest(".container-schedule");
    const calendarElement4 = $widget.find(".calendar")[0];

    if (calendarElement4 && !calendarElement4._flatpickr && window.flatpickr) {
      var startDate = $("#start-time-hidden").text().trim();
      var endDate = $("#end-time-hidden").text().trim();

      var defaultStartDate =
        startDate.length > 0
          ? startDate
          : new Date().toISOString().split("T")[0];
      var defaultEndDate =
        endDate.length > 0 ? endDate : new Date().toISOString().split("T")[0];

      var defaultDate = [defaultStartDate, defaultEndDate];

      const calendar = flatpickr(calendarElement4, {
        inline: true,
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            longhand: [
              "Воскресенье",
              "Понедельник",
              "Вторник",
              "Среда",
              "Четверг",
              "Пятница",
              "Суббота",
            ],
          },
          months: {
            shorthand: [
              "Янв",
              "Фев",
              "Мар",
              "Апр",
              "Май",
              "Июн",
              "Июл",
              "Авг",
              "Сен",
              "Окт",
              "Ноя",
              "Дек",
            ],
            longhand: [
              "Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Май",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь",
            ],
          },
        },

        mode: "range",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d MMMM Y",
        defaultDate: defaultDate,
        onChange: function (selectedDates, dateStr, instance) {
          if (selectedDates.length === 2) {
            var [startDate, endDate] = selectedDates;

            startDate = new Date(startDate);
            endDate = new Date(endDate);
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedStart = startDate
              .toLocaleDateString("ru-RU", options)
              .replace(" г.", "");
            const formattedEnd = endDate
              .toLocaleDateString("ru-RU", options)
              .replace(" г.", "");

            const formattedStartHidden =
              startDate.getFullYear() +
              "-" +
              (startDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              startDate.getDate().toString().padStart(2, "0");
            const formattedEndHidden =
              endDate.getFullYear() +
              "-" +
              (endDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              endDate.getDate().toString().padStart(2, "0");

            const customText = `${formattedStart} - ${formattedEnd}`;

            $("#selected-date").text(customText);
            $("#start-time-hidden").text(formattedStartHidden);

            $("#end-time-hidden").text(formattedEndHidden);
          } else if (selectedDates.length > 0) {
            var selectedDate = selectedDates[0];
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedDate = selectedDate
              .toLocaleDateString("ru-RU", options)
              .replace(" г.", "");
            const formattedStartHidden =
              startDate.getFullYear() +
              "-" +
              (startDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              startDate.getDate().toString().padStart(2, "0");
            const formattedEndHidden =
              endDate.getFullYear() +
              "-" +
              (endDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              endDate.getDate().toString().padStart(2, "0");

            $("#selected-date").text(formattedDate);
            $("#start-time-hidden").text(formattedStartHidden);

            $("#end-time-hidden").text(formattedEndHidden);
          }
        },
      });

      calendars.push(calendar);
    }

    $modalOverlay = $widget.find(".calendar-modal-overlay");
    const $modalOverlay1 = $widget.find(".calendar-modal-overlay");

    const $selectedDateSpan = $widget.find(".selected-date");
    $workTimeContainer = $widget.find("#work-time-container");
    let $daysWrapper = $(this).closest("div.days-wrapper");

    const calendarElement = $widget.find(".calendar")[0];

    if (calendarElement && calendarElement._flatpickr) {
      let calendar6 = calendarElement._flatpickr;
    }

    const calendar = calendars.find((cal) => cal.element === calendarElement);

    let calendar2 = $widget.data("calendar");

    const calendarElement3 = $widget.find(".flatpickr-calendar")[0];

    const calendar3 = calendarElement3 ? calendarElement3._flatpickr : null;

    $('.time-selection-wrapper input[type="time"]').val("00:00");
    $modalOverlay.addClass("show");

    $daysWrapper = $(this).closest("div.days-wrapper");

    setTimeout(() => {
      $widget.find(".flatpickr-calendar").first().addClass("inline");
    }, 100);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = new Date();
    const formattedDate = currentDate
      .toLocaleDateString("ru-RU", options)
      .replace(" г.", "");

    const parent = $(this).closest("div");
    if (parent.length > 0) {
      const schedulePref = $widget.find("#schedule").text();

      const startTimeInput = parent.find(
        `input[name^="${schedulePref}[special_time]"][name$="[time_start]"]`
      );

      const endTimeInput = parent.find(
        `input[name^="${schedulePref}[special_time]"][name$="[time_end]"]`
      );

      const startDateInput = parent.find(
        `input[name^="${schedulePref}[special_time]"][name$="[date_start]"]`
      );

      const endDateInput = parent.find(
        `input[name^="${schedulePref}[special_time]"][name$="[date_end]"]`
      );

      const startTime = startTimeInput.val();

      const endTime = endTimeInput.val();

      const startDateValue = startDateInput.val();

      const endDateValue = endDateInput.val();

      if (startTime && endTime && startDateValue && endDateValue) {
        const startDateTime = new Date(startTime + " " + startDateValue);
        const endDateTime = new Date(endTime + " " + endDateValue);

        const options = { day: "numeric", month: "long", year: "numeric" };

        const startFormatted = startDateTime
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");

        const endFormatted = endDateTime
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");

        const startDate = startDateTime.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endDate = endDateTime.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        });

        $widget.find(".time-selection-wrapper input#startTime").val(startDate);
        $widget.find(".time-selection-wrapper input#endTime").val(endDate);

        var defaultStartDate =
          startDateValue.length > 0
            ? startDateValue
            : new Date().toISOString().split("T")[0];
        var defaultEndDate =
          endDateValue.length > 0
            ? endDateValue
            : new Date().toISOString().split("T")[0];
        var defaultDate = [defaultStartDate, defaultEndDate];

        startDateValue1 = new Date(startDateValue);
        endDateValue1 = new Date(endDateValue);

        if (startFormatted === endFormatted) {
          $("#selected-date").text(startFormatted);
          $("#start-time-hidden").text("11");

          $("#end-time-hidden").text("11");
        } else {
          $("#selected-date").text(`${startFormatted} - ${endFormatted}`);
          $("#start-time-hidden").text("11");

          $("#end-time-hidden").text("11");
        }

        if (calendar) {
          calendar.setDate(defaultDate, true);
        }
      } else {
        $selectedDateSpan.text(formattedDate);

        if (calendar) {
          calendar.setDate([currentDate, currentDate], true);
        }
      }
    } else {
    }
  });

  $(document).on("click", ".holidays-btn", function (e) {});

  function resetDates() {
    firstDate = null;
    secondDate = null;
    $(".days .green-selected").removeClass("green-selected");
  }

  $(".days div").on("click", function () {
    const month = $(this).closest(".month").find("h3").text();
    const dayNumber = $(this).text();

    if (!firstDate) {
      firstDate = `${dayNumber} ${month}`;
      $(this).addClass("green-selected");
      selectedDateSpan.text(`${firstDate}`);
    } else if (!secondDate) {
      secondDate = `${dayNumber} ${month}`;
      $(this).addClass("green-selected");
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
  var randomValue = 0;

  $(document).on("click", ".add-btn", function () {
    function getMaxIndex() {
      let maxIndex = 0;
      $(`input[name^="${schedule}[special_time]"][name$="[time_start]"]`).each(
        function () {
          const match = $(this)
            .attr("name")
            .match(/\[special_time\]\[(\d+)\]\[time_start\]/);

          if (match) {
            const index = parseInt(match[1], 10);

            if (index > maxIndex) {
              maxIndex = index;
            }
          }
        }
      );
      return maxIndex;
    }

    let schedule = $widget.find("#schedule").text();

    let maxIndex = getMaxIndex();
    const newIndex = maxIndex + 1;

    const selectedDate = selectedDateSpan.text();

    const startTime = modalOverlay.find('input[type="time"]').eq(0).val();

    const endTime = modalOverlay.find('input[type="time"]').eq(1).val();

    if (!startTime || !endTime) {
      alert("Пожалуйста, заполните все временные поля.");
      return;
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var startDate = $("#start-time-hidden").text();
    var endDate = $("#end-time-hidden").text();
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

    if ($daysWrapper && $daysWrapper.length) {
      $daysWrapper.replaceWith(newEntry);
    } else {
      $workTimeContainer.append(newEntry);
    }

    $modalOverlay.removeClass("show");
    resetDates();
    removeInlineClass();
    removeFlatpickrClasses();
  });

  $(document).ready(function () {
    let modalMessage;

    // Удаление рабочей записи
    $(document).on("click", ".remove-work-time", function () {
      workItemToDelete = $(this).closest(".days-wrapper");
      modalMessage = $(this).closest(".action-buttons").next("div"); // Присваиваем значение переменной
      modalMessage.addClass("show");
    });

    // Используем делегирование события на родительский элемент (например, body)
    $(document).on("click", ".delete-btn", function () {
      if (workItemToDelete) {
          // Проверяем, что это праздничный блок
          if (workItemToDelete.find(".work-date").text().trim() === "Праздничные дни") {
              // Показываем кнопку снова
              const parentWidget = workItemToDelete.closest(".schedule-widget-plain");
              parentWidget.find(".holidays-btn").show();
          }
  
          workItemToDelete.remove();
      }
  
      if (modalMessage) {
          modalMessage.removeClass("show");
      }
      updateScheduleInputs();
    });

    // Закрытие модального окна
    $(document).on("click", ".cancel-btn", function () {
      if (modalMessage) {
        // Добавляем проверку на null или undefined
        modalMessage.removeClass("show");
      }
    });
  });

  // Закрытие модального окна
  $(document).on("click", ".calendar-cancel-btn", function () {
    // $('.calendar-cancel-btn').on('click', function () {
    $modalOverlay.removeClass("show");
    removeInlineClass();
    removeFlatpickrClasses();
  });

  $("form").on("submit", function (event) {
    //
    $('.days-wrapper input[type="checkbox"]').prop("disabled", false);

    // Снятие "disabled" с полей времени
    $('.days-wrapper input[type="time"]').prop("disabled", false);
    //
  });
  // При отправке формы удаляем неотмеченные дни
  $(document).on("submit", "form", function (event) {
    // event.preventDefault();

    const $form = $(this);

    // Перебираем все блоки days-wrapper внутри формы
    $form.find(".days-wrapper").each(function () {
      const $widget = $(this);

      // Находим первый чекбокс, чтобы извлечь префикс
      const $firstCheckbox = $widget
        .find('input[type="checkbox"][name*="[work_time]"]')
        .first();
      if ($firstCheckbox.length === 0) {
        return;
      }

      const name = $firstCheckbox.attr("name");
      const prefixMatch = name.match(/^(.*?)\[work_time\]/);
      if (!prefixMatch) {
        return;
      }

      const schedulePrefix = prefixMatch[1];

      // Создаем массив для хранения индексов отмеченных дней
      const checkedIndexes = [];

      // Сначала собираем все отмеченные индексы
      $widget
        .find(`input[name^="${schedulePrefix}[work_time]"][name$="[week_day]"]`)
        .each(function () {
          const $checkbox = $(this);
          if ($checkbox.is(":checked")) {
            const nameAttr = $checkbox.attr("name");
            const indexMatch = nameAttr.match(/\[work_time\]\[(\d+)\]/);
            if (indexMatch) {
              checkedIndexes.push(indexMatch[1]);
            }
          }
        });

      // Теперь удаляем ВСЕ поля work_time
      $widget.find(`input[name^="${schedulePrefix}[work_time]"]`).remove();

      // И создаем заново только для отмеченных дней
      checkedIndexes.forEach((index) => {
        // Добавляем чекбокс
        $widget.append(
          `<input type="checkbox" name="${schedulePrefix}[work_time][${index}][week_day]" value="${index}" checked="checked" style="display:none;">`
        );

        // Добавляем time_start и time_end
        // Здесь нужно взять реальные значения из ваших полей ввода времени
        const $timeSelection = $widget.find(".time-selection");
        const startTime = $timeSelection.find(".start-time").val() + ":00";
        const endTime = $timeSelection.find(".end-time").val() + ":59";

        $widget.append(
          `<input type="hidden" name="${schedulePrefix}[work_time][${index}][time_start]" value="${startTime}">`
        );
        $widget.append(
          `<input type="hidden" name="${schedulePrefix}[work_time][${index}][time_end]" value="${endTime}">`
        );
      });
    });

    // Теперь отправляем форму
    // $form.unbind('submit').submit();
  });

  $(".action-row .switch").click(function () {
    var checkboxes = $(this)
      .closest(".action-row")
      .find('input[type="checkbox"]');

    checkboxes.each(function () {
      $(this).prop("checked", !$(this).prop("checked"));
    });

    $(this).toggleClass("active-shebule");
  });

  $(document).on("click", ".edit-work-time", function () {
    var parentWrapper = $(this).closest(".days-wrapper");
    parentWrapper
      .find('.time-selection input[type="time"]')
      .prop("disabled", false);
    $(this)
      .closest(".days-wrapper")
      .find(`.day input[type="checkbox"][name$="][week_day]"]`)
      .removeAttr("disabled");
  });

  $(document).on("click", ".edit-work-time", function () {
    var parentWrapper = $(this).closest(".days-wrapper");

    // parentWrapper.find('.remove-work-time').addClass('can-remove');
    // parentWrapper.find('.can-remove').removeClass('remove-work-time');
    parentWrapper.find(".edit-work-time").addClass("check-work-time");
    parentWrapper.find(".check-work-time").removeClass("edit-work-time");
    parentWrapper.find(".day").removeClass("disabled");
    parentWrapper
      .find(".work-date")
      .css({ "pointer-events": "all", color: "#515151" });
    updateStyles();
  });

  updateStyles();

  //  // Функция для обновления стиля для всех чекбоксов
  function updateStyles() {
    $(`input[name$="][week_day]"]`).each(function () {
      var isChecked = $(this).prop("checked"); // Получаем состояние чекбокса
      var dayCircle = $(this).siblings(".day-circle"); // Находим соседний div.day-circle
      if (isChecked) {
        // Если чекбокс включен, добавляем классы
        dayCircle.addClass("highlighted-circle");
        dayCircle.find(".day-name").addClass("text-white");
      } else {
        // Если чекбокс выключен, убираем классы
        dayCircle.removeClass("highlighted-circle");
        dayCircle.find(".day-name").removeClass("text-white");
      }
    });
  }
  function disabled(parent) {
    $(parent)
      .find(`input[name$="][week_day]"]`)
      .each(function () {
        var isChecked = $(this).prop("checked"); // Получаем состояние чекбокса
        var dayCircle = $(this).siblings(".day-circle"); // Находим соседний div.day-circle
        $(parent)
          .find(`input[name$="][week_day]"]`)
          .not(this)
          .prop("disabled", true);
        // parentWrapper.find('.edit-work-time').removeClass('check-work-time');
      });
  }

  $(document).on("change", `input[name$="][week_day]"]`, function () {
    updateStyles();
  });

  $(document).on("change", ".checkbox", function () {
    if (!$(this).prop("disabled")) {
      // Убираем старые классы enabled
      $(this).removeClass("enabled-on enabled-off");
      // Добавляем новый класс
      $(this).addClass($(this).is(":checked") ? "enabled-on" : "enabled-off");

      // Находим div day-circle в том же родительском day
      const $dayCircle = $(this).closest(".day").find(".day-circle");
      if ($(this).is(":checked")) {
        $dayCircle.addClass("circle-checked").removeClass("circle-unchecked");
      } else {
        $dayCircle.addClass("circle-unchecked").removeClass("circle-checked");
      }
    }
  });

  // Редактирование праздничного времени
  $(document).on("click", ".edit-holiday-time", function () {
    const parentWrapper = $(this).closest(".days-wrapper");

    // Активируем поля для редактирования
    parentWrapper
      .find('.time-selection input[type="time"]')
      .prop("disabled", false);
    parentWrapper
      .find(".work-time-info")
      .css({ "pointer-events": "all", color: "#515151" });

    // Меняем кнопку на "проверку"
    parentWrapper
      .find(".edit-holiday-time")
      .addClass("check-holiday-time")
      .removeClass("edit-holiday-time");

    // Визуальное обновление (если у тебя есть функция updateStyles — она применится)
    if (typeof updateStyles === "function") updateStyles();
  });

  // Удаление праздничного блока
  $(document).on("click", ".remove-holiday-time", function () {
    workItemToDelete = $(this).closest(".days-wrapper");
    modalMessage = $(this).closest(".action-buttons").next("div"); // Присваиваем значение переменной
    modalMessage.addClass("show");
  });

  // Подтверждение изменений праздничного времени
  $(document).on("click", ".check-holiday-time", function () {
    const parentWrapper = $(this).closest(".days-wrapper");
    let startTime = parentWrapper.find(".start-time").val();
    let endTime = parentWrapper.find(".end-time").val();

    // Очистка возможных визуальных эффектов
    parentWrapper
      .find('.time-selection input[type="time"]')
      .removeClass("border-thick-slow");

    // Проверка на валидность
    const timeToMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    // Если всё в порядке — блокируем редактирование обратно
    parentWrapper
      .find('.time-selection input[type="time"]')
      .prop("disabled", true);
    parentWrapper
      .find(".work-time-info")
      .css({ "pointer-events": "none", color: "#BABABA" });

    // Возврат кнопки в исходное состояние
    parentWrapper
      .find(".check-holiday-time")
      .addClass("edit-holiday-time")
      .removeClass("check-holiday-time");

    // Если у тебя есть функция disabled() — применяем её
    if (typeof disabled === "function") disabled(parentWrapper);
  });

  $(document).on("click", ".check-work-time", function () {
    let isAnyMatching = false;
    // Найти ближайший родительский элемент с классом .days-wrapper
    var parentWrapper = $(this).closest(".days-wrapper");

    parentWrapper.find('.time-selection input[type="time"]').each(function () {
      let value = $(this).val();

      // Убираем класс 'border-thick-slow'
      $(this).removeClass("border-thick-slow");
    });
    var startTime = parentWrapper.find(".start-time").val();
    var endTime = parentWrapper.find(".end-time").val();

    function timeToMinutes(time) {
      var parts = time.split(":");
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    if (!isAnyMatching) {
      var parentWrapper = $(this).closest(".days-wrapper");
      parentWrapper
        .find('.time-selection input[type="time"]')
        .prop("disabled", true);
      $(this)
        .closest(".days-wrapper")
        .find(`.day input[type="checkbox"][name$="][week_day]"]`)
        .addClass("disabled");

      // parentWrapper.find('.can-remove').addClass('remove-work-time');
      // parentWrapper.find('.remove-work-time').removeClass('can-remove');
      parentWrapper.find(".check-work-time").addClass("edit-work-time");
      parentWrapper.find(".edit-work-time").removeClass("check-work-time");
      parentWrapper.find(".disabled").removeClass("day");
      parentWrapper
        .find(".work-date")
        .css({ "pointer-events": "none", color: "#BABABA" });
      disabled(parentWrapper);
    }
  });
  // Функция для генерации случайного числа в определённом диапазоне
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  $(document).on("click", ".add-work-time", function () {
    const parentWidget = $(this).closest(".schedule-widget-plain");
    const workTimeContainer = parentWidget.find("#special-time-container");
    const schedule = parentWidget.find("#schedule").text();
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

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
                  <div id="modal-overlay-message" class="modal-overlay-message">
                        <div class="modal-content">
                            <div class="modal-message">Вы хотите удалить это правило?</div>
                            <div class="modal-buttons">
                            <button type="button" class="cancel-btn">Отмена</button>
                            <button type="button" class="delete-btn">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>`;

    workTimeContainer.append(newEntry);
  });

  // Добавление блока "Праздничные дни"
  $(document).on("click", ".holidays-btn", function () {
    // Находим родительский виджет
    const parentWidget = $(this).closest(".schedule-widget-plain");
    const holidayContainer = parentWidget.find("#holiday-time-container");
    const schedule = parentWidget.find("#schedule").text().trim();

    // Если контейнера нет — создаём его
    if (!holidayContainer.length) {
      parentWidget.append('<div id="holiday-time-container"></div>');
    }

    // Обновляем ссылку на контейнер (вдруг только что создали)
    const $holidayContainer = parentWidget.find("#holiday-time-container");

    // Проверка: если уже есть хотя бы один .days-wrapper с праздничными — не добавляем повторно
    if ($holidayContainer.find(".days-wrapper").length > 0) {
      return;
    }

    // Текущая дата
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const defaultTime = "00:00";

    // Создаём новый HTML-блок (по структуре PHP-кода)
    const newHolidayEntry = `
        <div class="days-wrapper">
            <div class="work-time-info" style="pointer-events: none;">

                <input type="hidden" class="work-time_time_start" 
                       name="${schedule}[production_holidays_time][0][time_start]" 
                       value="${defaultTime}">
                <input type="hidden" class="work-time_time_end" 
                       name="${schedule}[production_holidays_time][0][time_end]" 
                       value="${defaultTime}">

                <span class="work-date">Праздничные дни</span>
            </div>

            <div class="time-selection">
                <input type="time" class="schedule-time start-time" value="${defaultTime}" disabled>
                <div class="time-divider"></div>
                <input type="time" class="schedule-time end-time" value="${defaultTime}" disabled>
            </div>
            <div class="action-buttons">
                <button type="button" class="edit-holiday-time work-time-button" title="Редактировать"></button>
                <button type="button" class="remove-holiday-time work-time-button" title="Удалить"></button>
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
    // Переносим блок с праздниками ПЕРЕД кнопками, если нужно
    const buttonGroup = parentWidget.find(".button-group");
    $holidayContainer.insertBefore(buttonGroup);
    // Добавляем блок
    $holidayContainer.append(newHolidayEntry);
    $(this).hide();
  });

  // Получаем значения из span и проверяем их наличие
  var startDate = $("#start-time-hidden").text().trim();
  var endDate = $("#end-time-hidden").text().trim();

  // Устанавливаем текущую дату, если span пуст
  var defaultStartDate =
    startDate.length > 0 ? startDate : new Date().toISOString().split("T")[0];
  var defaultEndDate =
    endDate.length > 0 ? endDate : new Date().toISOString().split("T")[0];

  // Формируем массив с датами
  var defaultDate = [defaultStartDate, defaultEndDate];

  // Инициализация календаря для модального окна
  const calendars = $(".calendar").flatpickr({
    inline: true, // Режим отображения календаря
    locale: {
      firstDayOfWeek: 1, // Неделя начинается с понедельника
      weekdays: {
        shorthand: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        longhand: [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
        ],
      },
      months: {
        shorthand: [
          "Янв",
          "Фев",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек",
        ],
        longhand: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
      },
    },

    mode: "range", // Выбор диапазона
    dateFormat: "Y-m-d", // Внутренний формат данных
    altInput: true, // Показывать отформатированную строку
    altFormat: "d MMMM Y",
    defaultDate: defaultDate,
    onChange: function (selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        var [startDate, endDate] = selectedDates;

        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedStart = startDate
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");
        const formattedEnd = endDate
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");
        // Форматируем дату для отображения в нужном формате (например, 2024-11-07)
        const formattedStartHidden =
          startDate.getFullYear() +
          "-" +
          (startDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          startDate.getDate().toString().padStart(2, "0");
        const formattedEndHidden =
          endDate.getFullYear() +
          "-" +
          (endDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          endDate.getDate().toString().padStart(2, "0");

        const customText = `${formattedStart} - ${formattedEnd}`;
        // const hiddenText = `"sta rt_time" => "${formattedStartHidden}", "end_ time" => "${formattedEndHidden}"`;

        // Обновление текста в нужном элементе
        $("#selected-date").text(customText);
        $("#start-time-hidden").text(formattedStartHidden);

        $("#end-time-hidden").text(formattedEndHidden);
      } else if (selectedDates.length > 0) {
        var selectedDate = selectedDates[0];
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = selectedDate
          .toLocaleDateString("ru-RU", options)
          .replace(" г.", "");
        const formattedStartHidden =
          startDate.getFullYear() +
          "-" +
          (startDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          startDate.getDate().toString().padStart(2, "0");
        const formattedEndHidden =
          endDate.getFullYear() +
          "-" +
          (endDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          endDate.getDate().toString().padStart(2, "0");

        $("#selected-date").text(formattedDate);
        $("#start-time-hidden").text(formattedStartHidden);

        $("#end-time-hidden").text(formattedEndHidden);
      }
    },
  });

  function updateScheduleInputs() {}

  function updateWorkTimeBlock($block) {
    const startTime = $block.find(".start-time").val() + ":00";
    const endTime = $block.find(".end-time").val() + ":00";

    $block.find('input[name$="[time_start]"]').val(startTime);
    $block.find('input[name$="[time_end]"]').val(endTime);
  }

  $(document).on(
    "change",
    ".days-wrapper .schedule-time.start-time, .days-wrapper .schedule-time.end-time",
    function () {
      const $block = $(this).closest(".days-wrapper");
      updateWorkTimeBlock($block);
    }
  );

  function updateWorkTimeInfo(element) {
    var $daysWrapper = $(element).closest(".days-wrapper");

    var startTime =
      $daysWrapper.find(".schedule-time.start-time").val() + ":00" ||
      "00:00" + ":00";
    var endTime =
      $daysWrapper.find(".schedule-time.end-time").val() + ":00" ||
      "00:00" + ":00";

    var $workTimeInfo = $daysWrapper.find(".work-time-info");

    if ($workTimeInfo.length > 0) {
      var existingStartTimeInput = $daysWrapper.find(".work-time_time_start");

      if (existingStartTimeInput.length > 0) {
        existingStartTimeInput.val(startTime);

        if (existingStartTimeInput.val() === startTime) {
        } else {
        }
      } else {
        var startTimeInput = $("<input>", {
          type: "time",
          name: `${schedule}[special_time][][time_start]`,
          value: startTime,
          disabled: true,
          class: "hidden-checkbox",
        });

        $(".work-time-info").append(startTimeInput);
      }

      var existingEndTimeInput = $daysWrapper.find(".work-time_time_end");
      if (existingEndTimeInput.length > 0) {
        existingEndTimeInput.val(endTime);
      } else {
        var endTimeInput = $("<input>", {
          type: "time",
          name: `${schedule}[special_time][][time_end]`,
          value: endTime,
          disabled: true,
          class: "hidden-checkbox",
        });

        $(".work-time-info").append(endTimeInput);
      }
      // }
    } else {
    }
  }

  $(document).on("change", ".days-checkbox", function () {
    updateScheduleInputs();
  });

  $(document).on(
    "change",
    ".schedule-time.start-time, .schedule-time.end-time",
    function () {
      updateScheduleInputs();
      updateWorkTimeInfo(this);
    }
  );

  function updateWorkTimeFields($block, startTime, endTime) {
    $block.find('input[name$="[time_start]"]').val(startTime + ":00");
    $block.find('input[name$="[time_end]"]').val(endTime + ":00");
  }

  $(document).on(
    "change",
    ".schedule-time.start-time, .schedule-time.end-time",
    function () {
      const $block = $(this).closest(".days-wrapper");
      const startTime = $block.find(".start-time").val();
      const endTime = $block.find(".end-time").val();

      updateWorkTimeFields($block, startTime, endTime);
    }
  );

  updateScheduleInputs();

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  function translateDate(dateString) {
    const englishMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let i = 0; i < englishMonths.length; i++) {
      const regex = new RegExp(englishMonths[i], "g");
      dateString = dateString.replace(regex, months[i]);
    }

    return dateString;
  }

  $(".work-date").each(function () {
    let text = $(this).html();
    text = translateDate(text);
    $(this).html(text);
  });

  var $form = $("form");
    // Находим форму по контексту - ищем форму, которая содержит наши блоки
    var $form = $("#special-time-container").closest("form");

    // Если не нашли, используем первую форму на странице
    if ($form.length === 0) {
      $form = $("form").first();
    }

    // Обработчик submit формы
    $form.on("submit", function (e) {
      // Перебираем все блоки days-wrapper внутри формы

      $form.find(".container-schedule").each(function () {

        const containerSchedule = $(this);

        let globalIndex = 0;

        containerSchedule.find(".days-wrapper").each(function () {

          const daysWrapper = $(this);

          // Находим первый чекбокс, чтобы извлечь префикс
          const $firstCheckbox = daysWrapper
            .find('input[type="checkbox"][name*="[work_time]"]')
            .first();
          if ($firstCheckbox.length === 0) {
            return;
          }

          const name = $firstCheckbox.attr("name");
          // Извлекаем префикс имени (всё до [work_time])
          const prefixMatch = name.match(/^(.*?)\[work_time\]/);
          if (!prefixMatch) {
            return;
          }

          const schedulePrefix = prefixMatch[1];

          // Собираем отмеченные дни с их временными интервалами
          const checkedDays = [];

          daysWrapper
            .find(
              `input[name^="${schedulePrefix}[work_time]"][name$="[week_day]"]`
            )
            .each(function () {
              const $checkbox = $(this);
              if ($checkbox.is(":checked")) {

                const nameAttr = $checkbox.attr("name");
                const indexMatch = nameAttr.match(/\[work_time\]\[(\d+)\]/);
                if (indexMatch) {
                  const groupIndex = indexMatch[1];
                  const timeStart = daysWrapper
                    .find(
                      `input[name="${schedulePrefix}[work_time][${groupIndex}][time_start]"]`
                    )
                    .val();
                  const timeEnd = daysWrapper
                    .find(
                      `input[name="${schedulePrefix}[work_time][${groupIndex}][time_end]"]`
                    )
                    .val();

                  checkedDays.push({
                    week_day: $checkbox.val(),
                    time_start: timeStart,
                    time_end: timeEnd,
                    index: globalIndex++,
                  });
                }
              }
            });

          // Удаляем старые поля work_time
          daysWrapper.find(`input[name^="${schedulePrefix}[work_time]"]`).remove();

          // Создаем новые поля с последовательной нумерацией
          checkedDays.forEach((day, index) => {

            daysWrapper.append(
              `<input type="hidden" name="${schedulePrefix}[work_time][${day.index}][week_day]" value="${day.week_day}">`
            );
            daysWrapper.append(
              `<input type="hidden" name="${schedulePrefix}[work_time][${day.index}][time_start]" value="${day.time_start}">`
            );
            daysWrapper.append(
              `<input type="hidden" name="${schedulePrefix}[work_time][${day.index}][time_end]" value="${day.time_end}">`
            );
          });
        });
      });

    });
});
