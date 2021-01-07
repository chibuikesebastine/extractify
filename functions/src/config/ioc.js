class IOC {
  constructor(){
    this.services = {};
  }

  bind(name, cb){
    Object.defineProperty(this, name, {
      get: () => {
        if(!this.services.hasOwnProperty(name)){
          return this.services[name] = cb(this);
        }

        return this.services[name];
      },
      configurable: true,
      enumerable: true
    });

    return this;
  }
}

module.exports = IOC;
