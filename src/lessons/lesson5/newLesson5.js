// //This - контекст вызова функции
//
// //!use strict - this ---> object {}
// //use strict - this --> can be anything
//
//
// //--------Agenda--------
//
// //1. this on global scope
//
// //2. this in arrow functions
//
// //3. this in function -> go to watch how function is called
//
// // - Вызвана через конструктор (new) -> новый объект
// // - Вызывана через методы функций: call, apply, bind -> первый аргумент
// // - С помощью вызова метода объекта -> то что стоит слева от точки
// // - Обычный вызов функции -> undefined (если !use strict -> window)
//
//
// // ================================ GLOBAL ================================
//
// //1. this в global scope -> это window | global (nodejs)
//
// console.log(this); //window
// console.log(this === window); //true
// this.age = 23
// console.log(window.age); //23
//
//
// // =============================== ARROW FUNC ============================
//
// //2. Arrow functions
//
// // this in arrow function -> нету своего this
// // Всегда ищем во внешнем скоупе не завист от вызова функций
// // this найдется либо в обычной функции, либо в глобальном скоупе
//
// //Example
// const foo = () => {
//     console.log(this); //window
//     this.age = 40
// }
//
// foo();
//
// //Example 1
//
// this.age = 23
//
// const user = {
//     name: 'Daria',
//     age: 100,
//     showAge: () => {
//         console.log(this.age); //23, так как arrow и объект не создает скоуп
//     }
// }
//
// user.showAge()
//
// // ----global scope create in global script, functions, code blocks (loops)---
//
// // //Example 2
// //
// // this.age = 22
// //
// // const user2 = {
// //     name: 'Polina',
// //     age: 101,
// //     show: () => {
// //         () => {
// //             () => {
// //                 () => {
// //                     console.log(this.age); //22, так как объект и стрелочная ф-ия не создают скоуп
// //                 }
// //             }
// //         }
// //
// //     }
// // }
// //
// // user2.show()
//
//
// // ================================ FUNCTIONS =================================
//
//
// // =========== CONSTRUCTORS ===========
// // - Вызываем через new this -> {}
//
// function User(name, age) {   //принято правило: название функции с большой буквы, если мы хотим вызвать функцию через конструктор
//     //this = {}
//
//     this.name = name
//     this.age = age
//
//     //return this   - неявно возращает
// }
//
// new User(); //хотим сделать объект, который являеться экземпляром этой функции
// const u = new User("Tanya", 45);
// console.log(u);
//
//
// function User2(name) {
//     this.name = name
// }
//
// console.log(
//     new (User2.bind({ name: "Custom name" }))("Alex") //будет только алекс, так как байнд игнориться
// )
//
// //Итого: если функция вызываеться через new, this внутри этой функции будет будет новый экземпляр объекта
//
// // ============= Вызываем через методы функций call, bind, apply =================
//
// //Example 1
// const nick = {
//     name: "Nick",
//     showName() {
//         console.log(this);
//     }
// }
//
// const yana = {
//     name: "Yana"
// }
//
// nick.showName()
//
// //привязка контекста
// //игнор nick - слева от точки, так как привязка приоритетнее вызова как метода объекта
// nick.showName.call(yana)
// nick.showName.apply(yana)
// nick.showName.bind(yana)()
//
//
// //Example 2
//
// function fooExample(a, b) {
//     console.log(a)
//     console.log(b)
//     console.log("THIS: ", this)
// }
//
// fooExample.call({name: "call"}, 1, 2) //сразу вызываем метод и this делает то что мы передаем
//
// fooExample.apply({name: "apply"}, [1, 2]) //сразу вызываем метод и this делает то что мы передаем, но аргументы передаем в массиве
//
// fooExample.bind({name: 'bind'}, 1, 2)() //создает функцию с привязанным объектом, и не сразу вызывает
// fooExample.bind({name: 'bind'}, 1)(2) //второй способ передачи аргументов
// fooExample.bind({name: 'bind'})(1, 2) //третий способ передачи аргументов
//
// //Example 3
//
// function mul(a, b) {
//     console.log(a * b)
// }
//
// const mulTwo = mul.bind(null, 2) //частичное применение с момощью метода функции bind
// mulTwo(5) //всегда будет умножать на двойку
//
// //Example 4 (bind)
//
// const jon = {
//     name: 'Jon',
//     showName() {
//         console.log(this.name)
//     }
// }
//
// function showJonName(showName) {
//     showName()
// }
//
// showJonName(jon.showName.bind(jon))
//
//
// // ================= С помощью вызова метода объекта ======================
//
// const alex = {
//     name: 'Alex',
//     showName() {
//         console.log(this.name)
//     }
// }
//
// alex.showName() //Alex
// const showNameFoo = alex.showName
// showNameFoo() //window и в консоле пустая строка
//
//
// const hanna = {
//     name: 'Hanna',
//     showName: alex.showName
// }
//
// hanna.showName() //Hanna
//
//
// // ================= Обычный вызов функции ======================
//
// function fooFunc() {
//     console.log(this) //undefined (use-strict) -> window (!use-strict)
// }
//
// fooFunc();


// ================= use-strict ======================

'use strict';

function fooStrict() {
  console.log(this.name)
}

fooStrict()
