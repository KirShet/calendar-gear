Установка через Composer:
```
composer require kirshet/yii2:dev-main
```

Форма с виджетом:
```
use yii\widgets\ActiveForm;
use kirshet\yii2\ScheduleInputWidget\models\ScheduleForm;
use kirshet\yii2\ScheduleInputWidget\ScheduleInputWidget;

$model = new ScheduleForm();

$form = ActiveForm::begin();
echo $form->field($model, 'schedule')->widget(ScheduleInputWidget::class, [ 'attribute' => 'schedule', 'model' => $model, 'name' => 'schedule', 'enableTimeZone' => true, 'enableSpecialTime' => true, 'enableProductionCalendar' => false, 'allowMultipleItems' => true, ]);

ActiveForm::end();
```

Настройка автозагрузки
```
{
    "name": "kirshet/yii2",
    "description": "Schedule input widget for Yii2",
    "type": "library",
    "license": "MIT",
    "autoload": {
        "psr-4": {
            "kirshet\\yii2\\": "src/"
        }
    },
    "authors": [
        {
            "name": "Kirill Shetko",
            "email": "kirshet2000@gmail.com"
        }
    ],
    "minimum-stability": "stable",
    "require": {
        "npm-asset/flatpickr": "^4.6.13"
    }
}
```
