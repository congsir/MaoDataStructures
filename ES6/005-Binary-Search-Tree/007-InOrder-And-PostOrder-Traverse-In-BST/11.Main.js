// main 函数
class Main {
  constructor () {
    this.alterLine("MyBinarySearchTree Area");
    let myBinarySearchTree = new MyBinarySearchTree();
    let nums = [5, 3, 6, 8, 4, 2];
    for (var i = 0; i < nums.length; i++) {
      myBinarySearchTree.add(nums[i]);
    }

    /////////////////
    //      5      //
    //    /   \    //
    //   3    6    //
    //  / \    \   //
    // 2  4     8  //
    /////////////////
    
    this.alterLine("MyBinarySearchTree PreOrder Area");
    myBinarySearchTree.preOrder(this.show);

    this.alterLine("MyBinarySearchTree InOrder Area");
    myBinarySearchTree.inOrder(this.show);

    this.alterLine("MyBinarySearchTree PostOrder Area");
    myBinarySearchTree.postOrder(this.show);

  }

  // 将内容显示在页面上
  show (content) {
    document.body.innerHTML += `${content}<br /><br />`;
  }

  // 展示分割线
  alterLine (title) {
    let line = `--------------------${title}----------------------`
    console.log(line);
    document.body.innerHTML += `${line}<br /><br />`;
  }
}

// 页面加载完毕
window.onload = function () {
  // 执行主函数
  new Main();
}
