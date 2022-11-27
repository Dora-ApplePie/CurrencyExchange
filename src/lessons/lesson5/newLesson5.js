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
this.age = 23

const user = {
    name: 'Daria',
    age: 100,
    showAge: () => {
        console.log(this.age); //23, так как arrow и объект не создает скоуп
    }
}

user.showAge()
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
// // //Example 2
// const arrow = () => {
//     console.log(this) //будет window, так как у стрелочной функции нету this
// }
//
// arrow.call({name: "Arrow"})
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
// // Контекст нельзя перепривязать
// Example
// function fooBind() {
//     console.log(this)
// }
//
// fooBind
//     .bind({name: "Alex"})() //превяжеться только первый контекст
//     .bind({name: "Hanna"})()
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


// // ================= use-strict ======================
//
// 'use strict';
//
// function fooNoStrict() {
//     console.log(this) //5
// }
//
// fooNoStrict.call(5); //что передадим то и будет
//
//
// // ================= без use-strict ======================
//
// function fooStrict() {
//     console.log(this) //Number{5}
// }
//
// fooStrict.call(5); //примитивы будут как - объектное представление
//
//

// ================= ЗАДАЧКИ ======================

// // Task 1
// const a = {
//     name: "a",
//     logName(){
//         console.log(this.name);
//     }
// }
// setTimeout(a.logName, 100)
//
// //Ответ: undefined, так как мы не видим место вызова, а передаем как колбек
// //Исправление: setTimeout(a.logName.bind(a), 100)
//
// // Task 2
// const a2 = {
//     isMale: true,
//     age: 23,
//
//     getIsMale: () => {
//         return this.isMale
//     },
//
//     getAge: function () {
//         const age = 24
//         console.log(this.age);
//     }
// }
//
// console.log(
//     a2.getIsMale() //undefined, так как у стрелочной и у объекта нет this контекста
// )
//
// a2.getAge() //23, так как контекст вызова объект a2

// // Task 3
// const a3 = {
//     name: "a"
// }
//
// const b = {
//     name: "b",
//     getName: () => {
//         (() => {
//             console.log(this.name);
//         }).call(a3)
//     }
// }
//
// b.getName()
//
// //Ответ: undefined, так как call не работает для стрелочных, мы выпрыгнем наверх в глобал и там берем name у виндоу

// // Task 4
// const a4 = {
//     name: "a4"
// }
//
// const b4 = {
//     name: "b4",
//     getName() {
//         (() => {
//             console.log(this.name);
//         }).call(a4)
//     }
// }
//
// b4.getName()
//
// //Ответ: b4, так как this у стрелочной нет, а в методе есть и оно выпрыгнет выше
// // P.S если вместо стралочной сделать function declaration, то сработает привязка контекста, а вызов через метод объекта проигнорируеться

// //Task 5
// const a5 = {
//     age: 25
// }
//
// const b5 = {
//     age: 23,
//
//     hi: () => {
//         console.log(this.age);
//     },
//
//     hi2() {
//         (() => {
//             console.log(this.age);
//         }).call(a5)
//     }
// }
//
// b5.hi() //undefined
// b5.hi2.call(a5) //25

// //Task6
//
// const group = {
//     name: 'KMB-40',
//     users: ["Pasha", "Masha"],
//
//     showUsers() {
//         this.users.forEach(function (user) {
//             console.log(`${this.name}: ${user}`)  //коллбек
//         })
//     }
// }
//
// group.showUsers() //{undefined: "Pasha"}, {undefined: "Masha"} - так как this.name передали коллбеком а не вызывали
//
// //Правильный варик - правильная работа
// const group2 = {
//     name: 'KMB-40',
//     users: ["Pasha", "Masha"],
//
//     showUsers() {
//         this.users.forEach((user) => {
//             console.log(`${this.name}: ${user}`)
//         })
//     }
// }
//
// group2.showUsers() //сработает верно так как у стрелочной нету this и мы выпрыгнем выше и обратимся к предыдущему вызову контекста где группы

// //Правильный варик 2 - правильная работа
//
// const group3 = {
//     name: 'KMB-40',
//     users: ["Pasha", "Masha"],
//
//     showUsers() {
//         this.users.forEach((function (user) {
//             console.log(`${this.name}: ${user}`)
//         }).bind(this))
//     }
// }
//
// group3.showUsers()

// //Правильный варик 3 - правильная работа
//
// const group3 = {
//     name: 'KMB-40',
//     users: ["Pasha", "Masha"],
//
//     showUsers() {
//         this.users.forEach(function (user) {
//             console.log(`${this.name}: ${user}`)
//         }, this) //thisArgs аргумент в forEach
//     }
// }
//
// group3.showUsers()
