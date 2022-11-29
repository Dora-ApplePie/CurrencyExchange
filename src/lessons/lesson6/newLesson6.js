// console.log("lesson 13");

// Тема - Prototype

//прототип - объект на который у другого объекта есть скрытая ссылка [[PROTOTYPE]]
//для обращения к этой скрытой ссылке используеться специальное свойство __proto__

//========= Часть 1 ==========

// //ex 1
// const a = {
//     inner: {
//
//     }
// }
//
// const b = a.inner
//
// //две ссылки на иннер - a.inner и b
//
// //ex 2
// const a2 = {
//     inner: {
//
//     }
// }
//
// const b2 = {
//     inner: a.inner
// }
//
// //две ссылки  на иннер - a2.inner и b2.inner
//
// a2.inner === b2.inner //так как один и тот же объект


// //ex 3
// const alex = {
//     name: "Alex",
//     age: 100,
//
//     showName() {
//         console.log(this.name);
//     }
// }
//
// const hanna = {
//     name: "Hanna"
//     //"[[PROTOTYPE]]:alex"
// }
//
// alex.showName.call(hanna) //Hanna
//
// //способ 2 - наследование методов объекта через __proto__
// hanna.__proto__ = alex
// hanna.showName()


// //ex 4
// const user = {
//     showName() {
//         console.log(this.name);
//     }
// }
//
// const hanna = {
//     name: "Hanna"
// }
//
// const alex = {
//     name: "Alex"
// }
//
//
// hanna.__proto__ = user
// alex.__proto__ = user
//
// hanna.showName()
// alex.showName()

// //ex 5 - цепочка прототипов
//
// const baseUser = {
//     baseName: 'Base'
// }
//
// const user = {
//     showName() {
//         console.log(this.name);
//     }
// }
//
// const superUser = {
//     name: "superUser",
//     isSuper: true
// }
//
// const hanna = {
//     name: "Hanna"
// }
//
// //hanna.__proto__ -> superUser.__proto__ -> user.__proto__ -> baseUser.__proto__ -> null
// user.__proto__ = baseUser
// superUser.__proto__ = user
// hanna.__proto__ = superUser
// baseUser.__proto__ = null
//
// //прототип - объект на который у другого объекта есть скрытая ссылка [[PROTOTYPE]]


// //-----Функции конструкторы-----
// //Нужны что бы мы могли наследоваться и создавать объекты схожие друг с другом
//
// function User(name) {
//     //const this = {}     //типо создаеться пустой объект
//     this.name = name //записываем в объект то что передали
//     //return this    //и по умолчанию возвращаем этот объект
// }
//
// const alex = new User("Alex"); //вызов через new создаст объект {name: "Alex"}
// console.log(alex);

// //ex6
//
// // у них есть св-во в прототипе конструктор которое равно самому же себе, своей же функции
// // у стрелочных нету prototype
//
// function User(name) {
//
// }
//
// function Animal(name) {
//
// }
//
// //у функции animal есть 2 ссылки: сама animal и animal.prototype.constructor
// const animal = {
//     prototype: {
//         constructor: animal
//     }
// }

// //========== Часть 2 ==========
// // У всех функций (кроме стрелочных), по дефолту есть специальное свойство prototype - которое являеться объектом
// // внутри этого объекта prototype, есть свойство constructor которое ссылаеться на эту же функцию
//
//
// //ex7 - присваиваем метод для всех
// const userCreator = (name) => {
//
//     const userPrototype = {
//         showName() {
//             console.log(this.name)
//         }
//     }
//
//     const newUser = {}
//
//     newUser.__proto__ = userPrototype
//
//     newUser.name = name
//
//     return newUser
// } //похоже на конструктор
//
// const alex = userCreator("Alex")
// const hanna = userCreator("Hanna")
// const john = userCreator("John")
//
//
// alex.showName()
// hanna.showName()
// john.showName()
//
// //---РЕФАКТОРИМ---
//
// function User(name ) {
//
//     //User.prototype -> {constructor: User}
//     //this.__proto__ === User.prototype
//
//     //const this = {}
//     this.name = name
//     //return this
//
// }
//
// const alex2 = new User("Alex") //alex.proto === User.prototype, так как
// //alex.__proto__ ----->{constructor: User} <------ User.prototype
//
// const hanna2 = new User("Hanna") //экземпляр
// const john2 = new User("John") //экземпляр
//
// console.log(alex2);
// console.log(hanna2);
// console.log(john2);

// //ex8 - самый важный смысл конструкторов
//
// // const User = {
// //
// //     //на него 3 ссылки: User.prototype, alex.__proto, hanna.proto
// //     prototype: {
// //         constructor: User,
// //         showName(){
// //             console.log(this.name)
// //         }
// //     }
// // }
//
//
// function User(name ) {
//     this.name = name
// }
//
// const alex = new User("Alex")
// const hanna = new User("Hanna")
// //тоже самое
// const john = new hanna.constructor("Hanna") // hanna.constructor пойдет в прото и там оно ссылаеться на --> User
//
// // При вызове через конструктор new создаються экземпляры объектов,
// // прото которых будет ссылаться на прототайп функции с помощью которой они были созданы
//
// //инстансы
// const alex2 = {
//     name: "Alex",
//     //[[Prototype]]: User.prototype
// }
//
// const hanna2 = {
//     name: "Hanna",
//     //[[Prototype]]: User.prototype
// }
//
// //ВЫВОД: смысл конструктора заключаеться в том, что присутствует специальное скрытое свойство которое являеться объектом
// // и этот объект будет являться прототипом для всех инстансов этого конструктора.
//
// // благодаря этому код не дублируеться, как если бы мы просто внутри функции юзер создали объект, на кааждый вызов создавался бы какой-то метод
// // а так у нас просто 1 метод например, который храниться в прототипе конструктора и новые объекты могут заасайниться к нему


//x.__proto__ ---> xConstructor.prototype

//прототип это:
//1. так можно обозвать любой объект на который у каких-то других есть скрытая ссылка прототайп
//2. [[PROTOTYPE]] --> казывает на какой-то прототип {}
//3. у всех функций и функций конструктора есть свойство prototype: functionX.prototype -> {constructor: functionX}
//4. когда мы создем экземпляры то везде [[PROTOTYPE]] будет указывать на functionX.prototype этот объект

//--определение--
//протип - это св-во функции конструктора (Function/Array.prototype), к методам и свойствам которого у всех экземпляров этого конструктора есть доступ по ссылке прото


//еще раз!!!

//1. свойсво конструктора (Function/Array.prototype)
//const f = new Function()
//f.__proto__ === Function.prototype


//2. скрытое свойство объекта (так можно обозвать любой объект на который у каких-то других есть скрытая ссылка прототайп)
//3. в целом какой объект мы можем прототипом назвать (у всех функций и функций конструктора есть свойство prototype: functionX.prototype -> {constructor: functionX})
