export default class {
    constructor (element, APP) {
        this.element = element;
        this.v_input = this.element.querySelectorAll('.v_input') || [];
        this.r_input = this.element.querySelectorAll('.reall_input') || [];
        
        this.p_post = this.element.querySelectorAll('#trigger_ajax');
        this.p_pros = this.element.querySelectorAll('#pros')[0];
    }

    init () {
        this.element.addEventListener('click', (event) => {
            console.log(event);
            let _target = event.target.previousElementSibling;
            _target.focus();
            _target.addEventListener('input', () => {
                console.log('change');
            });
            _target.addEventListener('change', () => {
                console.log('change');
            });
        }, false);

        this._click();
    }

    _click() {
        this.element.addEventListener('click', (event) => {
            let xhr = new XMLHttpRequest();

            xhr.onprogress = (event) => {
                if (event.lengthComputable) {
                    let loaded = parseInt(event.loaded/event.total*100) + "%";
                    this.p_pros.style.width = loaded;
                    this.p_pros.innerHTML   = loaded;
                }
            }
            xhr.open("post", "for_text.php", true);
            xhr.send(null);
        })
    }
}