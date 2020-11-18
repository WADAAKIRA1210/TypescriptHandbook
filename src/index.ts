//Interface
/*typescript のコア原則の1つとして、型チェックが値の形状に焦点を当てること
//これは、「ダッグタイピング」or「構造サブタイピング」と呼ばれることもある
interfaceはコード内、プロジェクト外のコードの取り決めを定義する協力な方法*/

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
// let myTriangle = createTriangle({ colour: "red", width: 100 });
/*オブジェクトリテラルに「ターゲットタイプ」にないプロパティがある場合、エラーが発生します。今回の場合colourというオブジェクトリテラルがTriangleConfigに存在しない*/

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
が存在すれば、機能する。しかしcolourのみだとerrorになる */

//-----------------Function Types-----------------
