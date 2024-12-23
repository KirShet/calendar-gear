<?php

namespace kirshet\yii2\ScheduleInputWidget\models;

use yii\base\Model;

class ScheduleForm extends Model
{
    public $date;

    public function rules()
    {
        return [
            [['date'], 'required'],  // Дата обязательна для заполнения
            [['date'], 'date', 'format' => 'php:Y-m-d'],  // Формат даты
            [['date'], 'safe'],  // Устанавливаем 'safe' для других случаев
        ];
    }
}
