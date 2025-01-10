<?php

namespace kirshet\yii2\ScheduleInputWidget\models;

use yii\base\Model;

class ScheduleForm extends Model
{
    public $schedule;

    public function rules()
    {
        return [
            [['schedule'], 'validateSchedule'],
        ];
    }
    
    public function validateSchedule($attribute, $params)
    {
        $schedule = $this->$attribute;

        // Проход по всем элементам в расписании
        if (isset($schedule['work_time']) && is_array($schedule['work_time'])) {
            foreach ($schedule['work_time'] as $workTime) {
                // Проверка, что каждый элемент является массивом и содержит start_time и end_time
                if (is_array($workTime) && isset($workTime['start_time'], $workTime['end_time'])) {
                    // Проверка, что время начала и окончания не равны нулевым значениям
                    if ($workTime['start_time'] === '00:00:00' && $workTime['end_time'] === '00:00:00') {
                        $this->addError($attribute, 'Start time and end time cannot both be 00:00:00.');
                    }
                } else {
                    // Если структура данных нарушена, добавляем ошибку
                    $this->addError($attribute, 'Each work_time must contain start_time and end_time.');
                }
            }
        } else {
            // Если нет work_time в расписании, добавляем ошибку
            $this->addError($attribute, 'Work time is missing or malformed.');
        }
    }
}