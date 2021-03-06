// 自定义AVL树 AVLTree
class MyAVLTree {
  constructor () {
    this.root = null;
    this.size = 0;
  }

  // 比较的功能
  compare (keyA, keyB) {
    if (keyA === null || keyB === null)
      throw new Error("key is error. key can't compare.");
    if (keyA > keyB)
      return 1;
    else if (keyA < keyB)
      return -1;
    else
      return 0;
  }

  // 获取某个节点的高度 -
  getHeight (node) {
    // 节点为空 返回0
    if (!node)
      return 0;

    // 直接返回这个节点的高度 
    return node.height;
  }

  // 获取一个节点的平衡因子 -
  getBalanceFactor (node) {
    // 节点为空 返回0
    if (!node)
      return 0;

    // 左右子树的高度值
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    // 左子树的高度 - 右子树高度的值 = 平衡因子
    return leftHeight - rightHeight;
  }

  // 根据key获取节点 -
  getNode (node, key) {
    // 先解决最基本的问题
    if (node === null) return null;

    // 开始将复杂的问题 逐渐缩小规模
    // 从而求出小问题的解，最后构建出原问题的解
    switch (this.compare(node.key, key)) {
      case 1 :  // 向左找
        return this.getNode(node.left, key);
      break;
      case -1 : // 向右找
        return this.getNode(node.right, key);
      break;
      case 0 :  // 找到了
        return node;
      break;
      default :
        throw new Error("compare result is error. compare result : 0、 1、 -1 .");
      break;
    }
  }

  // 添加操作 +
  add (key, value) {
    this.root = this.recursiveAdd(this.root, key ,value);
  }

  // 添加操作 递归算法 -
  recursiveAdd (node, key, value) {

    // 解决最简单的问题
    if (node === null) {
      this.size ++;
      return new MyAVLTreeNode(key, value);
    }

    // 将复杂的问题规模逐渐变小，
    // 从而求出小问题的解，从而构建出原问题的答案
    if (this.compare(node.key, key) > 0)
      node.left = this.recursiveAdd(node.left, key, value);
    else if (this.compare(node.key, key) < 0)
      node.right = this.recursiveAdd(node.right, key, value);
    else
      node.value = value;

    // 在这里对节点的高度进行重新计算  节点本身高度为1
    // 计算方式： 1 + 左右子树的height值最大的那个height值
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // 计算一个节点的平衡因子
    const balanceFactor = this.getBalanceFactor(node);

    // 如果平衡因子的绝对值大于1 说明不满足AVL平衡二叉树的性质了
    if (Math.abs(balanceFactor) > 1) {
      console.log(node.toString() + "  unbalanced : " + balanceFactor + "\r\n");
      document.body.innerHTML += node.toString() + "  unbalanced : " + balanceFactor + "<br/>";
    }

    return node;
  }

  // 删除操作 返回被删除的元素 +
  remove (key) {
    let node = this.getNode(this.root, key);
    if (node === null) 
      return null;

    this.root = this.recursiveRemove(this.root, key);
    return node.value;
  }

  // 删除操作 递归算法 +
  recursiveRemove (node, key) {

    // 解决最基本的问题
    if (node === null)
      return null;

    if (this.compare(node.key, key) > 0) {
      node.left = this.recursiveRemove(node.left, key);
      return node;
    } else if (this.compare(node.key, key) < 0) {
      node.right = this.recursiveRemove(node.right, key);
      return node;
    } else {
      // 当前节点的key 与 待删除的key的那个节点相同
      // 有三种情况
      // 1. 当前节点没有左子树，那么只有让当前节点的右子树直接覆盖当前节点，就表示当前节点被删除了
      // 2. 当前节点没有右子树，那么只有让当前节点的左子树直接覆盖当前节点，就表示当前节点被删除了
      // 3. 当前节点左右子树都有， 那么又分两种情况，使用前驱删除法或者后继删除法
      //      1. 前驱删除法：使用当前节点的左子树上最大的那个节点覆盖当前节点
      //      2. 后继删除法：使用当前节点的右子树上最小的那个节点覆盖当前节点
      
      if (node.left === null) {
        let rightNode = node.right;
        node.right = null;
        this.size --;
        return rightNode;
      } else if (node.right === null) {
        let leftNode = node.left;
        node.left = null;
        this.size --;
        return leftNode;
      } else {
        let predecessor = this.maximum(node.left);
        node.left = this.removeMax(node.left);
        this.size ++;

        // 开始嫁接 当前节点的左右子树
        predecessor.left = node.left;
        predecessor.right = node.right;

        // 将当前节点从根节点剔除
        node = node.left = node.right = null;
        this.size --;

        // 返回嫁接后的新节点
        return predecessor
      }
    }
  }

  // 删除操作的两个辅助函数
  // 获取最大值、删除最大值
  // 以前驱的方式 来辅助删除操作的函数

  // 获取最大值
  maximum (node) {

    // 再也不能往右了，说明当前节点已经是最大的了
    if (node.right === null) 
      return node;

    // 将复杂的问题渐渐减小规模，从而求出小问题的解，最后用小问题的解构建出原问题的答案
    return this.maximum(node.right);
  }

  // 删除最大值
  removeMax (node) {

    // 解决最基本的问题
    if (node.right === null) {
      let leftNode = node.left;
      node.left = null;
      this.size -- ;
      return leftNode;
    }

    // 开始化归
    node.right = this.removeMax(node.right);
    return node;
  }

  // 查询操作 返回查询到的元素 +
  get (key) {
    let node = this.getNode(this.root, key);
    if (node === null)
      return null;
    return node.value;
  }

  // 修改操作 +
  set (key, value) {
    let node = this.getNode(this.root, key);
    if (node === null)
      throw new Error(key + " doesn't exist.");

    node.value = value;
  }

  // 返回是否包含该key的元素的判断值  +
  contains (key) {
    return this.getNode(this.root, key) !== null;
  }

  // 返回映射中实际的元素个数 +
  getSize () {
    return this.size;
  }

  // 返回映射中是否为空的判断值  +
  isEmpty () {
    return this.size === 0;
  }

  // @Override toString() 2018-11-05-jwl
  toString () {
    let mapInfo = `MyBinarySearchTreeMap: size = ${this.size}, data = [ `;
    document.body.innerHTML += `MyBinarySearchTreeMap: size = ${this.size}, data = [ <br/><br/>`;

    // 以非递归的前序遍历 输出字符串
    let stack = new MyLinkedListStack();

    stack.push(this.root);

    if (this.root === null)
      stack.pop();

    while(!stack.isEmpty()) {
      let node = stack.pop();

      if (node.left !== null)
        stack.push(node.left);
      if (node.right !== null)
        stack.push(node.right);

      if (node.left === null && node.right === null) {
        mapInfo += ` ${node.toString()} \r\n`;
        document.body.innerHTML += ` ${node.toString()} <br/><br/>`;
      } else {
        mapInfo += ` ${node.toString()}, \r\n`;
        document.body.innerHTML += ` ${node.toString()}, <br/><br/>`;
      }
    }

    mapInfo += ` ] \r\n`;
    document.body.innerHTML += ` ] <br/><br/>`;

    return mapInfo;
  }
}

