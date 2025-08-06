// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Tree class
class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (!array.length) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.data = successor.data;
      node.right = this.deleteItem(successor.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value === node.data) return node;
    if (value < node.data) return this.find(value, node.left);
    return this.find(value, node.right);
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback is required");
    if (!node) return;
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback is required");
    if (!node) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) throw new Error("Callback is required");
    if (!node) return;
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;

    const getHeight = (n) => {
      if (!n) return -1;
      return 1 + Math.max(getHeight(n.left), getHeight(n.right));
    };

    return getHeight(node);
  }

  depth(value, node = this.root, depth = 0) {
    if (!node) return null;
    if (value === node.data) return depth;
    if (value < node.data) return this.depth(value, node.left, depth + 1);
    return this.depth(value, node.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const height = (n) => {
      if (!n) return -1;
      return 1 + Math.max(height(n.left), height(n.right));
    };

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

// Utility for random array
const generateRandomArray = (size, max = 100) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max));

module.exports = { Tree, generateRandomArray };
