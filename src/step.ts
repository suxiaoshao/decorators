function step(name:string){
  return function(target:any  , object:DecoratorContext){
    console.log('Step', name, target,object.name,object.kind);
  }
}

@step('1')
@step('2')
@step('3')
class Step{
  @step('12')
  static s:string='Step'
  @step('13')
  static s2(){}
  @step('5')
  @step('4')
  #name:string='Step'
  @step('10')
  accessor str:string='Step'
  @step('6')
  num:number=1
  @step('7')
  say() {}
  @step('11')
  accessor str2:string='Step'
  @step('8')
  key:string='Step'
  @step('9')
  drop(){}
}