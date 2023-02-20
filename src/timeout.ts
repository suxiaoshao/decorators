function timeout(time:number){
  return function <Res extends any,Args extends any[],T extends (...args:Args)=>Res,C extends unknown>(value:T, { kind, name }:ClassMethodDecoratorContext<C,T>):T {
      return function (...args) {
        const flag=setTimeout(()=>{
          throw new Error(`timeout ${time}ms`)
        },time)
        // @ts-ignore
        const ret = value.call(this as C,...args);
        clearTimeout(flag);
        return ret;
      } as T;
    }
}

function timeoutAsync(time:number){
  return function <Res extends Promise<any>,Args extends any[],T extends (...args:Args)=>Res,C extends unknown>(value:T, { kind, name }:ClassMethodDecoratorContext<C,T>):T {
      return async function (...args) {
        const flag=setTimeout(()=>{
          throw new Error(`timeout ${time}ms`)
        },time)
        // @ts-ignore
        const ret = await value.call(this as C,...args);
        clearTimeout(flag);
        return ret
      } as T;
    }
}

function wait(time:number){
  return new Promise((resolve)=>{
    setTimeout(resolve,time)
  })
}

class TestTimeout {
    data:number
    @timeout(1000)
    test(){
      return this.data
    }
    @timeoutAsync(1000)
    async testAsync(){
      await wait(2000)
      return this.data
    }
    constructor(data:number){
      this.data=data
    }
}

async function testFn(){
  const testTimeout=new TestTimeout(1)
  console.log(testTimeout.test())
  console.log(await testTimeout.testAsync())
}
testFn()