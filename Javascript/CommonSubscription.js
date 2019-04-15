class Event {
  constructor() {
    this.clientList = [];
  }

  // 订阅
  listen (key, fn) {
    // 如果没有订阅过此消息，给该类消息创建一个缓存列表
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }

    this.clientList[key].push(fn);
  };

  // 发布消息
  trigger (...args)  {
    const key = Array.prototype.shift.call(args);
    const fns = this.clientList[key] || [];

    fns.forEach(fn => {
      fn.apply(this, args);
    });
  };

  // 取消订阅
  remove (key, fn) {
    let fns = this.clientList[key]; 

    if(!fns || fns.length === 0) {
      return false;
    }

    if (!fn) { // 没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
      fns && (fns = []);
    } else {
      this.clientList[key] = fns.filter(item => {
        return item !== fn;
      });
    }
  }
}


saleOffices = new Event;

saleOffices.listen('squareMeter88', fn1 = (price) => { // 小明订阅消息
  console.log('亲爱的小明，价格：', price);
});

saleOffices.listen('squareMeter88', fn2 = (price) => { // 小红订阅消息
  console.log('亲爱的小红，价格：', price);
});

saleOffices.remove('squareMeter88', fn1); // 删除小明的订阅

saleOffices.trigger('squareMeter88', '200万'); // 发布 88 平方米房子的价格
// saleOffices.trigger('squareMeter110', '300万'); // 发布 100 平方米房子的价格
