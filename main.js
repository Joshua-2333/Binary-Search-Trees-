const { Tree, generateRandomArray } = require('./bst');

// Step 1: Create tree with random numbers < 100
const tree = new Tree(generateRandomArray(15));
console.log("Initial Tree:");
tree.prettyPrint();

// Step 2: Check if tree is balanced
console.log("Is balanced?", tree.isBalanced());

// Step 3: Print traversals
console.log("Level Order:");
tree.levelOrderForEach(node => console.log(node.data));

console.log("Preorder:");
tree.preOrderForEach(node => console.log(node.data));

console.log("Inorder:");
tree.inOrderForEach(node => console.log(node.data));

console.log("Postorder:");
tree.postOrderForEach(node => console.log(node.data));

// Step 4: Unbalance the tree
[101, 110, 120, 130, 140].forEach(num => tree.insert(num));
console.log("After unbalancing:");
tree.prettyPrint();

// Step 5: Check balance again
console.log("Is balanced?", tree.isBalanced());

// Step 6: Rebalance
tree.rebalance();
console.log("After rebalancing:");
tree.prettyPrint();

// Step 7: Final check
console.log("Is balanced?", tree.isBalanced());

console.log("Final Level Order:");
tree.levelOrderForEach(node => console.log(node.data));

console.log("Final Preorder:");
tree.preOrderForEach(node => console.log(node.data));

console.log("Final Inorder:");
tree.inOrderForEach(node => console.log(node.data));

console.log("Final Postorder:");
tree.postOrderForEach(node => console.log(node.data));
