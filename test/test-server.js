const chai = require("chai");
const chaiHttp = require("chai-http");
let User = require('../models/User');
let Note = require('../models/Note');
let mongoose = require("mongoose");
chai.should();
chai.use(chaiHttp);

const server = require("../app");

describe("Testing...USER...", () => {
    it("GET: user", done => {
        chai.request(server)
            .get("/users")
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                

                done();
            });
    });

    it("GET/:id: user", function (done) {
        let user = new User({
            name: "test",
            email: "test@gmail.com",
            password: "123456"
        });
        user.save((err, user) => {
            chai.request(server)
                .get('/users/' + user._id)
                //.send(user)
                .end((err, res, body) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });



    it("POST: user", function (done) {
        let user = new User({
            name: "POST test",
            email: "test@gmail.com",
            password: "123456"
        });
        user.save((err, user) => {
            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, res, body) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });



    it("PUT: user", function (done) {
        let user = new User({
            name: "PUT test",
            email: "test@gmail.com",
            password: "123456"
        });
        user.save((err, user) => {
            chai.request(server)
                .put('/users/' + user._id)
                .send({
                    name: "test2",
                    email: "test@gmail.com",
                    password: "123456"
                })
                .end((err, res, body) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });



    it("DELETE: user", function (done) {
        let user = new User({
            name: "DELETE test",
            email: "test4545@gmail.com",
            password: "123456"
        });
        user.save((err, user) => {
            chai.request(server)
                .delete('/users/' + user._id)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});

describe("Testing...NOTE...", () => {
    it("GET: note", done => {
        chai.request(server)
            .get("/notes")
            .end((err, res, body) => {
                res.should.have.status(200);
                done();
            });
    });

    it("GET/:id: note", function (done) {
        let note = new Note({
            title: "GET deneme",
            description: "deneme Notları",
            user_id: "6006e60400185c0dc401daed"

        });
        note.save((err, note) => {
            chai.request(server)
                .get('/notes/' + note._id)
                .send(note)
                .end((err, res, body) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    it("POST: note", function (done) {
        let note = new Note({
            title: "POST deneme",
            description: "deneme Notları",
            user_id: "6006e60400185c0dc401daed"

        });
        chai.request(server)
            .post("/notes")
            .send(note)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("PUT: note", function (done) {
        let note = new Note({
            title: "PUT deneme",
            description: "deneme Notları",
            user_id: "6006e60400185c0dc401daed"

        });
        note.save((err, note) => {
            chai.request(server)
                .put('/notes/' + note._id)
                .send({
                    title: "deneme454",
                    description: "deneme Notları",
                    user_id: "6006e60400185c0dc401daed"

                })
                .end((err, res,) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    it("DELETE: note", function (done) {
        let note = new Note({
            title: "DELETE deneme",
            description: "deneme Notları",
            user_id: "6006e60400185c0dc401daed"

        });
        note.save(function (err, note, body) {
            chai.request(server)
                .delete('/notes/' + note._id)
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});


describe("Sign-in/Sign-up...User...", () => {
    it("Register: user", function (done) {
        let user = new User({
            name: " REGISTER test",
            email: "test45454@gmail.com",
            password: "123456",
            password2: "123456"
        });
        chai.request(server)
            .post('/index/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it("Login: user", function (done) {
        let user = new User({
            name: "test",
            email: "test@gmail.com",
            password: "123456"
        });
        user.save((err, user) => {
            chai.request(server)
                .post('/index/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});