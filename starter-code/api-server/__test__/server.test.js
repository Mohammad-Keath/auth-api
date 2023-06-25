const {server} =require('../src/server')
const supertest = require('supertest')
const request = supertest(server)
const {db}= require('../src/models/index')
const base64 = require('base-64')

 beforeAll(async () => {
    await db.sync();
});
describe('V1 testing',()=>{
   
    test('POST /api/v1/:model adds an item to the DB and returns an object with the added item.',async()=>{
        const responce = await request.post('/api/v1/food').send({
            "name":"salad",
            "calories":"20",
            "type":"vegetable"
        })
        expect(responce.status).toBe(201)
    })
    test('GET /api/v1/:model returns a list of :model items.',async()=>{
        const responce = await request.get('/api/v1/food')
        expect(responce.status).toBe(200)
    })
    test('GET /api/v1/:model/ID returns a single item by ID.',async()=>{
        const responce = await request.get('/api/v1/food/1')
        expect(responce.status).toBe(200)
    })
    test('PUT /api/v1/:model/ID returns a single, updated item by ID.',async()=>{
        const responce = await request.put('/api/v1/food/1').send({
            "name":"salad",
            "calories":"15",
            "type":"vegetable"
        })
        expect(responce.status).toBe(200)
    })
    test('DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found.',async()=>{
        const responce = await request.delete('/api/v1/food/2')
        expect(responce.status).toBe(204)
    })
})
describe('V2 testing',()=>{
    test('creating admin account',async()=>{
        const responce = await request.post('/signup').send({
            'username':'ahamd',
            'password':'123',
            'role':'admin'
        })
        expect(responce.status).toBe(201)
    })
    test('POST /api/v2/:model with a bearer token that has create permissions adds an item to the DB and returns an object with the added item.',async ()=>{
        const responce = await request.post('/api/v2/food')
        .set({authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoYW1kIiwiaWF0IjoxNjg3Njk1MjU1fQ.8vKMUfTNO24ZHO29WKEgABsE3k7yA1LVUR1RXNNlc2s'})
        .send({
            "name":"salad",
            "calories":"20",
            "type":"vegetable"
        })
        expect(responce.status).toBe(201)
    })
    test('GET /api/v2/:model with a bearer token that has read permissions returns a list of :model items.',async()=>{
        const responce = await request.get('/api/v2/food')
        .set({authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoYW1kIiwiaWF0IjoxNjg3Njk1MjU1fQ.8vKMUfTNO24ZHO29WKEgABsE3k7yA1LVUR1RXNNlc2s'})
        expect(responce.status).toBe(200)
    })
    test('GET /api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID.',async()=>{
        const responce = await request.get('/api/v2/food/1')
        .set({authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoYW1kIiwiaWF0IjoxNjg3Njk1MjU1fQ.8vKMUfTNO24ZHO29WKEgABsE3k7yA1LVUR1RXNNlc2s'})
        expect(responce.status).toBe(200)
    })
    test('PUT /api/v2/:model/ID with a bearer token that has update permissions returns a single, updated item by ID.',async()=>{
        const responce = await request.put('/api/v2/food/1')
        .set({authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoYW1kIiwiaWF0IjoxNjg3Njk1MjU1fQ.8vKMUfTNO24ZHO29WKEgABsE3k7yA1LVUR1RXNNlc2s'})
        .send({
            "name":"salad",
            "calories":"15",
            "type":"vegetable"
        })
        expect(responce.status).toBe(200)
    })
    test('DELETE /api/v2/:model/ID with a bearer token that has delete permissions returns an empty object. Subsequent GET for the same ID should result in nothing found.',async()=>{
        const responce = await request.delete('/api/v2/food/2')
        .set({authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFoYW1kIiwiaWF0IjoxNjg3Njk1MjU1fQ.8vKMUfTNO24ZHO29WKEgABsE3k7yA1LVUR1RXNNlc2s'})
        expect(responce.status).toBe(204)
    })
})
describe('Auth routes testing', ()=>{
    test('POST /signup creates a new user and sends an object with the user and the token to the client.',async ()=>{
        const responce = await request.post('/signup').send({
            "username" :"salem",
            "password" : "123",
            "role":'user'
        })
        expect(responce.status).toBe(201)
    })
    test('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client.',async()=>{
        const responce = await request.post('/signin')
        .set({authorization:base64.encode(`salem:123`)})
        expect(responce.status).toBe(200)
    })
})


afterAll(async () => {
    await db.drop();
});