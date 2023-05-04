"use strict";
//?Импортирование Свайпера
//import Swiper, { Navigation, Pagination } from 'swiper'; //импорт свайпера
//?Делегирование события клик
import { delegationClick } from './modules/script.js';
//?Функция определения мобильного устройства
//import { isMobile } from "./modules/functions";
//?Импортирование плавного скролла
//import "./modules/smoothScroll.js"
//?Галерея FancyBox
//import { Fancybox } from "@fancyapps/ui";
//import "@fancyapps/ui/dist/fancybox/fancybox.css";
//Fancybox.bind("[data-gallery]", {});
//<a href="img/3.jfif" data-fancybox="gallery" data-caption="Природа" class="block__item"><img src="img/3.jfif" alt="Природа"></a>

import { initSpollers } from './modules/spollers.js';
import { DynAdapt } from './modules/dynamic.js';
import { headerScroll } from './modules/script.js';

window.addEventListener("load", windowLoad);
function windowLoad() {

    const headerMenubody = document.querySelector('.menu__body')
    if (headerMenubody) {
        const itemsHeaderMenu = headerMenubody.querySelectorAll('li');
        itemsHeaderMenu.forEach(li => {
            if (li.querySelector('ul')) {
                const link = li.querySelector('a');
                link.insertAdjacentHTML('afterend', `<div data-spoller tabindex='-1' class="menu__arrow icon-arrow-menu"></div>`);
            }
        });
    }
    
    const ourCasesMainElement = document.querySelector('.our-cases__main');
    if (ourCasesMainElement) {
        let width = window.innerWidth >= 1480 ? 720 : (window.innerWidth - 40) / 2;
        ourCasesMainElement.style.cssText = `margin-left: calc(50% - ${width}px);`;
        window.addEventListener('resize', function (){
            let width = window.innerWidth >= 1480 ? 720 : (window.innerWidth - 40) / 2;
            ourCasesMainElement.style.cssText = `margin-left: calc(50% - ${width}px);`;
        });
    }

    const columnsMenuFooter = document.querySelectorAll('.footer__col-menu');
    if (columnsMenuFooter.length) {
        columnsMenuFooter.forEach(col => {
            const elements = col.querySelectorAll('.footer__col-menu>li');
            if (elements.length) {
                elements.forEach(elem => {
                    elem.dataset.da = '.footer__mobile,767.98,last';
                });
            }
        });
    }

    const da = new DynAdapt("max");
    da.init();

    delegationClick();
    initSpollers();
    headerScroll();
    //?Создание плавного скролла
    /*     SmoothScroll({
            // Время скролла 400 = 0.4 секунды
            animationTime: 600,
            // Размер шага в пикселях
            stepSize: 75,
            // Дополнительные настройки:
            // Ускорение
            accelerationDelta: 30,
            // Максимальное ускорение
            accelerationMax: 2,
            // Поддержка клавиатуры
            keyboardSupport: true,
            // Шаг скролла стрелками на клавиатуре в пикселях
            arrowScroll: 50,
            // Pulse (less tweakable)
            // ratio of "tail" to "acceleration"
            pulseAlgorithm: true,
            pulseScale: 4,
            pulseNormalize: 1,
            // Поддержка тачпада
            touchpadSupport: true,
        }); */
}