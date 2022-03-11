console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0

//Структуры данных создающие область видимости: функция, класс, loops, try/catch/finally, switch, anonymous block code
// Лексическое окружение (ЛО) создается при запуске функции, это объект

// //Example1 - у ЛО всегда есть ключ отвечающий за внешнюю область видимости, этот ключ равен null
// let globalScope = {
//     outerScope: null
// }
//
// //Ex2
//
// {
//     let a = 10;
// } // a не будет доступна на 36 строчке так как она в блоке
//
// //Ex3
// {
//     let a = 10;
//     if (true) {
//         a++
//     }
// } // a доступна во всю глубину блока, не более
//
// //Ex4
// {
//     let a = 10;
//     if (true) {
//         var b = 50;
//     }
//    // b будет доступна здесь
// }
// console.log(b)
// // И b будет доступна здесь!!
// // Так как var функциональная и на его пути всплытия нет функции
// //Соответсвенно var поднимется в глобальную область

// //Ex5
// {
//     let a = 10;
//     if (true) {
//         //@ts-ignore
//         function func(){
//             var b = 50;
//             console.log(b)
//         }
//     }
//     console.log(b)
//     // b не будет доступна здесь, так как на его пути всплытия - функция
// }

//Ex6
// {
//     let a = 10;
//     if (true) {
//         var b = "50";
//
//         //@ts-ignore
//         function func() {
//             let c = 9; // для let func это блок
//             var x = 90; // а для var func это функция
//
//             function inner() {
//                 return c + x //здесь они видны так как происходит погружение
//             }
//         }
//
//         console.log(c)
//         console.log(x)
//         inner()
//         // c не будет доступна здесь так как она доступна в глубину блока
//         // x не будет доступна здесь, так как она в функц область видимости
//         // inner не доступна здесть, так как она в функц обл видимости,
//         // она поднимется на верх функции func и ток там ее можно вызывать
//     }
// }
//
//EXAMPLE 7
// let globalScope = {
//     outerScope: null,
//     c: 50, //после второго пробега у вар движок определил значение: undefined --> 50
//     f: 'Function',
//     a: 10,
// //При запуске скрипта, движок пробегается по коду и собирает
// //все var and func declaration
// //и разносит их в соответствующие области видимости
// //Далее движок забегает внутрь функции и создает свой объект лексического окружения
// //В него передаются некоторые постоянные параметры
// //Они храняться в отдельном объекте которые постоянно копируются во вновь созданный объект ЛО
// }
//
// let a = 10;
// var c = 50;
//
// function f() {
//     let fScope = { //объект ЛО
//         outerScope: globalScope //ссылка на глобальный объект ЛО так как f() создана в глобальном окружении
//     };
//     console.log(a) //из ЛО получается 10
//     console.log(d) //d ошибка - не определено
// }
// f();

// //EXAMPLE 8
// //Только для не строгого режима, модульная система всегда работает в строгом режиме, а реакт апп работает в мод реж.
// let globalScope = {
//     outerScope: null,
//     f: 'Function',
//     a: 10,
//     d: 50, //автоматическое создание переменной при инициализации
//
//
// //При запуске скрипта, движок пробегается по коду и собирает
// //все var and func declaration
// //и разносит их в соответствующие области видимости
// //Далее движок забегает внутрь функции и создает свой объект лексического окружения
// //В него передаются некоторые постоянные параметры
// //Они храняться в отдельном объекте которые постоянно копируются во вновь созданный объект ЛО
// }
//
// let a = 10;
// function f() {
//     let fScope = { //объект ЛО
//         outerScope: globalScope //ссылка на глобальный объект ЛО так как f() создана в глобальном окружении
//     };
//     console.log(a) //из ЛО получается 10
//     d = 50; //При инициализации, происходит поиск переменной и если не находит то на глобальном уровне происходит авт создание переменной
//     //для чтения или вызова ничего не срабатывает
// }
// f();

// //EXAMPLE 9
// //Только для не строгого режима, модульная система всегда работает в строгом режиме, а реакт апп работает в мод реж.
// let globalScope = {
//     outerScope: null,
//     f: 'Function',
//     a: 10,
//     d: 50
// }
//
// let a = 10;
//
// function f() {
//     let fScope = {
//         outerScope: globalScope
//     };
//
//     d = 50; //в не строгом режиме в браузере, мы автоматом поднимемся на глоб уровень и созд d со знач 50 доступное везде
// }
// f();
// console.log(d) //доступное везде

// //EXAMPLE 10
//
// let globalScope = {
//     outerScope: null,
//     f: 'Function',
//     a: 10,
//     d: 50, // undefined --> 100 --> 50
// }
//
// let a = 10;
// function f() {
//     let fScope = {
//         outerScope: globalScope
//     };
//     console.log(a)
//     d = 100;
// }
//
// f();
// var d = 50; // на вар не смотрим так как при первом пробеге он уже инициализировал переменную
// console.log(d);

// //EXAMPLE 11
//
// let globalScope = {
//     outerScope: null,
//     f: 'Function',
//     a: 10, //undefined --> 10 --> 110
// }
//
// let a = 10;
//
// function f() {
//     let fScope = {
//         outerScope: globalScope,
//         d: 50, //undefined --> 50 --> 100
//         inner: 'Function',
//     };
//     console.log(a);
//     var d = 50;
//
//     function inner() {
//         let innerScope = {
//             outerScope: fScope,
//         };
//         d *= 2
//         a += d
//     }
//
//     inner();
// }
//
// f();
//
// console.log(a);

// //EXAMPLE 12
//
// let globalScope = {
//     outerScope: null,
//     f: 'Function',
//     a: 10,
// }
//
// let a = 10; //в глобальной области
//
// function f() { //функциональная
//     let fScope = {
//         outerScope: globalScope,
//         //инициализация проходит в данном ЛО так как мы находимся в функциональной области видимости
//         d: 50,//undefined --> 50 --> 100
//         inner: 'Function',
//         a: 100, // 0 --> 100
//     };
//     let a = 0;
//     console.log(a);
//     var d = 50;
//
//     function inner() {
//         let innerScope = {
//             outerScope: fScope,
//         };
//         d *= 2
//         a += d
//     }
//
//     inner();
// }
//
// f();
//
// console.log(a); //будет 10, а не 100, так как лексическое окружение берется глобальное, а не функц иннер ссылающееся на фскоуп

//EXAMPLE 13
//
// let globalScope = {
//     outerScope: null,
//     f: 'Function',
//     innerFunc: 'linkFunc'
// }
//
// function f(param: any) { //функциональная
//     let fScope = {
//         outerScope: globalScope,
//         param: 8, //undefined --> 2 --> 4 --> 8
//         inner: 'Function',
//     }; //этот объект по окнчанию отработки функции не удалится так как innerScope ссылается на него
//
//     let fScope2 = {
//         outerScope: globalScope,
//         param: 10, //undefined --> 10 --> 20
//         inner: 'Function',
//     }; //новый объект ЛО для innerFunc2
//
// //мы из области видимости можем идти только вверх до первого совпадения
//     function inner() {
//         let innerScope = {
//             outerScope: fScope,
//         }
//         let innerSecondScope = {
//             outerScope: fScope2,
//         }
//
//         param *= 2; // ПОЛУЧАЕМ ИЗ ЗАМЫКАНИЯ, оно дает нам инкапсуляцию
//         return param;
//
//     }
//     return inner;
// }
//
//
// //Эти объекты живут независимо друг от друга
// let innerFunc = f(2);
// console.log(innerFunc()); //4
// console.log(innerFunc()); //8 так как в ЛО осталась 4 потому что остался мусор и нужен его сборщик
// console.log(innerFunc()); // 16
// let innerFunc2 = f(10);
// console.log(innerFunc2()); //20, сработает заново, так как мы создаем новую ссылку в памяти, а значит и новый объект объект ЛО
// console.log(innerFunc2()); //40
// console.log(innerFunc2()); //80
// console.log(innerFunc()); // 32
//
// //@ts-ignore
// innerFunc = null; // перезатрет объект
// innerFunc = f(2); //создаст новый
// console.log(innerFunc()); // 4


//РЕКУРСИЯ -- способность функции вызывать саму себя в процессе ее работы
//т е она от своего же имени обращается к себе вызывается другой процесс функции
//1. У рекурсии должна быть точка выхода
//2. И вызов функции с отличными стартовыми элементами, что бы не получить бесконечность
//Чаще всего рекурсия решает проблему обход деревьев(в глубину, в ширину(через цикл фор проще))
//Так же использвуется для выделения слов в гугл таблице для обновляем парсинг через вызов иннерhtml
//Глубокое копирование объекта и др.

//Задача 1
// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
//     ...
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

//решение через цикл фор
// function sumTo(arg: number) {
//     let result: number = 0;
//     for (let i = 0; i <= arg; i++) {
//         result += i;
//     }
//     return result;
// }
// console.log(sumTo(100)); //5050

//РЕКУРСИЯ нужны для более легкого понимания кода другим разработчикам, хоть она и медленнее цикла

//решение как рекурсия
// function sumTo(arg: number): number {
//     if (arg === 1) return arg
//     return arg + sumTo(arg - 1)
// }
// console.log(sumTo(3)); //6


//решение как хвостовая рекурсия, так как у обычной рекурсии существует ограничение 10 с чем то тыщ расчетов
//но ограничение все равно будут так как из браузеров удалили возможность ее использования
// function sumTo(arg: number, acc: number): number {
//     if (arg === 1) return arg + acc
// return sumTo(arg - 1, acc + arg)
// }
// console.log(sumTo(3, 0)); //6


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9
//
//Решение
//
// function simpleSum(x: number) {
//     if (x <= 0) return (num: number) => num ;
//
//     let _el: number[] = [x];
//
//     function helper2(...el: number[]) {
//         _el = [..._el, ...el];
//         return _el.reduce((acc, num) => acc + num);
//     }
//
//     return helper2;
// }
//
// //@ts-ignore
// console.log(simpleSum(3)(2))
// console.log(simpleSum(3)(6))
// console.log(simpleSum(1)(0))
// console.log(simpleSum(0)(134))

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3
//
//Решение
//
// function makeCounter() {
//     let x = 0;
//
//     function inner() {
//         x += 1
//         return x;
//     }
//
//     return inner;
// }
//
// const counter = makeCounter();
// console.log(counter()); //1
// console.log(counter()); //2
// const counter2 = makeCounter();
// console.log(counter2()); //1
// console.log(counter()); //3

//
// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;
//
//Решение
//
// function makeCounterPro(currentCount: number) {
//     let counter = {
//         increase: function () {
//            return currentCount + 1;
//         },
//         decrease: function () {
//             return currentCount - 1;
//         },
//         reset: function () {
//             return currentCount = 0;
//         },
//         set: function (value: number) {
//             return currentCount = value;
//         },
//     }
//     return counter;
// }
//
// let counterFunc = makeCounterPro(10);
//
// console.log(counterFunc.increase()); // 11
// console.log(counterFunc.decrease()); // 9
// console.log(counterFunc.reset()); // 0
// console.log(counterFunc.set(100500)); // 100
//
// let counterFunc2 = makeCounterPro(667);
// console.log(counterFunc2.decrease()); // 666

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10
//
//Решение
//
// function superSum(n: number) {
//     if (n <= 0) return 0;
//     if (n <= 1) return (num: number) => num;
//
//     let _args: number[] = [];
//
//     function helper(...args: number[]) { //рекурсия
//         _args = [..._args, ...args]; //старые плюс новые через рест оператор
//         if (_args.length >= n) { //проверка а достаточно ли нам элементов для подсчета???
//             _args.length = n; //обрезка массива
//             return _args.reduce((acc, num) => acc + num); //  подсчет суммы
//         } else {
//             return helper;
//         }
//     }
//
//     return helper;
// }
//
// let arr = [10, 20];
// arr.length = 10; //добавятся empty элементы, методы перебирающие массив будет пропускать эмпти, а метод филл заполняет эмпти.
// //в дырявые элементы мы сможем обратится через цикл фор, то есть по прямому индексу.
//
// //@ts-ignore
// console.log(superSum(3)(2)(5)(3))
// //@ts-ignore
// console.log(superSum(5)(2, 5, 3, 4, 1))
// //@ts-ignore
// console.log(superSum(3)(2, 5)(3, 9))

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину!!!
//
//Решение
//
// const arr = [1, 2, [3, 4, [5, 6]]];
//
// function flatDeep(arr: any, d = 1) {
//     return d > 0
//         ? arr.reduce((acc: string, val: number) => acc.concat(Array.isArray(val) //мы проверяем является ли полученное массивом
//             ? flatDeep(val, d - 1)
//             : val), [])
//         : arr.slice();
// };
//
// console.log(flatDeep(arr, Infinity)); // [1, 2, 3, 4, 5, 6]


// //Task 07 Разворачивание массива массивов
// //
// //Решение
// //
// const arr2 = [[1, 2], [3, 4], [], [5, 6]].reduce((a, b) => a.concat(b));
// console.log(arr2)
//
// //Task 08 Выравнивание двумерного массива с сортировкой
// //
// //Решение
// //
// const arr3 = [[1, 2], [3, 4], [], [5, 6]]
//     .reduce((result, current) => [...result, ...current], []).sort((a, b) => a - b)
// console.log(arr3)


// just a plug
export default () => {
};