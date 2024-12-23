<?php

namespace YourVendor\YourWidgetPackage\widgets\ScheduleInputWidget\assets;

use yii\web\AssetBundle;

class ScheduleInputAsset extends AssetBundle
{
    public $sourcePath = '@vendor/your-namespace/schedule-input-widget/src/widgets/ScheduleInputWidget/assets';
    public $css = [
        'css/schedule-input.css',
    ];
    public $js = [
        'js/schedule-input.js',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap5\BootstrapAsset',
    ];  
    public $publishOptions = ['forceCopy' => true];
}