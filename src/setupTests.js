class LocalStorageMock {
  constructor() {
    this.store = {};
    jest.spyOn(this, "setItem");
    jest.spyOn(this, "getItem");
    jest.spyOn(this, "removeItem");
    jest.spyOn(this, "clear");
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}
