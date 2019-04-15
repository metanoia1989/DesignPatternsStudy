var saleOffices = {};  // 发布者

saleOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

// 增加订阅者
saleOffices.listen = function (key, fn) {
  // 如果没有订阅过此消息，给该类消息创建一个缓存列表
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }

  this.clientList[key].push(fn);
}

// 发布消息
saleOffices.trigger = function () {
  const args = arguments;
  const key = Array.prototype.shift.call(args);
  const fns = this.clientList[key];

  fns.forEach(fn => {
    fn.apply(this, args);
  });
}


// 测试
saleOffices.listen('squareMeter88', (price) => { // 小明订阅消息
  console.log('亲爱的小明，价格：', price);
});

saleOffices.listen('squareMeter110', (price) => { // 小红订阅消息
  console.log('亲爱的小红，价格：', price);
});

saleOffices.trigger('squareMeter88', '200万'); // 发布 88 平方米房子的价格
saleOffices.trigger('squareMeter110', '300万'); // 发布 100 平方米房子的价格