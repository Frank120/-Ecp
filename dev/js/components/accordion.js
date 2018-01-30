export default class {
    constructor(element, APP) {
        this.element = element;
        this.items = this.element.querySelectorAll(".icon");
    }

    clickItem() {
        for (var i = 0; i < this.items.length; i++) {
           this.items[i].addEventListener("click", (item) => {
               console.log(item);
           }, false)
        }
    };

    init() {
        this.clickItem();
    }

}