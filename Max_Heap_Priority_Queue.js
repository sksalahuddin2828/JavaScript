class MaxHeap {
  constructor() {
    this.heap = [];
  }

  heapify(n, i) {
    let largest = i;
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    if (leftChild < n && this.heap[i] < this.heap[leftChild]) {
      largest = leftChild;
    }

    if (rightChild < n && this.heap[largest] < this.heap[rightChild]) {
      largest = rightChild;
    }

    if (largest !== i) {
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      this.heapify(n, largest);
    }
  }

  insert(newNum) {
    const size = this.heap.length;
    if (size === 0) {
      this.heap.push(newNum);
    } else {
      this.heap.push(newNum);
      for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        this.heapify(size, i);
      }
    }
  }

  deleteNode(num) {
    const size = this.heap.length;
    let i = 0;
    for (i = 0; i < size; i++) {
      if (num === this.heap[i]) {
        break;
      }
    }

    [this.heap[i], this.heap[size - 1]] = [this.heap[size - 1], this.heap[i]];
    this.heap.pop();

    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapify(this.heap.length, i);
    }
  }

  printHeap() {
    console.log("Max-Heap array:", this.heap);
  }
}

const maxHeap = new MaxHeap();
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(9);
maxHeap.insert(5);
maxHeap.insert(2);

maxHeap.printHeap();

maxHeap.deleteNode(4);
maxHeap.printHeap();
