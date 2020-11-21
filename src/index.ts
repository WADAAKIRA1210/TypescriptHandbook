/*-------------function introdunction------------- */
/*functionはJavaScriptのあらゆるapplicationのfundamentalなbuilding 要素です。
これらは、構築する方法　abstraction layers,  mimicking(模倣) classes, infoation hidding, modulesを.
typescriptは、classes, namespace, moduleをもち、functionは play the key role（重要な役割をする）
どのようにものが動くのかを説明する上で。
typescriptはまた追加した、いくつか新しいcapabilities（機能）を、standard JavaScript functions（標準のJavaScipt関数に）。
*/

/*-------------Functions------------- */
/*typescriptがjavascriptと（just as）全く同じように named function(名前付き関数)
or anonypmous function(無名関数)を作成することができる。
これは、applicationにとって、最も適切な選択をできることを許す。
APIの関数listを作成するのか、または他の関数を手渡しする1度きりの関数（a one-off function to hand off）を作成するのか。*/
//とりあえずjavascriptのような見た目の2つの書き方を下記に示す
// //Named function
// function add(x, y) {
//   return x + y;
// }
// //znonymous function
// let myadd = function(x, y) {
//   return x + y;
// }
/*javascriptと同様に、functionは本文の外側の変数を参照する（refer to variables）ことが可能である。
これはvaliableをcapture(補足)すると言われる。
これがどのように動作しているかについて、大変重要だが、それは今回の記事の範囲外になります*/
// let z = 100;

// function addToZ(x, y) {
//   return x + y = z;
// }

/*-------------Funtion Types-------------*/

// typing the function（関数への型付）
function add(x: number, y: number): number {
  return x + y;
}
let myadd = function (x: number, y: number): number {
  return x + y;
};
/*それぞれのパラメータにtypeを加えることができ、関数地震の戻り値にも型を追加することができる。
typescriptでは戻り値の文も見ることで、その型を知ることができ、また、それを指定するしかないか任意に決めることが可能 */

/*-------------Writing the function Types-------------*/
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
/*function typeには、引数の型と戻り値の型がある。
関数型全体を書き出す時は、両方必要になる。parameter listのようにparameter typeを
書きだし、それぞれのパラメータのnameとtypeを与える。このnameは読むことを助ける脳なnameにする
代わりに下記のようにも記述できる*/
let myAdd2: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

/*parameter typeが並んでいる限り、funtion typeでparameterにつけたnameに関係なく、
functionの有効なtypeとみなされる。

２番目の箇所は戻り値のtypeです。parameterと戻り値のtypeの間に=>を使用して、どちらが戻り値の型であるかを明確に示す。
前述のように、これはfunction typeの必須部分であるためfunctionが値を返さない場合は、
省略せずにvoidを使用する

注目すべきは（Of note）、parameterと戻り値のtypeだけ関数型を構成している（make up）こと。
captureされた変数はfunctionの非表示状態の一部であり、そのAPIを構成しない*/

/*-------------Inferring the Types(型推論)------------- */
/*下記例を動かすと、typescriptのcompilerは,
式の片方（one side of wquation）だけでも、その型を理解するかもしれない */
let myAdd3 = function (x: number, y: number): number {
  return x + y;
};

let myadd4: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};

/*上記は"contextual typing文脈上の型付"と呼ばれる、型推論の形式である。
これは、programのtypingを減らすkとに大いに貢献してくれるでしょう*/

/*-------------Optional and Default Parameters(任意引数とデフォルト引数)-------------*/
/*typescriptでは、全てのパラメータはfunctionによって 必要とされるとassume（みなされる）
これはnullとundifinedを与えることができないという意味ではない、
しかし、むしろその関数が呼ばれる場合、コンパイラは書く引数に提供されている値をチェックする

また、これらの引数だけが、関数へ渡される引数であるとみなす。
In short（端的にいうと）、関数に渡される引数の数は、関数が期待する引数の数と一致させる必要がある*/

function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}
// let result1 = buildName("Bob");
// let result2 = buildName("Bob", "Adams", "Sr.");
let result3 = buildName("Bob", "Adams");

/*optionalとしてパラメータの末尾に”？”をつけとことで、
javascriptのように引数を任意にし、引数がなかった場合undefinedをありあてる
下記に上記例のlastNameを任意の引数に変更する*/
function buildName2(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
let result4 = buildName2("Bob");
// let result5 = buildName("Bob", "Adams", "Sr.");
let result6 = buildName("Bob", "Adams");
/*任意の引数は、必須の引数の後ろに指定しなければならない。もし、今回の例でいうと
lastNameではなく、firstNameを任意にしたければ、引数の指定の順番を変更する必要がある。

typescriptでは、もしユーザがその引数に値を指定しなかった場合、またはundefinedを指定した場合、
その引数に割り当てる値を設定することも可能です。これは、デフォルト初期化引数（default-initialized parameters）と呼ばれている
上記例のlastNameに'Smith'をデフォルト値として設定する*/
function buildName3(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
let result7 = buildName3("Bob");
// let result8 = buildName3("Bob", "Adams", "Sr.");
let result9 = buildName3("Bob", "Adams");
let result10 = buildName3("Bob", undefined);

/*全ての必須引数の後ろに配置される デフォルト初期引数は任意として扱われるため、
関数の呼び出し時に省略することが可能である。
これは、任意引数と末尾のデフォルト引数はそれらの型が共通することを意味し、そのため
下記の型だけをもつことになる */
//(firstName: string, lastName?: string) => string
/*lastNameのdefault 値はその引数の任意であるという事実だけを残して、
型の情報からは消失する.
素の任意の引数とは異なり、デフォルト初期化引数は必須引数の後ろに配置する必要はない。
もし、デフォルト初期化引数がいずれかの必須引数よりも前にある場合は、ユーザーは初期値を取得するには、
明示的にundefinedを渡す必要がある。*/

function buildName4(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}
// let result11 = buildName4("Bob");
// let result12 = buildName4("Bob", "Adams", "Sr.");
let result13 = buildName4("Bob", "Adams");
let result14 = buildName4(undefined, "Adams");
