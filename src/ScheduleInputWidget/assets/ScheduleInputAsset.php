<?php

namespace kirshet\yii2\ScheduleInputWidget\assets;

use yii\web\AssetBundle;
use yii\web\JqueryAsset;

class ScheduleInputAsset extends AssetBundle
{
    public $sourcePath = '@vendor/kirshet/yii2/src/ScheduleInputWidget/assets';

    public $css = [
        'css/schedule-input.css',
        'flatpickr/flatpickr.min.css',
    ];
    public $js = [
        'js/schedule-input.js',
        'flatpickr/flatpickr.min.js',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
        JqueryAsset::class,
    ];  
    public $publishOptions = ['forceCopy' => true];
}

