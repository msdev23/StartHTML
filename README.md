# StartHTML
Start optimized HTML5 template

<<<<<<< HEAD
ui.scss - компоненты это хорошо, но не всегда удобно разбивать вёрстку
на миллион файлов по 3 строчки. Как вариант - лендинг, оно просто не нужно.

### favicon
https://realfavicongenerator.net/ - подключение взято оттуда, 
адреса в head переписаны - надо только иконки переделать

### Стили
main.scss - основной файл куда подключаются все стили, находится в app/src/scss
В кратце - идея "sass паттерн 7-1" https://sass-guidelin.es/ru/#section-36


### Библиотеки
srs/scss/main.scss - под комментарием "Vendors" подключаем стили Библиотеки
src/js/libs.js - скрипт библиотеки.
src/js/common.js - здесь можно инициировать скрипты библиотек
Хранение библиотек - app/src/libs/имя-библиотеки/ стили скрипты и прочие файлы библиотеки.
По "7-1" стили библиотек должны быть в sass/libs/... - я отказался от этого. 
Так сразу видно какие файлы использует библиотека, остаётся их лишь подключить.
Еще вариант хранения - node-modules, так же просто подключаем файлы в нужные места.
Например в main.scss @import "../../../node_modules/bootstrap/dist/css/bootstrap.min"; 

# Предустановленные
jquery
popper.js.org - тултипы, всплывающие подсказки
magnific-popup

# Lazyload
=======


ui.scss - компоненты это хорошо, но не всегда удобно разбивать вёрстку на миллион файлов по 3 строчки.

# Библиотеки
Библиотеки подключатся в файлы srs/scss/main.scss под комментарием "Vendors"
Подключаем либо из node-modules, либо складываем в src/libs/имя_библиотеки/ и тут js + scss
Почему не отдельно в папки для js и scss? По мне так нагляднее в том плане что сразу видны все файлы Библиотеки

# Lazy Load
>>>>>>> 132892da7f5121147d52af63e2be364084c18fe7
Подключаем:
srs/libs/lazyload/lazyload.scss
srs/libs/lazyload/lazyload.min.js
и где-то инициируем скрипт, например в common.js

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});





<<<<<<< HEAD
### Планы
Фавикон - https://realfavicongenerator.net/ после иконки там есть таб с инфой о нпм/галп, попробовать подключить в сборку



=======
>>>>>>> 132892da7f5121147d52af63e2be364084c18fe7

