/**
 * 发布订阅模式
 * 1. 定义一个缓存Map对象存储所有订阅对象(_subscribers)
 * 2. 定义_index下标，可订阅同一个主题多次，而不会被覆盖
 * 3. on方法存储订阅者和回调至缓存列表中(可多次订阅一个主体)，返回订阅者名称和对应key值
 * 4. emit发布消息，执行对应订阅者回调，通过Map.get获取到
 * 5. destroy销毁指定订阅者，通过Map.delete直接销毁订阅者
 * 6. remove删除，清空所有缓存订阅者信息。
 */
class Event {
  constructor () {
    this._subscribers = new Map();
    this._index = 0;
  }

  /**
   * 将订阅者信息存入list
   * 通过 Map 来存取对应的订阅者
   * 监听同一主体，下一次的不会覆盖上一次的监听
   * 返回订阅者名称，和对应的下标，可供后面销毁
   * @param {String} eventName 事件名称 
   * @param {Function} callback 订阅回调 
   */
  subscribe (eventName, callback) {
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('parameter error');
    }
    
    if (!this._subscribers.has(eventName)) {
      this._subscribers.set(eventName, new Map());
    }

    // 订阅同一个主题通过_index不会覆盖上一次
    this._subscribers.get(eventName).set(++this._index, callback);

    return [eventName, this._index];
  }

  on (eventName, callback) {
    return this.subscribe(eventName, callback);
  }

  /**
   * 发布信息
   * @param {String} eventName 订阅者名称
   * @param  {...any} args 参数
   */
  emit (eventName, ...args) {
    if (this._subscribers.has(eventName)) {
      const eventMap = this._subscribers.get(eventName);
      eventMap.forEach(map => map(...args)); 
    } else {
      throw new Error(`The subscription parameter ${eventName} does not exist`);
    }
  }

  /**
   * 销毁对应订阅者
   * @param {String|Object} event 
   */
  destory (event) {
    if (typeof event === 'string') {
      // 直接销毁对应订阅者
      if (this._subscribers.has(event)) {
        this._subscribers.delete(event);
      }
    } else if (typeof event === 'object') {
      // 通过订阅者名称和下标，销毁其中一个订阅者
      const [eventName, key] = event;
      this._subscribers.get(eventName).delete(key);
    }
  }

  /**
   * 清除所有订阅者
   */
  remove () {
    this._subscribers.clear();
  } 
}

const $event = new Event();

const ev1 = $event.on('aa', (...args) => {
  console.log(...args);
  console.log(111);
});

const ev2 = $event.on('aa', (...args) => {
  console.log(...args);
  console.log(222);
});

setTimeout(() => {
  $event.emit('aa', '1', '2');
  $event.destory();
  $event.remove();
}, 500);