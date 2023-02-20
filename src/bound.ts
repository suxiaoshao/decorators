function bound<Res extends any,Args extends any[],T extends (...args:Args)=>Res,C extends unknown>(value:T, { name, addInitializer }:ClassMethodDecoratorContext<C,T>) {
  addInitializer(function () {
    // @ts-ignore
    this[name] = this[name].bind(this);
  });
}

class C {
  message = "hello!";

  @bound
  m() {
    console.log(this.message);
  }
}

let { m } = new C();

m(); // hello!