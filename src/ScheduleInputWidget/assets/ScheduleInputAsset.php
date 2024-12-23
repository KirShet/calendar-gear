<?php

namespace kirshet\yii2\ScheduleInputWidget\assets;

use yii\web\AssetBundle;

class ScheduleInputAsset extends AssetBundle
{
    public $sourcePath = '@vendor/kirshet/yii2/src/widgets/ScheduleInputWidget/assets';
    public $css = [
        'css/schedule-input.css',
    ];
    public $js = [
        'js/schedule-input.js',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
    ];  
    public $publishOptions = ['forceCopy' => true];
}