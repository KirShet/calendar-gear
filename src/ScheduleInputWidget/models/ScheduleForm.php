<?php

namespace kirshet\yii2\ScheduleInputWidget\models;

use yii\base\Model;

class ScheduleForm extends Model
{
    public $date;
    public $schedule;

    public function rules()
    {
        return [
            [['schedule'], 'required'], // Обязательное поле
            [['schedule'], 'safe'], // Разрешаем любое значение для schedule
        ];
    }
}
