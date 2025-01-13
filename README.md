Установка через Composer:
```
composer require kirshet/yii2:dev-main
```

Форма с виджетом:
```
use kirshet\yii2\ScheduleInputWidget\models\ScheduleForm;

$model = new ScheduleForm();

$form = ActiveForm::begin();

    echo $form->field($model, 'schedule')->widget(ScheduleInputWidget::class, [
        'enableTimeZone' => true, 
        'enableSpecialTime' => true, 
        'enableProductionCalendar' => true, 
        'allowMultipleItems' => true
    ]);

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

        $model->setAttributes($_POST);
        $model->load(Yii::$app->request->post());
        $model->validate();

        $scheduleData = [
            'enable_time_zone' => '1',
            'enable_production_calendar' => '0',
            'work_time' => [
                ['days' => '1', 'start_time' => '00:00:00', 'end_time' => '00:00:00'],
            ],
            'special_time' => [
                ['start_time' => '2024-11-05 08:00:00', 'end_time' => '2024-11-05 18:00:00'],
            ]
        ];
    
        $model->schedule = $scheduleData;
    
        return $this->render('index', ['model' => $model]);
```

```
    public function actionIndex()
    {
        $model = new ScheduleForm();
        $model->load(Yii::$app->request->post());
        if ($model->validate()) {
            Yii::$app->session->setFlash('success', 'Данные успешно отправлены4445.');
        } else {
            Yii::$app->session->setFlash('error', 'Ошибка валидации данных.');
        }
        return $this->render('index', ['model' => $model]);
    }
```