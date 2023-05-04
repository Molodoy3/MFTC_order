export function delegationClick() {
    document.addEventListener('click', documentActions)
    function documentActions(e) {
        const targetElement = e.target;

        //?Открывание бургера
        if (targetElement.closest('.menu__icon')) {
            targetElement.closest('.menu__icon').classList.toggle('active');
            document.querySelector('.menu__body').classList.toggle('open');
            document.body.classList.toggle('lock');
        }

        //?Плавный скрол с закрыванием бурегера
        if (targetElement.closest('.menu__body a')) {
            const link = targetElement.closest('a');
            const goToBlock = document.querySelector(link.getAttribute('href').replace('/', ''));
            if (goToBlock) {
                document.querySelector('.menu__body') ? document.querySelector('.menu__body').classList.remove('active') : null;

                let goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY;
                const header = document.querySelector('.header');
                if (header) {
                    goToBlockValue -= header.offsetHeight;
                }
                window.scrollTo({
                    top: goToBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
            .test(navigator.userAgent) && window.innerWidth > 1300) {
            if (targetElement.classList.contains('menu__arrow')) {
                const item = targetElement.closest('li');
                const anyItem = document.querySelector('.menu__body li.hover');
                if (anyItem && anyItem != item) {
                    anyItem.classList.remove('hover');
                }
                item.classList.toggle('hover');
            }
            if (!targetElement.closest('.menu__body li.hover')) {
                document.querySelectorAll('.menu__body li.hover').forEach(item => {
                    item.classList.remove('hover');
                });
            }
        }

        if (targetElement.closest('.main-block__play')) {
            const popup = document.querySelector('.popup-video');
            popup.classList.toggle('active');
            popup.querySelector('.popup-video__body').classList.toggle('active');
            popup.querySelector('video').play();
            document.body.classList.add('lock');
        } else if (!targetElement.closest('.popup-video__body')) {
            const popup = document.querySelector('.popup-video');
            popup.querySelector('.popup-video__body').classList.remove('active');
            popup.classList.remove('active');
            popup.querySelector('video').pause();
            document.body.classList.remove('lock');
        }

        if (targetElement.closest('.footer__mobile>li')) {
            if (document.querySelector('.footer__mobile>li.active')) {
                document.querySelector('.footer__mobile>li.active').classList.remove('active');
            }
            targetElement.closest('.footer__mobile>li').classList.toggle('active');
            document.body.classList.add('lock');
            e.preventDefault();
        } else if(!targetElement.closest('.footer__mobile ul')) {
            document.querySelector('.footer__mobile>li.active').classList.remove('active');
            document.body.classList.remove('lock');
        }

        //?Табы
        //Это добавить в app.js, если изначально видны не все табы
        /*
        if (tabs.length) {
            tabs.forEach(tab => {
                const activeFilter = tab.querySelector('.active');
                if (activeFilter) {
                    const filterValue = activeFilter.dataset.filter;
                    if (filterValue != '*') {                        
                        tab.querySelectorAll('[data-filter-item]').forEach(filterItem => {
                            if (filterItem.dataset.filterItem != filterValue) {
                                filterItem.style.cssText = `position: absolute;opacity: 0;`;
                            }
                        });
                    }
                }
            });
        }
        */
        //Основной код
        /*if (targetElement.closest('[data-filter]')) {
            const itemFilter = targetElement.closest('[data-filter]');
            const filterValue = itemFilter.dataset.filter;
            const tabs = itemFilter.closest('[data-tabs]');
            tabs.querySelectorAll('[data-filter]').forEach(item => { item.classList.remove('active') });
            itemFilter.classList.add('active');
            const tabsItems = tabs.querySelectorAll('[data-filter-item]');
            const durationAnimation = 300;
            if (filterValue === "*") {
                tabsItems.forEach(item => {
                    if (item.style.position !== 'absolute') {
                        item.style.cssText = `opacity: 0;`;
                        setTimeout(() => {
                            item.style.cssText = `position: absolute;opacity: 0;top: 0;`;
                        }, durationAnimation);
                    }
                });

                setTimeout(() => {
                    tabsItems.forEach(item => {
                        item.style.cssText = ``;
                        setTimeout(() => { item.style.cssText = `opacity: 1;`; }, 100);
                    });
                }, durationAnimation);
            } else {
                tabsItems.forEach(item => {
                    if (item.style.position !== 'absolute') {
                        item.style.cssText = `opacity: 0;`;
                        setTimeout(() => {
                            item.style.cssText = `position: absolute;opacity: 0;top: 0;`;
                        }, durationAnimation);
                    }
                });
                setTimeout(() => {
                    tabsItems.forEach(item => {
                        if (item.dataset.filterItem === filterValue) {
                            item.style.cssText = ``;
                            setTimeout(() => { item.style.cssText = `opacity: 1;`; }, 100);
                        }
                    });
                }, durationAnimation);
            }
            e.preventDefault();
        }*/

        //?Пульсирующий эффект (Ripple Effect)
        //Надо для работы - атрубыт data-ripple со значение once, если надо только максимум один круг выводить
        //Обязательно в стилях стилизируем и пишем анимацию для span внутри кнопки или ссылки, для которой обязательно указываем pos rel и желательно ov hid
        /*
        a {
            overflow: hidden;
            position: relative;
        }
        span{
            position: absolute;
            border-radius: 50%;
            background-color: #ffffff8c;
            border: 1px solid #ffffff5e;
            animation: pirple-effect 1s ease forwards;
        }
        @keyframes pirple-effect {
            0%{
                transform: scale(0);                           
            }
            100%{
                transform: scale(1);   
                opacity: 0;
            }
        }
        */
        //Основной код
        /* if (targetEelment.closest('[data-ripple]')) {
            const button = targetEelment.closest('[data-ripple]');
            const ripple = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
            ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;

            button.dataset.ripple === 'once' && button.querySelector('span') ? button.querySelector('span').remove() : null;

            button.appendChild(ripple);

            const timeOut = getAnimationDuration(ripple);

            setTimeout(() => {
                ripple ? ripple.remove() : null;
            }, timeOut);

            function getAnimationDuration() {
                const aDuration = window.getComputedStyle(ripple).animationDuration;
                return aDuration.includes('ms') ? aDuration.replace('ms', '') : aDuration.replace('s', '') * 1000;
            }
        } */
    }
}
//Анимация шакпи при скролле
export function headerScroll() {
    const header = document.querySelector('.header');
    if (header) {
        window.scrollY > 0 ? header.classList.add('scroll') : null;

        window.addEventListener('scroll', () => {
            window.scrollY > 0 ? header.classList.add('scroll') : header.classList.remove('scroll');
        });
    }
}
//Если страница проскролена на более 100 пкс, то шапка исчезает, если скролиться вверх, то появляется
export function ScrollHeader() {
    const header = document.querySelector('.header');
    let scrollPrev = 0;
    if (header) {
        window.addEventListener('scroll', () => {
            window.scrollY > 100 && scrollPrev < window.scrollY ? header.classList.add('out') : header.classList.remove('out');
            scrollPrev = window.scrollY;
        });
    }
}
