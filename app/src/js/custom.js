
/**
 *  responsive horisontal menu
 */
(function() {
    "use strict";

    const burgerWrap = document.querySelector('.ms-burger-wrap'),
        burger = document.querySelector('.ms-burger'),
        nav = document.querySelector('.menu'),
        togglerSelector = 'menu__toggler',
        childSelector = 'menu__item--has-children';
        

    // mobile menu open/close 
    burgerWrap.addEventListener('click',function(){
        burger.classList.toggle('burger--active');
        nav.classList.toggle('menu--expanded');
        //msOvrl.classList.toggle('menu--expanded');
    })

    // submenu open/close
    nav.addEventListener('click',function(e){

        if (e.target.classList.contains(togglerSelector)) { 

            const subMenuToggler = e.target;
            const subMenu = subMenuToggler.nextElementSibling;
            const curShowStatus = subMenuToggler.getAttribute('data-show');


            // Преждем чем открыть, скроем другие (акордеон)
            
            /*
                При клике на кнопку надо закрыть остальные открытые пункты (на своём уровне)
                Чтобы найти все соседние элементы - поднимемся к родителю кнопки и 
                дальше к общему родителю - получим все дочерние == соседей + текущий
                Посчитаем их и с помощью for переберём и найдём нужный (is-open)
            !!! когда нашли - зайдём внутрь 
                (!придётся также получить ВСЕХ (изменить метод: т.к. sub-menu только одно, может без перебора как-то можно)
                детей и найти нужный) и закроем sub-menu
                Только потом отработаем открытие нового суб-меню
             */            
            const parent = subMenuToggler.closest(childSelector ).parentElement; // родитель открываемого пункта
            const siblingsCount = parent.children.length; // считаем кол-во элементов на это уровне            
            const sibling = parent.children; // получаем все дочерние узлы

            // найдём соседа в котором уже открыто sub-menu
            if ( siblingsCount > 0 ) {
                for (let i = 0; i < siblingsCount; i++ ){                    
                    if ( sibling[i].classList.contains('is-open')  ) {                        
                        
                        // найдём то самое sub-menu
                        const childList = sibling[i].children; // получаем всех детей
                        const childListCount = sibling[i].children.length; // считаем
                        if ( childListCount > 0 ) { // перебираем 
                            for (let n = 0; n < childListCount; n++){

                                if ( childList[n].classList.contains('is-open') ) {                  
                                    slideToggle(childList[n]); // закрываем
                                }
                            }
                        }                    


                    }
                }
            }

            // откроем
            slideToggle(subMenu);  
    
            let newShowStatus = ( curShowStatus == 'false' ) ? 'true' : 'false';
    
            subMenuToggler.setAttribute('data-show', newShowStatus);
        }
    })


    function getSubMenuHeight(el) {
        let height = el.offsetHeight;
        return height;
    }


    function slideToggle(el) {
        let height = getSubMenuHeight(el);
        const transitionTime = 250; // css transition animation time
      
        if ( height > 0 ) {

            el.style.height = height + 'px';           
            
            setTimeout(function() {                
                el.style.height ='0';

                setTimeout(function() {
                    el.classList.remove('is-open');
                    el.parentElement.classList.remove('is-open');
                    el.style = '';                            
                }, 350);
            }, 0);

        } else {

            el.style.display = 'block';
            height = getSubMenuHeight(el);
            el.style.height = '0';

            setTimeout(function() {                
                el.style.height = height + 'px';

                setTimeout(function() {
                    el.classList.add('is-open');
                    el.parentElement.classList.add('is-open');
                    el.style = '';                            
                }, transitionTime);
            }, 0);            
        }
    } // end slideToggle
 
})();


