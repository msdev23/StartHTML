# StartHTML
Start optimized HTML5 template



ui.scss - компоненты это хорошо, но не всегда удобно разбивать вёрстку на миллион файлов по 3 строчки.

# Библиотеки
Библиотеки подключатся в файлы srs/scss/main.scss под комментарием "Vendors"
Подключаем либо из node-modules, либо складываем в src/libs/имя_библиотеки/ и тут js + scss
Почему не отдельно в папки для js и scss? По мне так нагляднее в том плане что сразу видны все файлы Библиотеки

# Lazy Load
Подключаем:
srs/libs/lazyload/lazyload.scss
srs/libs/lazyload/lazyload.min.js
и где-то инициируем скрипт, например в common.js

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});






