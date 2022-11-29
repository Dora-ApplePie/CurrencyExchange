console.log("lesson 14");
//
// //Тема - class
//
//
// //конструкторы нужны для создания схожих инстансов (похожие друг на друга объекты)
// //предоставляют прототипное наследование
//
// function Car(model) {
//     this.model = model //this внутри конструктора новый объект
//
//     //если в return примитив (6, "hi") возращаеться - все равно вернеться this
//     //но если в return возращен объект/массив/функция, то this возращаться не будет
//     //но вообще в конструкторе ретурна нету
// }
//
// Car.prototype.showModel = function () {
//     console.log(this.model);
// }
//
//
// //Car.prototype = {constructor: Car}
//
// const car = new Car("1") //{model: "1"}.__proto__ ---> {constructor: Car} <--- Car.prototype
// const model2 = new Car("2") //{model2: "1"}.__proto__ ---> {constructor: Car} <--- Car.prototype
//
// car.showModel()
//
//
// //-----ТОЖЕ САМОЕ НА КЛАССАХ----
//
// class Car2 {
//
//     constructor(model) {
//         this.model = model
//     }
//
//     showModel() {
//         console.log(this.model);
//     }
//
//     name = "CAR" //поместиться в экземпляр
// }
//
// const carX = new Car2("model X")
// console.log(carX);
//
// //class - синтаксический сахар - это когда есть специальный синтаксис и он внутри превращаеться в привычный языковой синтаксис
//
// //==============Отличия между class и функциями конструкторами=================
// // 1. !!! без new конструктор не вызывается
// // 2. [[isClassConstructor]] - помечающее свойство класса и движок понимает что это класс
// // 3. Строковое представление у класса
// // 4. методы класса не enumerable
// // 5. !!! use-strict по умолчанию в классе
//
// //классы добавили в код потому что так принято в других языка, джс позволяет писать как в функц стиле так и в ооп парадигме
// //классы помогают абстрагировать прототипную магию
//
//
// //============== Статические методы и свойства =================
//
// class Car3 {
//
//     static WHEELS = 5 //поместиться в сам Car3 и инстансы не смогут вызвать, так как это не в прототипе класса будет
//
//     static showModel() {
//         console.log(this.WHEELS); //поместиться в сам Car3
//     }
// }
//
// const car3 = new Car3()
// console.dir(car3)
//
// // Статические методы мы можем вызывать только от имени самого конструктора
// // car.WHEELS and car.showModel --->  не будет работать так как это статическое свойство самого класса а не его прототипа
// // static используеться для утилитл или для ограничения имени пользователь например
//
//
// //============== Приватные поля =================
//
// // приватные поля нужны для инкапсуляции
//
// class Car4 {
//
//     #WHEELS = 5 //приватное поле, будет доступно для использования только внутри класса
//
//     getWheels() {
//         console.log(this.#WHEELS);
//     }
// }
//
// const car4 = new Car4();
//
// // console.log(car4.#wheels); //не сработает так как приватное поле
// car4.getWheels() //сработает так как мы определили паблик метод для приватного поля
//
//
// //---пример инкапсуляции---
//
// class User {
//
//     //мы не можем получить доступ к этим значениям и как-то их перезаписать, только увидеть что они есть в консоли
//     #firstName;
//     #lastName;
//
//     constructor(first, last) {
//         this.#firstName = first
//         this.#lastName = last
//     }
//
//     getFullName() {
//         return this.#firstName + ' ' + this.#lastName
//     }
// }
//
// const dasha = new User("Daria", "Golenko")
// dasha.getFullName();
//
//
// //============== методы get, set =================
//
// class User2 {
//     #name = "Polina"
//
//     get name() {
//         return this.#name
//     }
//
//     set name(value) {
//         return this.#name = value
//     }
// }
//
// const user2 = new User2()
//
// console.log(user2.name);
// user2.name = "Anna"
// console.log(user2.name);
//
//
// //============== наследование =================
//
// //способ через конструкторы
// function CarZ(model) {}
//
// CarZ.DOORS = 4
//
// CarZ.prototype.showModel = function () {
//     console.log(this.model)
// }
//
// const carZ = new CarZ()
//
// function Ford(model) {
//     this.model = model
// }
//
// Ford.prototype.showModel = function () {
//     console.log("From ford")
//     console.log(this.model)
// }
//
// Ford.prototype.__proto__ = CarZ.prototype //наследуем метод
// Ford.__proto__ = CarZ //наследуем двери
//
// console.log(Ford.DOORS)
//
// const ford = new Ford("Mondeo")
//
// ford.showModel()
//
//
// //----РЕФАКТОРИМ НА КЛАССЫ----
//
// class CarL {
//     static WINDOWS = 5
//
//     showWindows() {
//         return CarL.WINDOWS
//     }
// }
//
// class Audi extends CarL{
//
// }
//
// const r8 = new Audi()
//
// //что делает extends? ---> связывает прототипы
// console.log(Audi.WINDOWS) // так как делаеться вот такая связь ---> Audi.__proto__ = CarL
// console.log(r8.showWindows()) // Audi.prototype.__proto__ = CarL.prototype


//======== SUPER =======

//ex1
class CarE {
    name = "Kevin"
    constructor(model, age) {
        this.model = model
        this.age = age
    }
}

class Bmw extends CarE{
    name = "John" //перезапишеться своим
    constructor(model, age, onlyForFord) {
        super(model, age) //вызывает родительский конструктор и this

        this.onlyForFord = onlyForFord
    }
}

const e = new Bmw("E700", 3, 320)
console.log(e);


//ex2
class Animal {
    someMethod() {
        console.log("Parrot")
    }
}

class Parrot extends Animal {

    myMethod() {
        super.someMethod() //можем подняться только на 1 этаж вверх
    }
}

new Parrot().myMethod()
