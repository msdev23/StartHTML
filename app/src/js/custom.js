
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
        const showStatus = subMenuToggler.getAttribute('data-show');  
        const transitionTime = 250; // css transition animation time
        let height;
        
  
        if ( showStatus == 'false' ) {        

            subMenu.style.display = 'block';
            height = getSubMenuHeight();
            subMenu.style.height = '0';

            setTimeout(function() {                
                subMenu.style.height = height + 'px';

                setTimeout(function() {
                    subMenu.classList.add('is-open');
                    subMenu.style = '';                            
                }, transitionTime);
            }, 0);

        } else {

            height = getSubMenuHeight();
            subMenu.style.height = height + 'px';           
            
            setTimeout(function() {                
                subMenu.style.height ='0';

                setTimeout(function() {
                    subMenu.classList.remove('is-open');
                    subMenu.style = '';                            
                }, 350);
            }, 0);            

        }
  
        let newShowStatus = ( showStatus == 'false' ) ? 'true' : 'false';
  
        subMenuToggler.setAttribute('data-show', newShowStatus);

        function getSubMenuHeight() {
            height = subMenu.offsetHeight;
            return height;
        }
      
    }
  })

})();


