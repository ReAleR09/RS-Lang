import PublisherSubscriber from '../Classes/PublisherSubscriber';

export default class View {
  constructor(props) {
    this.props = props;
    this.element = null;
    this.subscriptions = [];
  }

  // please make sure that html is always wrapped into one top-level tag
  render() {
    return `<div>${this.props}</div>`;
  }

  viewMounted() {
    if (this.onMount) {
      this.onMount();
    }
  }

  viewUnmounted() {
    if (this.onUnmount) {
      this.onUnmount();
    }
    this.props = null;
    this.element = null;
    this.subscriptions.forEach((unsub) => unsub());
    this.subscriptions = null;
  }

  get element() {
    return this.domElement;
  }

  set element(domElement) {
    this.domElement = domElement;
  }

  subscribe(event, data) {
    const unsub = PublisherSubscriber.subscribe(event, data);
    this.subscriptions.push(unsub);
  }

  static publish(event, data = null) {
    PublisherSubscriber.publish(event, data);
  }
}
