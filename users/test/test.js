//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = 'http://localhost:8080';
let should = chai.should();

chai.use(chaiHttp);
/*
  * Тест для /GET
  */

describe("UserController test", () => {

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            chai.request(server)
                .get('/users/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    console.log(res.body[0].Login);
                    // res.body.should.have.property('title');
                    // res.body.should.have.property('author');
                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('POST user', (done) => {
            let urs = {
                Login: "TestLogin",
                Password: "TestPas",
                FirstName: "TestFName",
                LastName: "TestLName"
            }
            chai.request(server)
                .post('/users')
                .send(urs)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/PUT/:id user', () => {
        it('it should UPDATE a user given the id', (done) => {
            chai.request(server)
                .put('/users/6')
                .send({Login: "Vova", Password: "vovan456", FirstName: "Vladimir", LastName: "Maximov"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('message').eql('Book updated!');
                    //res.body.book.should.have.property('year').eql(1950);
                    done();
                });
        });
    });

    describe('/DELETE/:id user', () => {
        it('it should DELETE a user given the id', (done) => {
                chai.request(server)
                    .delete('/users/36')
                    .end((err, res) => {
                        res.should.have.status(204);
                        res.body.should.be.a('object');
                   //     res.body.should.have.property('message').eql('Book successfully deleted!');
                       // res.body.result.should.have.property('ok').eql(1);
                        //res.body.result.should.have.property('n').eql(1);
                        done();
                    });
                });
        });
});