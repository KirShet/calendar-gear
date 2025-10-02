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
    public $showHeader = true;
    public $useFrame = true;
    public $nameTemplate = null;

    public function run()
    {

        $fieldName = $this->nameTemplate ?: $this->attribute;

        return $this->render('scheduleInputWidget', [
            'name' => $fieldName,
            'model' => $this->model,
            'enableTimeZone' => $this->enableTimeZone,
            'enableSpecialTime' => $this->enableSpecialTime,
            'enableProductionCalendar' => $this->enableProductionCalendar,
            'allowMultipleItems' => $this->allowMultipleItems,
            'header' => $this->header,
            'preheader' => $this->preheader,
            'showHeader' => $this->showHeader,
            'useFrame' => $this->useFrame,
        ]);
    }

    public function init()
    {
        parent::init();
        ScheduleInputAsset::register($this->getView());
    }
}