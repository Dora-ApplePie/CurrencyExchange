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
    )

//Изучить API по ссылке https://jsonplaceholder.typicode.com/guide/
//Реализовать методы get, post, put, delete через axios

//get
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((json) => console.log(json));

axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.data)
    .then((data: any) => {
        return console.log(data)
    })

//post
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'fetch',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'axios',
        body: 'bar-ax',
        userId: 2,
    },
    {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.data)
    .then((data) => console.log(data));


//put
fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PUT',
    body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

axios.put('https://jsonplaceholder.typicode.com/posts/1', {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
    },
    {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.data)
    .then((data) => console.log(data));

//delete
fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
})
    .then((response) => response.json())
    .then((json) => console.log(json));

axios.delete('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.data)
    .then((data) => console.log(data));

// Simple DELETE request with axios
axios.delete('https://reqres.in/api/posts/1')
    .then(() => console.log({status: 'Delete successful'}));

// just a plug
export default () => {
};