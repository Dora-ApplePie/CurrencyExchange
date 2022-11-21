// EventLoop - цикл механизм который позволяет риализовывать работу сихронного кода

// клиентский JS - однопоточный
// сам JS и Node JS - многопоточный так как выполняеться c помощью V8 движка/либы

// Когда мы включаем поток в нашу программу это значит что мы добавляем еще один стек вызовов
// Остаеться одинаковый код, ресуры - например куча с объектами и масивами, одинаковый скомпилированный код
// Отсюда возникает проблема - гонка данных (data race), так как потоки пользуються одними и теми же данными и кодом
// Но все же у них разные стеки и они выделяються для каждого потока
// Поток - это абстракция операционной системы которая заводиться в рамках процесса - thread (тоже абстракция имеющая свой айди)

//В моменте рендера - Рендер очередь приоритетней если стек пустой

//------Блокировка EventLoop---------

// const btn = document.querySelector('#white')
//
// btn.addEventListener('click', whiteLoop)
//
// function whiteLoop() {
//     while (true) {
//         console.log('Hello') //стек заполниться и ренде заблокируеться, так каак рендер срабатывает при пустом стеке
//     }
// }
//
// //--------через макрозадачи блокировки не будет--------
// //так как стек очищаеться
// //евентлуп сюда-туда бегать и выполнять, то рендер то очередь макрозадач
//
// function timersLoop() {
//     setTimeout(() => {
//         timersLoop()  //не рекурсия так как код ассинхронный и функция будет ложиться на стек - выполняться а затем удаляться и там каждую 1 ms
//     }, 1)
// }
//
// //------как доказать что очередь микрозадач приоритетнее всех
//
// function promisesLoop() {
//     Promise.resolve().then(() => {  //этот коллбек попадает в очередь микрозадач после того когда резолвиться/редж промис на который он подписан
//         console.log('Hi from micro tasks')
//         promisesLoop()
//     })
// }


// //Пример 1
//
// setTimeout(function timeout() {
//     console.log(1);
// }, 4000)
//
// setTimeout(function timeout() {
//     console.log(2);
// }, 1000)
//
// setTimeout(() => {
//     console.log(3);
// }, 1)
//
// new Promise((resolve) => {
//     console.log(4); //синхронные операции
//     resolve();
//     console.log(5);
// }).then(() => {
//     console.log(6); //пока что в очереди микротасок
// })
//
// console.log(7);
//
// //4576321


// //Пример 2
//
// console.log(1)
// setTimeout(function timeout() {
//     console.log(2);
// }, 2);
//
// let p = new Promise(function (resolve) {
//     console.log(3);
//     resolve();
// })
//
// p.then(function () {
//     console.log(4);
// });
//
// console.log(5);
//
// //13542


// //Пример 3
//
// setTimeout(function () {
//     console.log(1);
// }, 1)
//
// setTimeout(function () {
//     console.log(2);
// }, 1000)
//
// new Promise(function (resolve) {
//     console.log(3);
//     resolve();
//     console.log(4);
// }).then(function () {
//     console.log(5);
// });
//
// console.log(6);
//
// async function test1() {
//     console.log(7);
//     await test2()
//     console.log(8);
//     console.log(9);
// }
//
// async function test2() {
//     console.log(10);
// }
//
// test1();
//
// console.log(11);
//
// //3-4-6-7-10-11-5-8-9-1-2


// //Пример 4
//
// console.log(1);
//
// setTimeout(() => {
//     console.log(2);
// }, 1000);
//
// Promise.resolve().then(() => {
//     console.log(3);
// })
//
// Promise.resolve()
//     .then(() => setTimeout(() => { //промис зарезолвиться после того как сетТаймаут попадает в вебапи
//         console.log(4);
//     }, 4000))
//     .then(() => console.log(5))
//
// Promise.resolve().then(() => {
//     console.log(6);
// });
//
// Promise.resolve().then(() => {
//     console.log(7);
// });
//
// setTimeout(() => console.log(8), 2000);
//
// console.log(9);
//
// //1-9-3-6-7-5-2-8-4


// //Пример 5
//
// console.log(1);
//
// setTimeout(() => {
//     console.log(2);
//     Promise.resolve()
//         .then(() => {
//             console.log(3);
//         })
// }, 2000);
//
// new Promise((resolve) => {
//     console.log(4);
//     resolve(5);
// }).then((data) => {
//     console.log(data);
//
//     Promise.resolve()
//         .then(() => {
//             console.log(6);
//         })
//         .then((data) => {
//             console.log(7);
//
//             setTimeout(() => {
//                 console.log(8);
//             }, 1000);
//         });
// })
//
// setTimeout(() => {
//     console.log(9);
// }, 2000)
//
// console.log(10);
//
// //1-4-10-5-6-7-8-2-3-9


// //Пример 6
//
// Promise.resolve()
//     .then(() => console.log(1))
//     .then(() => console.log(2))
//     .then(() => console.log(3))
//     .then(() => console.log(4))
//
// Promise.resolve()
//     .then(() => console.log(5))
//     .then(() => console.log(6))
//     .then(() => console.log(7))
//     .then(() => console.log(8))
//
// //1-5-2-6-3-7-4-8


// //Пример 7
//
// Promise.resolve()
//     .then(() => {
//         return new Promise((res) => {
//            res(5)
//         })
//     })
//     .then(res => {
//         console.log(res)
//     })
