//Interface
/*typescript のコア原則の1つとして、型チェックが値の形状に焦点を当てること
//これは、「ダッグタイピング」or「構造サブタイピング」と呼ばれることもある
interfaceはコード内、プロジェクト外のコードの取り決めを定義する強力な方法*/

//-----------------簡単な例-----------------
//コンパイラは必要なもの,typeがあるか存在するかを確認する（今回の場合label）
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
//下記がinterfaceを利用した例
interface LabeledValue {
  label: string;
}

function printLabel2(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj2 = { size: 10, label: "Size 10 Object" };
printLabel(myObj2);

//-----------------Optional Properties-----------------
/*interfaceの全てのプロパティが必要なわけではない。
特定の条件下で存在するものもあれば、全く存在しないものもある。
これらのOptionのプロパティは、いくつかのプロパティのみが入力されている関数にオブジェクトを渡す「オブジェクトバッグ」のようなパターンを作成する時に使用される例*/
interface SquareConfug {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfug): { color: string; area: number } {
  let newSquare = { color: "white", area: 10 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
let yourInfo: SquareConfug = { color: "blue", width: 100 };
let yourSquare = createSquare(yourInfo);
console.log(mySquare, yourSquare);
/*optionのプロパティの利点は、interfaceの一部ではないプロパティの使用を防ぎながら、これらの利用可能なプロパティを記述できること（今回の場合colorプロパティ）
under code*/

// function createSquare2(config: SquareConfug): { color: string; area: number } {
//     let newSquare = { color: "white", area: 10 };
//     if (config.clor) {
//       newSquare.color = config.clor;
//     }
//     if (config.width) {
//       newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }
// let mySquare2 = createSquare2({ color: 'black'});

//-----------------Readonly properties-----------------
/*いくつかのプロパティは、Objectが最初に作成された時のみ変更が可能である必要がある
プロパティの読み取り前に読み取り専用を記述することで、これを指定することができる*/
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5 //errorになる

/*全ての変更メソッドが削除されたArray<T>とReadonly Array<T> typeは同じのため作成後に配列を変更しないようにすることができる
下記のようにすることで、読みとり専用にすることができる(下記の場合メモリの参照をコピーするため、roの値は変更されるのでaを使用しないようにする？)*/
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
a[1] = 3;
// ro[2] = 3; //error
a.push(5);
// ro.push(5); //error
console.log(a, ro);

/*type assertionでオーバーライドすることができる*/
let b: number[] = [1, 2, 3, 4];
let ro2: ReadonlyArray<number> = a;

b = ro2 as number[];
b[1] = 4;
console.log(b, ro2, a, ro);

/*Point!!! constとReadonlyの使い分けは、変数とプロパティのどちらを使用しているか
変数はconst, プロパティはReadonly*/

//-----------------Excess(過剰な) Propety Checks-----------------
/*上記の最初の簡単な例とoption bagsを単純に組み合わせるとエラーが潜入する可能性が出てくる。その例を下記に示す */
interface TriangleConfig {
  color?: string;
  width?: number;
}

function createTriangle(
  config: TriangleConfig
): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? (config.width * config.width) / 2 : 20,
  };
}
/*オブジェクトリテラルに「ターゲットタイプ」にないプロパティがある場合、エラーが発生します。今回の場合colourというオブジェクトリテラルがTriangleConfigに存在しない*/
// let myTriangle = createTriangle({ colour: "red", width: 100 });

/*type assertionを使用することで、上記のエラーを回避することができる*/
let myTriangle2 = createTriangle({
  width: 100,
  opacity: 0.5,
} as TriangleConfig);

/*ただし、オブジェクトに特別な方法で使用されるいくつかの追加のプロパティを含めることができることが正確な場合は、index signatureを追加することをおすすめ。
上記のタイプのcolor プロパティとwidthプロパティを持つことができるが、他のプロパティを持つことができる場合は、下記のように定義できる
下記では、TriangleCongigは任意の数のプロパティを持つことができ、color, widthでない場合はtypeは関係ない*/
interface TriangleConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

/* これらのExcess(過剰な) Propety Checksを回避する最後の手段についての説明
objectを別の変数に割り当てる。下記triangleOptionsは過剰なプロパティチェックを受けないため、エラーを回避できる*/

let triangleOptions = { colour: "red", width: 100 };
let myTriangle3 = createTriangle(triangleOptions);

/*上記の場合、triangleOptionsとtriangleConfigに共通のプロパティ（今回の場合width）
が存在すれば、機能する。従って、colourのみだとerrorになる */

//-----------------Function Types-----------------
/*interface でfunction typeを記述するためには、
呼び出しシグネチャ（関数やメソッドの名前、引数の数やデータ型、返り値の型などの組み合わせのことをシグネチャという）
を与える。パラメータリストの格パラメータには、名前とtypeの両方が必要になる。
下記、例 */

interface SearchFunc {
  (source: string, subString: string): boolean;
}
/*上記のように定義すると、他のinterfaceと同じように、このfunction typeを使用でき。
下記では、function typeを作成し、それに同じ型の関数値を割り当てる方法を示している*/
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
console.log(mySearch("jjjaaa", "aaa"));

/* function typeは正しくtype checkを行う（上記の時みたいに過剰に型チェックをしない）
ため下記のように記述することができる*/

mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};

/* function　パラメーターは一度に1つずつチェックされ、対応するパラメータ位置のtypeが相互にチェックされる
関数の内容を書くときに引数を指定したくない場合は、interfaceで指定した型が直接割り当てられるため、
関数の内容を書くところで引数の型を推測する。そのため、下記のように書いてもここではfalse と　trueが返り値となる*/
let yourSearch: SearchFunc;
yourSearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
/*戻り値にnumberやstringを返した場合、type checkは戻り値がinterfaceで定義したものと一致しないのでエラーを返す */
let herSearch: SearchFunc;
// herSearch = function (src, sub) {
//   let result = src.search(sub);
//   return 'string';
// };

//-----------------Indexable Types-----------------
/*function typeを記述するためにinterfaceを利用すると同様に、
indexableのようなこともinterfaceを用いることで記述することができる。
a[10], ageMap['daniel']のようなindexableの型には、
index signatureとindexを作成する時に対応する戻り値の型が存在する
まずは下記の例を見てみよう */

interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

console.log(myStr, myArray);

/*上記には、index signatureをもつstringArray interfaceがあります。
このindex signatureはstringArrayが数値で索引付けされると、文字列を返すことを示している

サポートされているindex signatureはstring and numberの２種類がある。
両方のtypeのindexerをサポートすることは可能です.
しかし、number indexerから返されるtypeは、
string indexerから返されるtypeのsubtypeである必要がある。
これは、numberでindexを作成する場合、javascriptはobjectにindexを
作成する前に、実際にそれを文字列に変換するからである。
つまり100(number)での索引付けは「100」(string)でのindex付と同じであるため、
2つは一貫している必要がある*/
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

interface NotOkay {
  // [x: number]: Animal;//numberの索引をもつstring indexをもつDogに変更できない
  [x: string]: Dog;
}

/*string index signetureはdictionary パターンを表す方法として強力である。
しかし、全てのプロパティをそれらの戻り値のtypeと一致させなければならない。
これは、string indexの宣言obj.propetyは、obj['property']として利用できるからです。
下記例では、nameのtypeはstring indexの型と一致しない(戻り値がnumber)ため、type checkerはerror を発生させる */
interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name: string;
}

/*割り当てを防ぐためにindex signatureを読み取り専用にする方法を下記例で示す */
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let yourArray: ReadonlyStringArray = ["Alive", "Bob"];
// yourArray[2] = 'Mallory'//error

//-----------------Class Types-----------------
/* 
Implementing an interface
C#やJavaのような言語でのinterfaceの最も使用される方法の1つ。
classが特定のコントラクトを満たすことができ、typescriptでもそれが可能*/
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  constructor(h: number, m: number) {}
}

/*classにImplementing されているinterfaceのmethodを下記のsetTimeの例のように
使用することができる */
interface ClockInterface2 {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock2 implements ClockInterface2 {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
/*interfaceはpublic側とprivate側の両方ではなく、classのpublic側を記述する
このことにより、それらを使用して、classのclass instanceのprivate側の特定typeもあることを確認できなくなる

classのstatic 側とinstanceの違いについて

classとinterfaceを使用することで、classが2つのtype、「static type」 と「instance type」
をもつことを手助けしてくれる。
construct signatureのあるinterfaceを作成し、このinterfaceを実装したクラスを作成しようとすると
エラーが発生する
*/

// interface ClockConstructor {
//   new (hour: number, minute: number);
// }
// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }

/*これはclassがinterdfaceを実装した場合、classのinstance側だけがcheckされるため。
constructorはstatic側であるため、このcheckの対象に含まれない 
代わりに、classのstatic側に直接それを行う必要がある。
下記例では、2つのinterfaceをdifineし、ClockConstructorはconstructorのための者で、
CloclInterfaceはinstance methodのための者になる。
下記例では、便宜上、渡された型のinstanceを作成するconstructor function createCloclをdefineしている*/

interface CloclConstructor {
  new (hour: number, minute: number): ClockInterface3;
}
interface ClockInterface3 {
  tick(): void;
}

function createClock(
  ctor: CloclConstructor,
  hour: number,
  minute: number
): ClockInterface3 {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tick");
  }
}
let digital = createClock(DigitalClock, 12, 7);
let analog = createClock(AnalogClock, 7, 32);

//-----------------Extending Interfaces-----------------
/*classのようにinterfaceは互いに拡張が可能です。
これは、もう一つのinterfaceのmemberをcopyするのを可能になる
interfaceを再利用のある部品へ柔軟に分離できるようにする
 */
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

/*interfaceは複数のinterfaceを拡張することが可能、すべてのinterfaceを結合したものを下記例に示す */
interface FenStroke {
  penWidth: number;
}
interface Square extends Shape, FenStroke {
  sideLength: number;
}

let square2 = <Square>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

//-----------------Hybrid Types-----------------
/*上記に書いたように、Javascriptは存在するリッチタイプを記述する。
Javascriptはdynamicで柔軟な性質があるため、上記のいくつかのtypeの組み合わせとして
機能するObjectに遭遇することがある

下記にその例の1つを示す。functionとObjectの両方としての機能し、追加のプロパティをもつObjectです*/
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
let c2 = getCounter();
c2(10);
c2.reset();
c2.interval = 5.0;

/*third partyのjavascriptを操作する場合、typeの形状を完全に説明するために
aboveのような記述をする必要あるcaseがある */

//-----------------Interface Extending Classes-----------------
/*interface typeがclass typeをextendする場合、classのmemberを継承するが、
そのimplementの中身は継承されない。これは、そのinterfaceがprovideされるimprimentを抜きに
そのclassの全てのmember　declearを持っているように動作する

interfaceは基盤となるclassのprivateとprotected　memberさえも継承する。
kれはprivateとprotectedのmemberをもつclassをextendsしたinterfaceを作成する際は、
interface typeはそのclass、またはそのclassのsubclassによってのみ実装が可能であることを意味する。

これは大規模な継承回想をもつが、codeはpaticular　のpropertyをhaveするsubclassのみで動作するように
指定したいcaseに便利。subclassがbase classからの継承以外の関連付けは不要です
下記が例*/
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control {
  select() {}
}
class TexBox extends Control {
  select() {}
}
class Image2 extends Control {}
class Location2 {
  select() {}
}
