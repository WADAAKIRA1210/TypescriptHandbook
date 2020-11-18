/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("\n//Interface\n//typescript のコア原則の1つとして、型チェックが値の形状に焦点を当てること\n//これは、「ダッグタイピング」or「構造サブタイピング」と呼ばれることもある\n//interfaceはコード内、プロジェクト外のコードの取り決めを定義する協力な方法\n//-----------------簡単な例-----------------\n//コンパイラは必要なもの,typeがあるか存在するかを確認する（今回の場合label）\nfunction printLabel(labeledObj) {\n    console.log(labeledObj.label);\n}\nvar myObj = { size: 10, label: \"Size 10 Object\" };\nprintLabel(myObj);\nfunction printLabel2(labeledObj) {\n    console.log(labeledObj.label);\n}\nvar myObj2 = { size: 10, label: \"Size 10 Object\" };\nprintLabel(myObj2);\nfunction createSquare(config) {\n    var newSquare = { color: \"white\", area: 10 };\n    if (config.color) {\n        newSquare.color = config.color;\n    }\n    if (config.width) {\n        newSquare.area = config.width * config.width;\n    }\n    return newSquare;\n}\nvar mySquare = createSquare({ color: \"black\" });\nvar yourInfo = { color: \"blue\", width: 100 };\nvar yourSquare = createSquare(yourInfo);\nconsole.log(mySquare, yourSquare);\nvar p1 = { x: 10, y: 20 };\n// p1.x = 5 //errorになる\n//全ての変更メソッドが削除されたArray<T>とReadonly Array<T> typeは同じのため作成後に配列を変更しないようにすることができる\n//下記のようにすることで、読みとり専用にすることができる(下記の場合メモリの参照をコピーするため、roの値は変更されるのでaを使用しないようにする？)\nvar a = [1, 2, 3, 4];\nvar ro = a;\na[1] = 3;\n// ro[2] = 3; //error\na.push(5);\n// ro.push(5); //error\nconsole.log(a, ro);\n//type assertionでオーバーライドすることができる\nvar b = [1, 2, 3, 4];\nvar ro2 = a;\nb = ro2;\nb[1] = 4;\nconsole.log(b, ro2, a, ro);\n\n\n//# sourceURL=webpack://documentation/./src/index.ts?");
/******/ })()
;