Стартовый HTML/CSS шаблон
==============================

Общие сведения:
------------------------------
Стартовая структура html, используется препроцессор scss, конвертация шрифтов из ttf в woff/2 (по команде), 
оптимизация изображений (пока без webp) + lazyload для img.

### Файловая структура
Общая папка app/ - сюда складываются все собранные файлы по своим папкам,
также внутри неё есть `_src/` - именно в ней мы работаем, в ней все исходники.
#### _src содержит
<pre><code>
├── index.html              # gulpfile сборщика
├── fonts/                  # Файлы шрифтов в формате .ttf
├── js/                     # Основная папка с проектом
    ├── _custom.js          # рабочий файл, в него пишем всё что надо
    ├── _libs.js            # Подключаем библиотеки
    └── scripts.js          # общий файл - сюда инклудятся предыдущие
├── libs/                   # Библиотеки со всеми необходимыми для неё файлами (js/css/scss/img)
    ├── jquery/             # jquery хранится 2 версии, последняя и 1.12.4 для WP
    └── .../                # Любые другие библиотеки, каждая в своей директории
├── media/                  # Медиафайлы (картинки, фоновые видео, иконки...)
    ├── _demo/              # Картинки для контента
    ├── favicon/            # Набор фавиконок
    └── ...                 # все остальные медиафайлы
├── scss/                   # SCSS файлы
    ├── abstracts/          # Заготовки в виде миксинов, переменных
    ├── base/               # Базовые стили, шрифты...
    ├── blocks/             # Стили самостоятельных блоков/компонентов
    ├── libs/               # Подключаются стили библиотек
    ├── pages/              # Специфические стили отдельных страниц
    ├── themes/             # Если вдруг решили сделать темы для сайта (светлая, тёмная...)
    ├── _shame.scss         # для всяких позорных кастылей, подлежащих переделке и перемещению в другой файл
    └── main.scss           # Основной файл. Сюда всё инклудится в нужном порядке
└── template-parts/         # Части html
</code></pre>



Подробнее обо всём:
------------------------------
### Стили
`main.scss` - основной файл, сюда подключаются все стили, находится в `app/src/scss`
В кратце - идея ["sass паттерн 7-1 (sass-guidelin.es/ru)"](https://sass-guidelin.es/ru/#section-36) 

**Блоки/компоненты** (как удобнее),  самостоятельные логические куски кода (кнопка, соц.иконки, карточка товара),
стили каждого блока в свой отдельый файл внутри 
> /_src/scss/blocks/block-name/block-name.scss
`_common-ui.scss` - компоненты это хорошо, но не всегда удобно разбивать вёрстку
на миллион файлов по 3 строчки. Как вариант - лендинг, а при расзрастании для удобства можно вынести в отдельный.
Файл хранится в папке с блоками


### favicon
https://realfavicongenerator.net/ - подключение взято оттуда, 
адреса в head переписаны - надо только иконки переделать




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
- Фавикон - https://realfavicongenerator.net/ после иконки там есть таб с инфой о нпм/галп, попробовать подключить в сборку
- Лезилоад - разобраться с background
- Сделать 2 файла стилей, нормальный+минифицированный, чтобы не париться приходилось комментировать функцию в галпфайле


=======
>>>>>>> 132892da7f5121147d52af63e2be364084c18fe7

