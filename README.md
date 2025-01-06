Установка через Composer:
```
composer require kirshet/yii2:dev-main
```

Форма с виджетом:
```
use kirshet\yii2\ScheduleInputWidget\models\ScheduleForm;

$model = new ScheduleForm();

$form = ActiveForm::begin();
echo $form->field($model, 'schedule')->widget(
    kirshet\yii2\ScheduleInputWidget\ScheduleInputWidget::class,
    [
        'attribute' => 'schedule',
        'model' => $model,
        'name' => 'schedule',
        'enableTimeZone' => true,
        'enableSpecialTime' => true,
        'enableProductionCalendar' => true,
        'allowMultipleItems' => true,
        'header' => 'Укажите расписание',
        'preheader' => 'Настройте расписание для ваших нужд',
    ]
);

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
Обращение через контроллер:
```
    $model = new ScheduleForm();
    
    $scheduleData = [
        'enable_time_zone' => '1',
        'enable_production_calendar' => '1',
        'work_time' => [
            ['days' => '1', 'start_time' => '08:00:00', 'end_time' => '18:00:00'],
        ], 
        'special_time' => [
            ['start_time' => '2024-11-05 08:00:00', 'end_time' => '2024-11-05 18:00:00'],
        ]
    ];
    
    $model->schedule = $scheduleData;
    
    return $this->render('index', ['model' => $model]);
```
