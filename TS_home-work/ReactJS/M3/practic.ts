//1
<<<<<<< HEAD
function concat(first:string,second:string):string{return first+second};
=======
function concat(first:string,second:string):string{return first+''+second};
>>>>>>> 3a263bb77f7524621b0f00c050fda67cf753c28a
concat('Hello ', 'World');

//2
interface HomeTaskInterFace{
    howIDoIt: string,

    simeArray: Array<string|string|number>,

    withData: Array<{howIDoIt:string,simeArray:Array<string|number>}>,
    

}

const MyHometask: HomeTaskInterFace = {

    howIDoIt: "I Do It Wel",

    simeArray: ["string one", "string two", 42],

    withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],

}
//3 Done

const myArray:MyArray<number> = [1,2,3];
const initalValue:number = 0;

interface MyArray<T> {

  [N: number]: T;

<<<<<<< HEAD
 reduce<U>(callbackfn:(acc:T,val:T,index:number,arr:MyArray<T>)=>U,init:T):MyArray<U> ;
=======
 reduce<U>(result:U, num:T): U[] ;
>>>>>>> 3a263bb77f7524621b0f00c050fda67cf753c28a

}


<<<<<<< HEAD
[1,2,3].reduce((accumulator, value) => accumulator + value, initialValue);
=======
let arr = myArray.reduce((result:number, num:number)=> {
  return result + num;
}, initVal);
>>>>>>> 3a263bb77f7524621b0f00c050fda67cf753c28a
//4

interface IHomeTask {

  data: string;

  numbericData: Date;

  externalData: {

      basis: number;

      value: string;

  }

}


const homeTask: MyPartial<IHomeTask> = {
externalData: {
value: 'win',
}

}
type MyPartial<T> = {

    [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N]

}