// const {server} =require('../src/server')
// const supertest = require('supertest')
// const request = supertest(server)
// const {db}= require('../src/models/index')
// const base64 = require('base-64')
//  beforeAll(async () => {
//     await db.sync();
// });
//  describe('Auth routes testing', ()=>{
//     test('POST /signup creates a new user and sends an object with the user and the token to the client.',async ()=>{
//         const responce = await request.post('/signup').send({
//             "username" :"salem",
//             "password" : "123",
//             "role":'user'
//         })
//         expect(responce.status).toBe(201)
//     })
//     test('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client.',async()=>{
//         const responce = await request.post('/signin')
//         .set({authorization:base64.encode(`salem:123`)})
//         expect(responce.status).toBe(200)
//     })
// })


// afterAll(async () => {
//     await db.drop();
// });