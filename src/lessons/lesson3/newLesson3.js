// //пример ассинхронного кода - браузерное апи
// //тамер async так как колбек выполниться только через 5 секунд
// setTimeout(() => {
//     console.log('hi')
// }, 5000)
//
// document.addEventListener('click', () => {
//
// }) //асинхронщина по собфтию клик
//
//
// //клиент-серверная архитектура, это когда сервер на реквесты клиента отвечает респонсами
//
//
// //-------Promise - это объект-------
//
// const alex = {
//     getFile() {
//         return new Promise((res, rej) => {  //параметры
//             setTimeout(() => {
//                 res("Some data")
//                 // rej("Some error") //либо ресолв либо реджект
//             }, 2000)
//
//             //могут быть в промисах
//             //http request
//             //read file
//             //tcp socket
//         })
//     }
// }
//
// // const promise = {
// //     state: "pending", // 'fulfilled' || 'rejected'
// //     result: undefined
// // } //пример что внутри
//
// alex.getFile() //typeof - object
//     .then((res) => {
//         console.log(res);
//     })
//     .finally(() => {
//         console.log("That's all")
//     });
//
//
// alex.getFile()
//     .catch((err) => {
//         console.log("Error: ", err);
//         //если тут нет ошибки мы в error2 не попадем, а сразу в than
//
//     })
//     .catch((res) => {
//         console.log("Error2: ", res)
//         return 25
//     })
//     .then((res) => {
//         console.log("than: ", res);
//     })
//
// // alex.getFile()
// //     .then((res) => {
// //         console.log("than1");
// //         console.log(a);
// //     })
// //     .catch((err) => {
// //         console.log("Error1");
// //     })
// //     .then((res) => {
// //         console.log("than2");
// //         console.log(a);
// //     })
// //     .catch((err) => {
// //         console.log("Error1");
// //     })
// //     .then((res) => {
// //         console.log("than3");
// //         return 2
// //     }) //попадем во все консоли так как отлавливаем ошибку и создаем новый промис в then
//
// alex.getFile()
//     .finally(() => {
//         console.log("Finally"); //увидим по любому
//     })
//     .then((res) => {
//         console.log("than"); //увидим если ресолв у промиса getFile
//     })
//     .catch((res) => {
//         console.log("Error") ////увидим если реджект у промиса getFile
//     });
// // то есть finally не влияет никак на рес редж и они пробрасываются дальше по цепи в зависимости от состояния промиса
//
//
// //ПРИМЕР 5
// const pr = alex.getFile()
//
// pr.then((res) => {
//     console.log("then", res);
// })
//
// pr.then((res) => {
//     console.log("then", res);
// })
//
// pr.then((res) => {
//     console.log("then", res);
// })
// //ЭТО НЕ ЦЕПОЧКА ПРОМИСОВ - МЫ ПРОСТО ПОДПИСАЛИСЬ НА ОДИН И ТОТ ЖЕ ПРОМИС
//
//
// //async
//
// const foo = async () => {
//     return 55
// }
//
// //тоже самое что и
//
// const foo2 = () => {
//     return new Promise((res) => {
//         res(55);
//     })
// }
//
//
// foo().then(res => {
//     console.log(res);
// })
//
// foo2().then(res => {
//     console.log(res);
// })
//
//
// //example 2
//
// const foo3 = async () => {
//     try {
//         const users = await fetch("https://vk.com/users")
//     } catch (e) {
//         console.log('error', e)
//     }
//
// }
//
// //тоже самое что и
//
// const foo4 = () => {
//     return fetch("https://vk.com/users")
//         .then(users => {
//             console.log(users)
//         })
//         .catch(e => {
//             console.log(e)
//         })
// }
//
//
// // массив для сортировки
// let list = ['Дельта', 'альфа', 'ЧАРЛИ', 'браво'];
//
// // временный массив содержит объекты с позицией и значением сортировки
// let mapped = list.map((el, index) => {
//     return { index, value: el.toLowerCase() };
// });
//
// // сортируем массив, содержащий уменьшенные значения
// mapped.sort((a, b) => {
//     if (a.value > b.value) {
//         return 1; }
//     if (a.value < b.value) {
//         return -1; }
//     return 0;
// });
//
// // контейнер для результа
// let result = mapped.map((el) => {
//     return list[el.index];
// });
//
// console.log(result)
//

