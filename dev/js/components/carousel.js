export default class {
    constructor (element, APP) {
        this.element = element;
        this.v_input = this.element.querySelectorAll('.v_input') || [];
        this.r_input = this.element.querySelectorAll('.reall_input') || [];
    }

    init () {
        console.log('aaa');

        this.v_input[0].addEventListener('change', (event) => {
            console.log(event);
        }, false);

        this.v_input[0].onchange = () => {
            console.log('change')
        }
    }

    _focus() {

    }
}