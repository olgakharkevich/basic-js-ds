const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let current = this.rootNode;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.rootNode;
    while (current) {
      if (data === current.data) return true;
      current = data < current.data ? current.left : current.right;
    }
    return false;
  }

  find(data) {
    let current = this.rootNode;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    let parent = null;
    let current = this.rootNode;

    while (current && current.data !== data) {
      parent = current;
      current = data < current.data ? current.left : current.right;
    }

    if (!current) return;

    if (!current.left && !current.right) {
      if (!parent) {
        this.rootNode = null;
      } else if (parent.left === current) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return;
    }

    if (!current.left || !current.right) {
      const child = current.left || current.right;
      if (!parent) {
        this.rootNode = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      return;
    }

    let successor = current.right;
    let successorParent = current;

    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }

    current.data = successor.data;

    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  min() {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
