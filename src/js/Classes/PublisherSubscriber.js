const subscribers = {};

const PublisherSubscriber = {
  publish(event, data = null) {
    if (!subscribers[event]) return;

    subscribers[event].forEach((subCallback) => {
      subCallback(data);
    });
  },
  subscribe(event, callback) {
    if (!subscribers[event]) {
      subscribers[event] = [];
    }

    subscribers[event].push(callback);

    const unsubscribe = () => {
      const index = subscribers[event].indexOf(callback);
      subscribers[event].splice(index, 1);
    };

    return unsubscribe;
  },
};

export default PublisherSubscriber;
