```mermaid
sequenceDiagram
  actor Cl as Клієнт
  actor Adm as Адміністратор
  participant Back as Адміністративна панель
  participant Back2 as Клієнтська панель
  
  Cl ->> Back2: Зареєструвати особистий кабінет
  activate Back2
  Back2 ->> Cl: Успішне створення
  deactivate Back2
  Cl ->> Adm: Звернення про налаштування
  Adm ->> Back: Налаштування маршрутизації клієнта за терміналами
  activate Back
  Back ->> Adm: Клієнт налаштований
  deactivate Back
  Cl ->> Back2: Створення інвойсу
```