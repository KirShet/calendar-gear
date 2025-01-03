<?php

namespace kirshet\yii2\ScheduleInputWidget;

use yii\widgets\InputWidget;
use kirshet\yii2\ScheduleInputWidget\assets\ScheduleInputAsset;

class ScheduleInputWidget extends InputWidget
{
    public $attribute;
    public $model;
    public $name;
    public $enableTimeZone = true;
    public $enableSpecialTime = true;
    public $enableProductionCalendar = true;
    public $allowMultipleItems = true;
    public $header;
    public $preheader;



    public function run()
    {
        return $this->render('scheduleInputWidget', [
            'model' => $this->model,
            'name' => $this->name,
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
        if ($this->header === null) {
            $this->header = 'Рабочие часы';
        }

        if ($this->preheader === null) {
            $this->preheader = 'Установить рабочие часы';
        }
        ScheduleInputAsset::register($this->getView());
    }
}