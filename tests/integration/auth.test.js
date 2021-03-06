const request = require('supertest');
const mongoose = require('mongoose');
const {
  User
} = require('../../models/user');
const {
  Document
} = require('../../models/document');

describe('auth middleware in routes', () => {

  beforeEach(() => {
    server = require('../../index');
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    await server.close();
    await Document.remove({});
  });

  let token;

  const exec = () => {
    return request(server)
      .post('/api/documents')
      .set('x-auth-token', token)
      .send({
        userId: mongoose.Types.ObjectId().toHexString(),
        name: 'document',
        year: "2020",
        month: "april",
        SIRET: "12345",
        salaire_brut: 1,
        salaire_net_paye: 1,
        impot_revenu: 1,
        conge_n_1: 1,
        conge_n: 1,
        rtt: 1
      });

  };
  it('should return 401 if no token is provided', async () => {

    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {

    token = 'a';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});

// ajouter test pour le POST /auth
