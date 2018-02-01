export default class {
    constructor(element) {
        this.flag = false;
        this.element = element;
        this.dropDowns = element.querySelectorAll(".accordion_item");
    }

    collapseAll() {
        let _this = this;
        let items = this.element.querySelectorAll('.js-accordion-item:not(.is-active)');
        items.forEach((item) => {
           let dropDown = item.querySelector('.js-accordion-content');
           item.classList.remove('is-open');
           dropDown.setAttribute('aria-hidden', true);
        });
    };

    changeIcon() {
        let items = this.dropDowns;
        for (let i = 0, j = items.length; i < j; i++) {
            if (items[i].classList.contains('is-open')) {
                items[i].querySelectorAll('.js-accordion-trigger')[0].innerHTML = '';
                items[i].querySelectorAll('.js-accordion-trigger')[0].innerHTML = '-';
            } else {
                items[i].querySelectorAll('.js-accordion-trigger')[0].innerHTML = '';
                items[i].querySelectorAll('.js-accordion-trigger')[0].innerHTML = '+';
            }
        }

    }

    init() {
        this.element.addEventListener('click', (event) => {
            event.preventDefault();

            if (event.target.classList.contains('js-accordion-trigger')){
                let item = event.target.closest(".js-accordion-item");
                let dropDown = item.querySelectorAll(".js-accordion-content");

                item.classList.add('is-active');
                item.classList.toggle('is-open');

                this.collapseAll();

                if (item.classList.contains('is-open')) {
                    this.flag = true;
                    dropDown[0].setAttribute('aria-hidden', false);
                } else {
                    this.flag = false;
                    dropDown[0].setAttribute('aria-hidden', true);
                }

                this.changeIcon();
                item.classList.remove('is-active');
            }
        });
    }
}