//Лексическое окружение - Замыкание - Рекурсия

//Example 1

//{sayHi: Function} -> null
let personName = 'William'; //{sayHi: Function, personName: 'William'} -> null

function sayHi() {
    //{} -> globalScope
    console.log(`Hi, ${personName}`)
}

personName = 'Amelia';  //{sayHi: Function, personName: 'Amelia'} -> null

sayHi();  //{sayHi: Function, personName: 'Amelia'} -> null

//Ответ: Hi, Amelia


//Example 2

function foo() {
    const name2 = 'Alexey' //берет это значение из замыкания
    return () => {
        console.log(name2)
    }
}

let bar = foo();

name2 = 'Polina'; //сюда уже не пойдет выпрыгивать

bar(); //Alexey


//Example 3

let name3 = 'William';

function foo3() {
    return () => {
        return () => {
            return () => {
                console.log(name3)
            }
        }
    }
}

foo3()()()();


// ЛО - скрытый объект (из кода доступа не имеет)
// выглядит так:

const env = {
    environmentsRecords: {
        //содержит переменные, информация о this
    },
    outer: 'Env' | null //ссылка на внешний объект ЛО | null
};

// Объект ЛО всегда формируется для:
// script глобально, functions, code blocks (loops: for, while, if/else, for of/in)

// ЛО НЕ формируется для литерала объекта let a = {}

// Example 4
// Что такое переменная?

// {} -> null, ссылка нал, так как выше глобального скоупа ничего нет
let name4; //{name: undefined} -> null

name4 = 'Bob'; //{name: "Bob"} -> null
name4 = 'Olga'; //{name: "Olga"} -> null
name4 = 'Kevin'; //{name: "Kevin"} -> null

console.log(name4);


// ----- Hoisting поднятие ------

fooDeclaration(); //{fooDeclaration: Function, testVar666: undefined} -> null
let testVar; // {fooDeclaration: Function, testVar: undefined, testVar666: undefined} -> null
//var так же как и function declaration попадает в глобальный скоуп при первой инициализации кода
var testVar666; //{fooDeclaration: Function, testVar: undefined, testVar666: undefined} -> null
testVar666 = 5; //{fooDeclaration: Function, testVar: undefined, testVar666: 5} -> null
testVar = 'Hi';  //{fooDeclaration: Function, testVar: 'Hi', testVar666: 5} -> null

// fooExpressionArrow(); //нельзя вызвать так как это переменная с func expression,
// она появиться в ЛО, когда выполнение кода до нее дойдет

function fooDeclaration() {
    return 'This is func declaration'
} //как ток скрипт выполняется, declaration попадает в объект ЛО,
// поэтому можно вызвать ее до объявления


const fooExpressionArrow = () => {
    return 'This is arrow func expression'
} //функция записывается в переменную, в ЛО не попадет при запуске кода


const theFuncExpression = function () {
    return 'This is func expression'
} //функция записывается в переменную, в ЛО не попадет при запуске кода


//Example 5

let hello = 'hello :)' //{sayHello: Function, hello: 'hello :)'} -> null

function sayHello(name) {
    //{name: 'Vasya'} -> globalLe
    console.log(name + ', ' + hello); //hello нашел во внешнем скоупе по ссылке
} // послу вызова функции (на каждый вызов), внутри нее создается свой - ЛО с сылкой на внешний скоуп

sayHello('Vasya'); //{sayHello: Function, hello: 'hello :)'} -> null


//Example 6

let hellooo = 'Hello'; //{sayHellooo: Function, hellooo: 'Hello'} -> null

function sayHellooo(name) {
    //{name: 'Bill', fooo: Function} -> globalLe
    function fooo() {
        //{ } -> sayHelloooLe
        let age = 31; //{age: 31} -> sayHelloooLe
        console.log(`${hellooo}, I am ${name}, my age is ${age}!`) //{age: 31} -> sayHelloooLe
    }

    //после вызова внутри функции создасться свое ЛО
    fooo()
}

//после вызова внутри функции создасться свое ЛО
sayHellooo('Bill'); //{sayHellooo: Function, hellooo: 'Hello'} -> null


//Example 7

// Замыкание - способность функции запоминать ЛО где ее создали

//{makeCounter: Function} -> null
function makeCounter() {
    // [[Environment]] -> globalLe  ---- это скрытая переменная, ссылается на внешний ЛО, в котором тебя написали, типо функцию я написала внутри глобального скоупа, значит на него будем ссылаться
    //{ } -> outer = [[Environment]] (globalLe)
    let count = 0; //{count: 0} -> globalLe   ---мутируем объект

    return () => {
        // [[Environment]] -> makeCounterLe
        //{ } -> makeCounterLe   (этот ЛО создается новый на каждый вывод - копируется у [[Environment]]) (после первого вызова дропнеться)
        console.log(++count)
    }
}

let counter = makeCounter() //{makeCounter: Function, counter: Function} -> null   //{count: 2} <- [[Environment]] так как в памяти count останется сидеть

let counter2 = makeCounter() // разные ссылки на объект, на каждый вызов функции формируется новый ЛО, поэтому  //{count: 0} <- [[Environment2]]

counter() //{makeCounter: Function, counter: 1} -> null
counter() //{makeCounter: Function, counter: 2} -> null (2 так как мутиловали уже count)
counter2() //{makeCounter: Function, counter: 1} -> null
counter2() //{makeCounter: Function, counter: 2} -> null

//Example 8

//[[Env]]
let c = 0; // { decrease: Function, c: 3 } -> null

function decrease() {
    // { } -> globalLe
    return () => {
        // { } -> decreaseLe
        console.log('Now: ' + ++c)
    }
}

let callDecrease = decrease() // { decrease: Function, c: 3, callDecrease: Function } -> null

callDecrease() // { decrease: Function, c: 1, callDecrease: 1  } -> null
callDecrease() // { decrease: Function, c: 2, callDecrease: 2  } -> null
callDecrease() // { decrease: Function, c: 3, callDecrease: 3  } -> null

let callDecrease2 = decrease() // { decrease: Function, c: 4, callDecrease: Function } -> null

callDecrease2() // { decrease: Function, c: 4, callDecrease: 4 } -> null
callDecrease2() // { decrease: Function, c: 5, callDecrease: 5 } -> null
callDecrease2() // { decrease: Function, c: 6, callDecrease: 6 } -> null

//Example 9

// {decrease2: Function} -> null

function decrease2() {
    // {} -> globalLe
    return () => {
        // outer = [[Env]] -> decrease2Le
        let c = 0;  // {c: 0} -> decrease2Le
        console.log('Nowww: ' + ++c)
    }
}

let callDecreaseeee = decrease2() // {decrease2: Function, callDecreaseeee: Function} -> null

callDecreaseeee() // {decrease2: Function, callDecreaseeee: 1} -> null
callDecreaseeee() // {decrease2: Function, callDecreaseeee: 1} -> null
callDecreaseeee() // {decrease2: Function, callDecreaseeee: 1} -> null


let callDecreaseeee2 = decrease2() // {decrease2: Function, callDecreaseeee2: Function} -> null

callDecreaseeee2() // {decrease2: Function, callDecreaseeee: 1} -> null
callDecreaseeee2() // {decrease2: Function, callDecreaseeee: 1} -> null
callDecreaseeee2() // {decrease2: Function, callDecreaseeee: 1} -> null

//Example 10

function sum(n) {
    return (b) => {
        console.log(n + b)
    }
}

sum(1)(2)
sum(5)(1)

// Example 11
let z = 0

function fnTest() {
    let b = 0
    return function () {
        z++
        b++
        return {a: z, b: b}
    }
}

const f1 = fnTest()
const f2 = fnTest()
console.log(f1()); // 1 1
console.log(z++); // a = 1
console.log(f1()); //3 2
console.log(f2()); // 4 1
console.log(f2()); // 5 2
console.log(result = f2()) // 6 3
console.log(z++); // a=6
console.log(result.a, result.b)

// Example 12

// if (true) {
//     let l = 5; // в пределах блока/функции
// }
//
// if (true) {
//     var v = 15; //var пределами блока не ограничевается, но ограничеваеться функцией
// }
//
// console.log(v)
//
// function f() {
//     var fv = 232;
// }
//
// console.log(fv) // ограничеваеться функцией

// Example 12

// Стек — упорядоченная коллекция элементов, в которой добавление новых и удаление старых элементов всегда происходит с одного конца коллекции.

// Стек - это кусок ОП памяти где находятся вызовы функций
// Код начинаеться с вызова функции С и на стек кладеться вызов этой функции - это кадр (фрейм) стека
// там храняться локальные переменные и параметры этой функции
// на каждый вызов функции формируеться стек фрейм
// после выполнения горы функций мы доходим до верхушки стека и памяти не остаеться, то ОС просто этот убивает процесс так как ошибка стек оверфлоу
// так же на стек фрейме находиться адрес возврата, он равен адресу предыдущего стек фрейма
// как только функция закончила свыое выполнение она со стека удаляеться и код начинает выполняться с предыдущего стек фрейма
// lifo - last in first out (стопка тарелок)
// внутри процессора есть регистры, есть регистр ESP, там находиться адрес последнего стек фрейма

// рекурсия возведения в степень

const pow = (x, n) => {
    if (n === 1) {
        return x   //базовый случай (кейс), базовая ветка рекурсии и мы можем удалить стек фрейм из стека
    }
    return x * pow(x, n - 1) //шаг рекурсии
}

//Сумма чисел рекурсия
function sumTo(q) {
    if (q === 1) return 1;
    return q + sumTo(q - 1);
}

alert(sumTo(100));


//Решение с помощью цикла
function sumToLoop(t) {
    let sum = 0;
    for (let i = 1; i <= t; i++) {
        sum += i;
    }
    return sum;
}

alert(sumToLoop(100));


//Рекурсия факториал
function factorial(r) {
    return (r != 1) ? r * factorial(r - 1) : 1;
}

alert( factorial(5) ); // 120


//Фиббоначи рекурсия
function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}
alert( fib(3) ); // 2
alert( fib(7) ); // 13


//Оптимизированное Фиббоначи, запоминая уже вычисленные значения: например fib(3) вычислено однажды,
// затем мы просто переиспользуем это значение для последующих вычислений.
function fibOptimization(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}

alert( fibOptimization(3) ); // 2
alert( fibOptimization(7) ); // 13
alert( fibOptimization(77) ); // 5527939700884757


//Вывод односвязного списка (рекурсия)
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function printList(list) {

    alert(list.value); // выводим текущий элемент

    if (list.next) {
        printList(list.next); // делаем то же самое для остальной части списка
    }

}

printList(list);


//Вывод односвязного списка (c циклом)
function printListLoop(list) {
    let tmp = list;

    while (tmp) {
        alert(tmp.value);
        tmp = tmp.next;
    }

}

printListLoop(list);
