abstract class Component {
    abstract render():string
    print(){
        console.log(this.render());
    }
}
function reactive<T extends unknown,C extends Component>({get,set}:ClassAccessorDecoratorTarget<C,T>,{}:ClassAccessorDecoratorContext):ClassAccessorDecoratorResult<C,T> {
    return {
        get(){
            return get.call(this)
        },
        set(value:T){
            console.log('set',value);
            this.print()
            set.call(this,value)
        },
        init:(value:T)=>value
    }
}

class Test extends Component {
    @reactive
    accessor str:string
    @reactive
    accessor num:number
    unreactiveStr:string
    constructor(str:string,num:number,unreactiveStr:string){
        super()
        this.str=str
        this.num=num  
        this.unreactiveStr=unreactiveStr
    }
    render(){
      return `str:${this.str},num:${this.num},unreactiveStr:${this.unreactiveStr}`
    }
}


const test=new Test('1',1,'1')
test.num=2
test.str='2'
test.unreactiveStr='2'