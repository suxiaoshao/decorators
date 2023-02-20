interface FieldTypeDefile{
    key:string|symbol
    type:TypeItem
}

type TypeItem="string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

const typeFlag=Symbol();


function validator<TClass extends new (...args: any[]) =>object>(){
  return (value:TClass , object:ClassDecoratorContext) => {
     return class Inner extends value{
        static [typeFlag]=new Map()
        validator(){
            return Object.entries(this).every(([key,value])=>{
                
                const types:Map<string,TypeItem> = Inner[typeFlag];
                const type=types.get(key)
                if(!type){
                    return true
                }
                return (typeof value)===type
            })
        }
    }
  }
}


function typeDefine(type:TypeItem){
  return (value:undefined, { kind, name ,addInitializer}:ClassFieldDecoratorContext) => {    
      return function <T extends unknown>(initialValue:T) {
        // @ts-ignore
        this.constructor[typeFlag].set(name,type)
        return initialValue
      } 
    
  }
}


@validator()
class Foo {
    @typeDefine('string')
    str:string
    @typeDefine('number')
    num:number
    constructor(str:string,num:number){
        this.str=str
        this.num=num
    }
}

const foo=new Foo('',1)

// @ts-ignore
console.log(foo.validator())

// @ts-ignore
const boo=new Foo(1,'')

// @ts-ignore
console.log(boo.validator())
