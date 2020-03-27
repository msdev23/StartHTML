
/**
 *  responsive horisontal menu
 */
(function() {
    "use strict";

    const burgerWrap = document.querySelector('.ms-burger-wrap');
    const burger = document.querySelector('.ms-burger');  
    const nav = document.querySelector('.menu');

    // mobile menu open/close 
    burgerWrap.addEventListener('click',function(){
        burger.classList.toggle('burger--active');
        nav.classList.toggle('menu--expanded');
        //msOvrl.classList.toggle('menu--expanded');
    })

    // submenu open/close
    nav.addEventListener('click',function(e){

        if (e.target.classList.contains('menu__toggler')) { 

            const subMenuToggler = e.target;
            const subMenu = subMenuToggler.nextElementSibling;
            const curShowStatus = subMenuToggler.getAttribute('data-show');


            // Преждем чем открыть, скроем другие (акордеон)
            /*
                При клике на кнопку надо закрыть остальные открытые (на своём уровне)
                Надо найти все соседние элементы - поднимемся к родителю кнопки и 
                дальше к общему родителю соседей и текущего
                Посчитаем их и с помощью for переберём и найдём нужные (is-open)
                когда нашли - зайдём внутрь и закроем sub-menu
                Только потом отработаем открытие нового суб-меню
             */

            
            const parent = subMenuToggler.closest('.menu__item--has-children').parentElement; // родитель открываемого пункта
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


