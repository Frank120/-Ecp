export default class {
    constructor(element, APP){
        this.element = element;
        this.colCount = 4;
        this.colWidth = (100 / this.colCount);
        this.increment = 10;
        this.container = this.element.querySelectorAll('.waterful_container');
        this.children  = Array.prototype.slice.call(this.container[0].children);
        this.height = this.increment;
    };

    computeHeight() {
        let prevColumns = 0;
        let prevOffsets = 0;
        let totalOffset = [];

        for ( let i = 0; i < this.children.length; i++) {
            let hh = this.children[i].offsetHeight;

            if (hh + prevOffsets > this.height) {
                prevColumns++;
                prevOffsets = 0;
            }

            if (prevColumns >= this.colCount) {
                break;
            }

            totalOffset[i] = {
                column: prevColumns,
                offset: prevOffsets
            };

            prevOffsets += hh;
        }

        if (prevColumns >= this.colCount) {
            this.height += this.increment;
            return this.computeHeight();
        } else {
            return totalOffset;
        }
    };

    initial() {
        let totalOffset = this.computeHeight();

        for (let i = 0; i < totalOffset.length; i++) {
            this.children[i].style.left = (totalOffset[i].column * this.colWidth) + "%";
            this.children[i].style.top  = (totalOffset[i].offset) + "px";
        }
        this.container[0].style.height = this.height + "px";
    };

    init() {
        this.initial();
    }
}