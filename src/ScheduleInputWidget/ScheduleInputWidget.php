<?php

namespace kirshet\yii2\ScheduleInputWidget;

use yii\widgets\InputWidget;
use kirshet\yii2\ScheduleInputWidget\assets\ScheduleInputAsset;

class ScheduleInputWidget extends InputWidget
{
    public $enableTimeZone = true;
    public $enableSpecialTime = true;
    public $enableProductionCalendar = true;
    public $allowMultipleItems = true;
    public $header = 'Рабочие часы';
    public $preheader = 'Установить рабочие часы';

    public function run()
    {

        return $this->render('scheduleInputWidget', [
            'name' => $this->attribute,
            'model' => $this->model,
            'enableTimeZone' => $this->enableTimeZone,
            'enableSpecialTime' => $this->enableSpecialTime,
            'enableProductionCalendar' => $this->enableProductionCalendar,
            'allowMultipleItems' => $this->allowMultipleItems,
            'header' => $this->header,
            'preheader' => $this->preheader,
        ]);
    }

    public function init()
    {
        parent::init();
        ScheduleInputAsset::register($this->getView());
    }
}