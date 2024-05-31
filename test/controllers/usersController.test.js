import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js';
import mongoose from 'mongoose';
import User from '../../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const chai = use(chaiHttp);

// Connect to the database
describe('Users Controller', () => {
  before(async () => {
    await mongoose.connection.close();
    await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  // describe('POST /users', () => {
  //   it('should create a new user', async () => {
  //     const res = await chai.request(app)
  //       .post('/users')
  //       .send({ email: 'test@test.com', password: '123password' });
  //     console.log('=============================================')
  //     console.log(res.body)
  //     expect(res.status).to.equal(200);
  //     expect(res.body).to.be.an('object');
  //     expect(res.body).to.have.property('token');
  //     expect(res.body).to.have.property('user');
  //     expect(res.body).to.have.property('loggedIn');
  //   });
  // });
});