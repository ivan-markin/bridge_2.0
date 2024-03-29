function importAll(r) {
    r.keys().forEach(r);
}
importAll(require.context('./images/', true, /\.(jpe?g|png|gif|svg|mp4|ico)$/));
importAll(require.context('./fonts/', true, /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/));
import './scss/style.scss';
import Swiper, { Navigation, Pagination } from 'swiper';
import { Node } from 'postcss';
import { mobileMenuHandler } from './js/modules/mobile-menu-handler';
const ApexCharts = require('apexcharts');

export function mobileCheck(device = (navigator.userAgent || navigator.vendor || window['opera'])): boolean {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(device) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(device.substr(0, 4))
}

document.addEventListener('DOMContentLoaded', () => {
    const chooseTokenButtons = document.querySelectorAll('.choose-token-button');
    const chooseTokenInput = document.querySelector('.find-bridge-form__choose-token-input') as HTMLInputElement;    
    const networksListInputs = document.querySelectorAll('.networks-list-input') as NodeListOf<HTMLInputElement>;
    const menuButton = document.querySelector('.header__menu-button');    
    const closeMenuButton = document.querySelector('.mobile-menu__close-btn');
    const supportedLogosCnt = document.querySelectorAll('.rankings__table-item-logos');    
    const filtersBtn = document.querySelector('.overview__filter-button');
    const filtersCloseBtn = document.querySelector('.filters-mobile-panel__back-btn');
    const selectDateInput = document.querySelector('.select-date');
    const popupBackBtn = document.querySelector('.popup-bottom__back-btn');
    const popupBottomBg = document.querySelector('.popup-bottom__bg');
    const selectButtons = document.querySelectorAll('.select__button');    
    const advancedSettingsButton = document.getElementById('advancedSettingsBtn');    
    const searchButton = document.querySelector('.search-button');
    const popupCloseButtons = document.querySelectorAll('.popup__close');
    const popups = document.querySelectorAll('.popup');
    const estimatedTokenBtn = document.querySelector('.estimated-token-button');
    const walletButton = document.querySelector('.wallet-info-button');
    
    function closeBottomPopup(evt) {
        evt.target.closest('.popup-bottom').classList.remove('active');        
    }

    function popupCloseHandler(evt) {
        if (evt.target.classList.contains('popup')) {
            evt.target.classList.remove('active');    
        }

        if (evt.target.classList.contains('popup__close')) {
            evt.target.closest('.popup').classList.remove('active');
        }
        
        document.body.classList.remove('fixed');
    }
    
    function filtersMobileHandler() {
        const filtersPanel = document.querySelector('.filters-mobile-panel');
        filtersPanel?.classList.toggle('active');
        document.body.classList.toggle('fixed');
    }
    
    function chooseTokenBtnHandler(event) {        
        const popup = document.querySelector('#chooseTokenPopup');
        event.preventDefault();
        popup?.classList.add('active');
        document.body.classList.add('fixed');
    }

    function collapseChooseTokenInput(event) {                
        const popup = event.target.closest('.input-cnt').querySelector('.form-network-list-popup');
        event.target.classList.remove('active');
        event.target.value = '';
        // chooseTokenBtn?.classList.add('active');
        popup.classList.remove('active');
    }

    function showNetworksPopup(event) {
        const popup = event.target.closest('.input-cnt').querySelector('.form-network-list-popup');
        
        popup.classList.add('active');
        !event.target.value && popup.classList.remove('active');
    }

    function collapseNetworksPopup(event) {
        const popup = event.target.closest('.input-cnt').querySelector('.form-network-list-popup');
        popup.classList.remove('active');
        event.target.value = '';
    }

    function collapseButtonHandler(evt) {
        const advancedSettings = document.querySelector('.transfers-form__advanced-settings');
        evt.preventDefault();
        evt.target.classList.toggle('active');
        advancedSettings?.classList.toggle('active');
    }

    function headerSearchHandler() {
        const searchPopup = document.querySelector('#searchPopup');
        searchPopup?.classList.add('active');
        document.body.classList.add('fixed');
    }

    // function openSupportedLogosPopup(event) {
    //     event.target.querySelector('.tooltip-popup').classList.add('active');
    // }    

    if (selectButtons) {
        selectButtons.forEach(el => {
            el.addEventListener('click', () => {
                el.parentElement?.classList.toggle('active');
            })
        })        
    }
    
    function routeLogosContainerHandler() {        
        const containers = document.querySelectorAll('.route-logos') as NodeListOf<HTMLDivElement>;

        if (!containers) {
            return;
        }

        containers.forEach(el => {
            const routeLogos = el.querySelectorAll('.route-logo') as NodeListOf<HTMLImageElement>;            
            
            routeLogos.forEach((el, i) => {                
                el.style.transform = `translateX(${i * 100}%)`; 
                el.style.left = `${i * -.625}vw`; 
            })

            el.style.width = routeLogos.length * 1.67 - (routeLogos.length - 1) * .625 + 'vw'; 
        })                                                            
    }        

    filtersBtn?.addEventListener('click', filtersMobileHandler);
    filtersCloseBtn?.addEventListener('click', filtersMobileHandler);

    searchButton?.addEventListener('click', headerSearchHandler);

    popupCloseButtons.forEach(el => {
        el.addEventListener('click', popupCloseHandler);
        document.body.classList.remove('fixed');
    })

    popups.forEach(el => {
        el.addEventListener('click', popupCloseHandler);    
        document.body.classList.remove('fixed');    
    })

    menuButton?.addEventListener('click', mobileMenuHandler().open);
    closeMenuButton?.addEventListener('click', mobileMenuHandler().close);
    
    chooseTokenButtons?.forEach(el => {
        el.addEventListener('click', chooseTokenBtnHandler);
    })

    selectDateInput?.addEventListener('click', () => {
        const dateInputPopup = document.querySelector('.date-picker-popup');
        dateInputPopup?.classList.add('active');
        document.body.classList.add('fixed');
    })

    document.addEventListener('keydown', (evt: KeyboardEvent) => {
        popups.forEach(el => {
            if (evt.key === 'Escape') el.classList.remove('active');
            document.body.classList.remove('fixed');
        })        
    })

    popupBackBtn?.addEventListener('click', closeBottomPopup);
    popupBottomBg?.addEventListener('click', closeBottomPopup);

    estimatedTokenBtn?.addEventListener('click', (evt) => {
        const popup = document.querySelector('#routesPopup');        
        evt.preventDefault();
        popup?.classList.add('active');
        document.body.classList.add('fixed');        
    })

    advancedSettingsButton?.addEventListener('click', collapseButtonHandler);
    routeLogosContainerHandler();

    document.addEventListener('click', (evt) => {
        console.log(evt.target);
    })  
    
    walletButton?.addEventListener('click', () => {
        const popup = document.querySelector('#walletActionsPopup');
        popup?.classList.add('active');
    })
})
