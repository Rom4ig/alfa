# Тесты для Альфабанк
Тесты описаны в файле `task.md`
## Запуск
Для запуска тестов: `npm test`    
Для запуска elsint: `npm run lint` и `npm run lint_fix`  
Для генерации отчета allure: `npm run allure`  
Для открытия отчета allure: `npm run allure_open` 
## Структура проекта
В папке `auth` данные для api авторизации. Во всех тестах, кроме авторизации используется, используется api авторизация.   
В папке `config` расположен конфигурационный файл playwright   
В папке `constants` расположены переменные, которые используются в проекте   
В папке `models` расположена "модель" пользователя  
В папке `page` расположены классы страницы по паттерну PageObject   
В папке `tests` расположено 6 тестов (5 основных и один c авторизацией через ui)   
Также в корневой папке расположены конфигурационные файлы для `eslint`, `prettier`, `tsconfig`


