class Node {
    constructor(data) {
        this.dataval = data;
        this.nextval = null;
    }
}

class SLinkedList {
    constructor() {
        this.headval = null;
    }

    listprint() {
        let printval = this.headval;
        while (printval !== null) {
            console.log("Value: " + printval.dataval);
            printval = printval.nextval;
        }
    }
}

const list = new SLinkedList();
list.headval = new Node("Monday");
const e2 = new Node("Tuesday");
const e3 = new Node("Wednesday");

list.headval.nextval = e2;
e2.nextval = e3;

list.listprint();
