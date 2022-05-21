export default class Log {

  static _instance = null;

  constructor() {
    this.data = [];
  }

  static _getInstance() {
    if (Log._instance === null) {
      Log._instance = new Log();
    }

    return this._instance;
  }

  static add(message) {
    const log = Log._getInstance();

    log.data.push({
      id: log.data.length.toString(),
      message: message,
    });
  }

  static get() {
    return Log._getInstance().data;
  }


}
