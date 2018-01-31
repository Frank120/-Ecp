export default class {
    constructor(element, APP) {
        this.element = element;
        this.items = this.element.querySelectorAll(".icon");
    }

    clickItem(target) {
        var _this = this;
        for (var i = 0; i < this.items.length; i++) {
            _this.items[i].addEventListener("click", () => {
                _this.innerText = " ";
                _this.innerText = "+";
                console.log(this);
                console.log(_this);
                console.log(this.parentElement);
                console.log(_this.parentElement);
           }, true)
        }
    };

    init() {
        this.clickItem(this);
    }

}