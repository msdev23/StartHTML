
/**
 * msdev horisontal responsive menu
 */
(function() {
    "use strict";

    const burgerWrap = document.querySelector('.ms-burger-wrap');
    const burger = document.querySelector('.ms-burger');  
    const nav = document.querySelector('.menu');

    const handleClick = () => {    
        burger.classList.toggle('burger--active');
        nav.classList.toggle('menu--expanded');
        //msOvrl.classList.toggle('menu--expanded');
    }
    burgerWrap.addEventListener('click', handleClick);

    nav.addEventListener('click',function(e){
        if (e.target.classList.contains('menu__toggler')) { 

            const subMenuToggler = e.target;
            const subMenu = subMenuToggler.nextElementSibling;
            const curShowStatus = subMenuToggler.getAttribute('data-show');

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
                    el.style = '';                            
                }, transitionTime);
            }, 0);            
        }
    } // end slideToggle


})();


