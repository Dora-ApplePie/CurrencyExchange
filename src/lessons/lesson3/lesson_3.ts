import axios from "axios";

console.log('lesson 3');

// Event loop
// https://learn.javascript.ru/event-loop
// https://habr.com/ru/company/ruvds/blog/340508/
// https://www.youtube.com/watch?v=8aGhZQkoFbQ
// https://www.youtube.com/watch?v=j4_9BZezSUA
// https://www.jsv9000.app/

// Promise
// https://learn.javascript.ru/promise-basics
// https://www.youtube.com/watch?v=1idOY3C1gYU


// https://jsonplaceholder.typicode.com/posts/1
// https://habr.com/ru/company/oleg-bunin/blog/417461/?_ga=2.54695343.543933152.1602500664-1040035071.1596811661


let prom = new Promise((resolve, reject) => {
    setTimeout((res: any) => {
        if (res.statusCode >= 200 && res.statusCode <= 400) {
            resolve(res.data)
            console.log(prom) //фулфилд
        } else {

        }
    }, 1000, {data: {id: 1, name: ' Dora'}, message: '', statusCode: '200'}) //res равет args и это все выполнится через 1 сек
})
console.log(prom) //пендинг


// //promise chaining
prom
    .then((res) => {
        console.log(res)
    }) //вернется объект {id: 1, name: 'Dora'} так как resolve(res.data) в setTimeout
    .then((res2) => {
        console.log(res2)
    }) //вернется undefined так как нету return в предыдущем then


//promise chaining 2
prom
    .then((res) => {
        console.log(res) //вернется объект {id: 1, name: 'Dora'} так как resolve(res.data) в setTimeout
        return new Promise((res, rej) => {
            setTimeout((response: any) => {
                if (response.statusCode >= 200 && response.statusCode <= 400) {
                    res(response.data)
                    console.log(prom) //фулфилд
                } else {
                }
            }, 1000, {data: {email: 'test@test.com'}, message: '', statusCode: '200'})
            prom
                .then((res) => {
                    console.log(res) //вернется объект {id: 1, name: 'Dora'} так как resolve(res.data) в setTimeout
                    return new Promise((res, rej) => {
                        setTimeout((response: any) => {
                            if (response.statusCode >= 200 && response.statusCode <= 400) {
                                res(response.data)
                                console.log(prom) //фулфилд
                            } else {
                            }
                        }, 1000, {data: {email: 'test@test.com'}, message: '', statusCode: '200'})
                    })
                })
                .then((res2: any) => {
                    console.log(res2.email) // вернется test@test.com
                })

//reject promise

            let promReject2 = new Promise((resolve, reject) => {
                setTimeout((res: any) => {
                    if (res.statusCode >= 200 && res.statusCode <= 400) {

                    } else {
                        reject(res.message)
                    }
                }, 1000, {data: '', message: 'Unauthorized', statusCode: '401'})
            })

            promReject2
                .then(
                    res =>
                        console.log(res),
                    err => { //вызывается сразу же второй коллбек метода then, так как у нас reject(res.message)
                        console.log(err) //Unauthorized
                        //throw 'some error'
                    })
                .then(
                    res2 => {
                        console.log(res2) //undefined, так как нету явного return выше в err
                    },
                    err2 => { //попадем сразу сюда а не в res2
                        console.log(err2) // перехват ошибок throw 'some error', ошибка идет вниз по цепочке до ближайшего обработчика ошибок
                    }
                )
                .then( //типо catch
                    null, //пропускаем обработчик res и ниже устанавливаем сразу для ошибок
                    err3 => { //если бы не было err2, словили бы ошибку здесь
                        console.log(err3)
                    }
                )
                .catch(
                    err4 => {
                        console.log(err4)
                    }
                )
        })
    })
    .then((res2: any) => {
        console.log(res2.email) // вернется test@test.com
    })

//reject promise

let promReject3 = new Promise((resolve, reject) => {
    setTimeout((res: any) => {
        if (res.statusCode >= 200 && res.statusCode <= 400) {

        } else {
            reject(res.message)
        }
    }, 1000, {data: '', message: 'Unauthorized', statusCode: '401'})
})

promReject3
    .then(
        res =>
            console.log(res),
        err => { //вызывается сразу же второй коллбек метода then, так как у нас reject(res.message)
            console.log(err) //Unauthorized
            //throw 'some error'
        })
    .then(
        res2 => {
            console.log(res2) //undefined, так как нету явного return выше в err
        },
        err2 => { //попадем сразу сюда а не в res2
            console.log(err2) // перехват ошибок throw 'some error', ошибка идет вниз по цепочке до ближайшего обработчика ошибок
        }
    )
    .then( //типо catch
        null, //пропускаем обработчик res и ниже устанавливаем сразу для ошибок
        err3 => { //если бы не было err2, словили бы ошибку здесь
            console.log(err3)
        }
    )
    .catch(
        err4 => {
            console.log(err4)
        }
    );

//Изучить API по ссылке https://jsonplaceholder.typicode.com/guide/
//Реализовать методы get, post, put, delete через axios

// //get
// fetch('https://jsonplaceholder.typicode.com/posts/1')
//     .then((response) => response.json())
//     .then((json) => console.log(json));
//
// axios.get('https://jsonplaceholder.typicode.com/posts/1')
//     .then(response => response.data)
//     .then((data: any) => {
//         return console.log(data)
//     })

// //post
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'fetch',
//         body: 'bar',
//         userId: 1,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
//
// axios.post('https://jsonplaceholder.typicode.com/posts', {
//         title: 'axios',
//         body: 'bar-ax',
//         userId: 2,
//     },
//     {
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//     .then((response) => response.data)
//     .then((data) => console.log(data));
//
//
// //put
// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//     method: 'PUT',
//     body: JSON.stringify({
//         id: 1,
//         title: 'foo',
//         body: 'bar',
//         userId: 1,
//     }),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
//
// axios.put('https://jsonplaceholder.typicode.com/posts/1', {
//         id: 1,
//         title: 'foo',
//         body: 'bar',
//         userId: 1,
//     },
//     {
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//     .then((response) => response.data)
//     .then((data) => console.log(data));
//
// //delete
// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//     method: 'DELETE',
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
//
// axios.delete('https://jsonplaceholder.typicode.com/posts/1')
//     .then((response) => response.data)
//     .then((data) => console.log(data));
//
// // Simple DELETE request with axios
// axios.delete('https://reqres.in/api/posts/1')
//     .then(() => console.log({status: 'Delete successful'}));

//ассинхронные функции

//1. синхронное выполнение, асинхронный вызов
// console.log("Start") //синхронно
//
// //async возвращает только промис!
// async function f() {       //const f = () => {} для стрелочной
//     console.log("function") //синхронно
// }
//
// f().then(console.log); // ассинхронное выполнение
//
// console.log("End") //синхронно


//2.добавляем setTimeout
// console.log("Start") //синхронно
//
// //async возвращает только промис!
// async function f() {       //const f = () => {} для стрелочной
//     const result = await new Promise(res => { //await ждет пока промис изменит свое состояние с пендинг на ресолв
//         setTimeout(() => { // ассинхронное выполнение с помощью генератора
//             res("yo")
//         }, 2000)
//     });
//     console.log('result', result);
// }
//
// f().then(console.log); // ассинхронное выполнение с помощью генератора, остановка вып-ия кода, возврат в место остановки и вып-ие
//
// console.log("End") //синхронно

//3. добавляем reject
//console.log("Start") //синхронно

//async возвращает только промис!
// async function f() {       //const f = () => {} для стрелочной
//
//     try { //ловим ошибку с помощью трай/кетч, один блок видимости, при реджект вылет из блока
//         const result = await new Promise((res, rej) => { //await ждет пока промис изменит свое состояние с пендинг на ресолв
//             setTimeout(() => { // ассинхронное выполнение с помощью генератора
//                 res("yo")
//             }, 2000)
//         });
//         console.log('result', result);
//         const result2 = await new Promise((res, rej) => { //await ждет пока промис изменит свое состояние с пендинг на ресолв
//             setTimeout(() => { // ассинхронное выполнение с помощью генератора
//                 res("yo-yo")
//             }, 1000)
//         });
//         console.log('result2', result2);
//     } catch (e) {
//         console.log('error', e) //перехват ошибки
//     }
// }
// f();

// ассинхронное выполнение с помощью генератора, остановка вып-ия кода, возврат в место остановки и вып-ие
// перехват ошибки
//f().then(console.log).catch(err => console.log('err', err))

// async function f() {       //const f = () => {} для стрелочной
//
//     try { //ловим ошибку с помощью трай/кетч, один блок видимости, при реджект вылет из блока
//         const result = await Promise.resolve('YO-RESOLVE'); //даже если зарезолвленный, все равно попадет в микротаски и выполниться позже
//         console.log('result', result);
//     } catch (e) {
//         console.log('error', e) //перехват ошибки
//     }
// }
// f();
//
// console.log("End") //синхронно


// //ТЕСТОВЫЕ ЗАДАЧКИ СОБЕСОВ НА async/await
// //1.
// setTimeout(() => console.log(1), 0); //макрозадача
// console.log(2); //обычный синхронный код
// (() => console.log(3))(); //самовызывающаяся функция фанкш экспрешн
// Promise.resolve(console.log(4)); //обработка параметров по очереди поэтому консоль лог выполниться синхронно
// //а этот промис вернет undefined так как у него нет ретурна
// //ОТВЕТ 2-3-4-1


// //2.
// new Promise((res, rej) => { //обычная функция и код выполняется синхронно пока не появится какая-то ассинхронная часть
//     console.log(1);
//     res(console.log(10)); //мы синхронно выполняем лог а функции передаем undefined и потом резолвим промис
// }).then(() => {
//     console.log(6); //ассинхронщина
// })
//
// new Promise((res, rej) => {
//     setTimeout(() => console.log(2), 0); //залетает в макротаски
// })
// Promise.resolve(setTimeout(() => console.log(3), 0)).then(console.log); //setTimeout and setInterval возвращают айдишки
// //поэтому в .then(console.log) будет зарезолвленная айдишка
// console.log(4);
// Promise.reject(console.log(5)); //вызов функции, внутри вызова производится расчет
// //ОТВЕТ 1-10-4-5-6-2-3-айди


// // 3.
//(function  (){
// setTimeout(() => console.log(1), 100); //setTimeout это браузерное api поэтому попадает в микротаски
// })();
// console.log(2);
// new Promise((res, rej)=> {
//     setTimeout(()=> console.log(3), 50);//время ожидания меньше поэтому сначала это из ассинхроных
// }) //тоже макрозадачи
// function f() {
//     console.log(4);
// }
// Promise.resolve(console.log(5)); //выполнение выражения

// //ОТВЕТ 2-5-3-1


// //4.
// (function (){
//     setTimeout(()=> console.log(1), 100);
// })();
// console.log(2);
//
// let i = 0;
// while (i < 50000000000) { //зависнет и уже выполнется первый таймаут из микротасок
//     i++
// }
//
// new Promise((res, rej)=> {
//     setTimeout(()=> console.log(3), 50) //выполнется после первого, так как уже фоново выполнился таймер и выполнится первый таймаут потом этот
// })
//
// function f() {
//     console.log(4); //нигде не вызывается
// }
//
// Promise.resolve(console.log(5));
//
// //ОТВЕТ 2-5-1-3

// //5.
// function f(num) {
//     console.log(num);
// }
//
// Promise.resolve(1).then(f); //в очередб микрозадач, затем выполняется 1 как первая из асинхронных
//
// (function () {
//     console.log(2);
// })();
//
// console.log(3);
//
// new Promise((res, rej) => {
//     console.log(4);
// });
// setTimeout(f, 0, 5); //тоже в очередь и срабатывает через 0 сек
// //ОТВЕТ 2-3-4-1-айдисета-5

// //6.
// console.log(1);
//
// function f() {
//     console.log(2);
// }
//
// setTimeout(() => {
//     console.log(3);
//     let p = new Promise((res, rej) => {
//         console.log(4);
//         res();
//     });
//     p.then(() => f()) //после резолва у p промиса
// }, 0);
//
// let l = new Promise((res, rej) => {
//     console.log(5);
//     rej();
// });
//
// l.then(res => console.log(res)).catch(() => console.log(6)); //первая из микрозадач, поэтому выполняется первая в асинхронщине
//
// console.log(7);
//
// //ОТВЕТ 1-5-7-6-3-4-2

// //7.
// async function sleep(ms: number) {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             console.log(ms);
//             res() //не изменит состояние с пендинг пока сеттаймаут не отсчитает 3 сек
//         }, ms * 100);
//     })
// }
//
// async function show() {
//     await sleep(3) //получает по дефолту пендинг, но так каак мы его зарезолвили в сеттаймауте он приходит заресолвленный и эвэйт игнорируется
//     await sleep(2)
//     await sleep(1)
// }
//
// show();
// //ОТВЕТ 321

// //8.
// async function sleep(ms: number) {
//         setTimeout(() => {
//             console.log(ms);
//         }, ms * 100);
// }
//
// async function show() {
//     await sleep(3) //получает пендинг
//     await sleep(2) //получает пендинг
//     await sleep(1) //получает пендинг
// }//и через 1 сек срабатывает 1, потом 2 через 2, потом 3 из очереди
//
// show();
// //ОТВЕТ 123

// //9.
// let pr1 = new Promise((res) => {
//     res(10);
// });
// let pr2 = new Promise((res) => {
//     res(0);
// });
//
// pr1
//     .then((res: any) => {
//         console.log(res);
//         return res + 2;
//     })
//     .then((res: any) => {
//         console.log(res);
//         return res + 2;
//     })
//     .then(console.log);
//
// pr2
//     .then((res: any) => {
//         console.log(res);
//         return res + 1;
//     })
//     .then((res: any) => {
//         console.log(res);
//         return res + 1;
//     })
//     .then(console.log);
//
// //10-0-12-14-1-2 так как then друг за другом не выполняются

// //10.
// setTimeout(() => console.log(1), 0);
// console.log(2);
// new Promise((resolve, reject) => {
//     setTimeout(() => reject(console.log(3)), 1000);
//     }).catch(() => console.log(4));
// console.log(5);
//
// //2-5-1-3-4


// just a plug
export default () => {
};