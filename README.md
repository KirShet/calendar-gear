Установка через Composer:
```
composer require your-namespace/schedule-input-widget:dev-main
```

Форма с виджетом:
```
use yii\widgets\ActiveForm;
use YourVendor\YourWidgetPackage\widgets\ScheduleInputWidget\models\ScheduleForm;
use YourVendor\YourWidgetPackage\widgets\ScheduleInputWidget\ScheduleInputWidget;

$model = new ScheduleForm();

$form = ActiveForm::begin();
echo $form->field($model, 'schedule')->widget(ScheduleInputWidget::class, [ 'attribute' => 'schedule', 'model' => $model, 'name' => 'schedule', 'enableTimeZone' => true, 'enableSpecialTime' => true, 'enableProductionCalendar' => false, 'allowMultipleItems' => true, ]);

ActiveForm::end();
```

Настройка автозагрузки
```
"autoload": {
    "psr-4": {
        "YourVendor\\YourWidgetPackage\\": "src/"
    }
}
```
