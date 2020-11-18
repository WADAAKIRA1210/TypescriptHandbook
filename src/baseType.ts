// -------------number型について-------------
let decimal: number = 1;
let hex: number = 0xf;
let binary: number = 0b110;
let octal: number = 0o77;
// let big: bigint = 100n;
let big: number = 100;

console.log(decimal, hex, binary, octal, big);

//-------------string型について-------------
let color: string = "hello";
color = "red";
console.log(color);

let fulname: string = "wada keisuke";
let age: number = 23;
let sentence1: string = `my name is ${fulname}. 

I'll be ${age + 1} years old next mounth`;

console.log(sentence1);

let sentence2: string =
  "my nameis" +
  fulname +
  ".\n\n" +
  "I'll be " +
  (age + 1) +
  "years old next month";
console.log(sentence2);

//-------------Arrayでnumber型について-------------
let list1: number[] = [1, 2, 4, 5];
let list2: Array<number> = [1, 2, 3, 4];
console.log(list1, "\n", list2);

//-------------タプル型について-------------
let x: [string, number] = ["strings", 10]; //ok
// x = [10, 'strings']; //NG

console.log(x[0].substring(1));
// console.log(x[1].subsring(1)); 型に応じて使えるメソッドも限定される
// x[3] = 2; インデックスの外の値はNG

//-------------enumType列挙型について-------------
enum enColor {
  red = 1, //数値のセットをいれることで、より分かりやすくなる
  blue = 4,
  green,
}

let c: enColor = enColor.green;
console.log(c); //display 5

let colorName: string = enColor[5];
console.log(colorName);

//-------------unknown-------------
// 動的コンテンツなどで、ユーザーからわからない型を受け取る時に使用
let notSure: unknown = 4;
notSure = false;
notSure = "this is OK";
console.log(notSure);

//未知の変数がある場合はtypeofを用いることで、高度なtypeGardを用いることでより具体的な変数に絞り込める
declare const maybe: unknown;
// const aNumber: number = maybe; //unknownには型を直接いれることはできない
if (maybe === true) {
  const aBoolean: boolean = maybe; //OK
  // const aString:string = maybe; //NG
}
if (typeof maybe === "string") {
  // const aBoolean: boolean = maybe; //NG
  const aString: string = maybe; //OK
}

//-------------any-------------
//third partyや他の言語で書かれたものを使用する時に使用する
declare function getValue(key: string): any;
const str: string = getValue("myString");

//unknownとは異なり、any型の変数では存在しないプロパティであっても任意のプロパティにアクセスが可能。
//上記プロパティには関数プロパティが含まれており、それらの存在やtypeはチェックしない
let looselyTyped: any = 4;
looselyTyped.ifItExists(); //OK. ifItExistsが実行時に存在する可能性あり（このままでは実行した時にエラーになる）またunkownの場合はエラーになる
looselyTyped.toFixed(); //OK. numにはtoFixedは存在するが、コンパイラはチェックしない
console.log(looselyTyped.ifItExists());
console.log("end");

//-------------void-------------
//anyの逆に似ている、つまりtypeが全くない。またvoidは返り値がない場合に使用する.
//値にも割り当てれるがundifinedとnullしか持たないため、使いものにならない
function warnUser(): void {
  console.log("This is my warning message");
}
let unusable: void = undefined;
//unusable = null; //もし `--strictNullChecks（コンパイラの設定） がなければOK

//-------------Null and undifined-------------
//null and undifined are type. しかしvoidと同じように有用ではない。
//これらで定義した物は、これら以外の型をとることができない
//--strictNullChecksを使用すれば、他の型に割り当てが可能である
//これらを使用することで、いくつかエラーを回避できる
let u: undefined = undefined;
let n: null = null;
let aaa: string | null | undefined = "test";
aaa = n;

//-------------never-------------
//newver type　は存在しないタイプの型を表す・
//例えば、常に例外をスローする関数やアロー関数の戻り値、またはneverを返す戻り値である
//また変数またはneverは、trueになる可能性のあるタイプガードによって狭められたときに、neverタイプを取得しない

//'never'を返す関数には、到達可能なエンドポイントがあってはなりません
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}

//推定される戻り値の型は「never」ではありません
function fail() {
  return error("somthing failed");
}

//-------------Object-------------
//objectはノンプリエンティブ
// （number, string, boolean bigint, symbol, null, undefined）以外で
//表される型
//object typeを使用すると、Object.createなどのAPIをより適切に表現できます。

declare function create(o: object | null): void;

create({ prop: 0 });
create(null);
//create(42); create("string"); create(false); etc...

//-------------type assertion-------------
//type assertionとはコンパイラに「俺を信じろ、俺はこいつが何をしているか知っている」
//と伝える方法。as構文と<>の2つで表すことができる。しかしJSXではasのみ使用可能
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
let strLength2: number = (<string>someValue).length;
