const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  Document,
  validateDocument
} = require('../models/document');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/', async (req, res) => {
const result = await Document.find();

res.send(result);
});

router.get('/:id', validateObjectId, async (req, res) => {
const document = await Document.findById(req.params.id);
if(!document) return res.status(404).send('This document does not exist');

res.send(document);
});

router.post('/', [auth, validate(validateDocument)], async (req, res) => {
  // const { error } = validate(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  let document = new Document({
    year: req.body.year,
    month: req.body.month,
    name: req.body.name,
    SIRET: req.body.SIRET,
    salaire_brut: req.body.salaire_brut,
    salaire_net_paye: req.body.salaire_net_paye,
    impot_revenu: req.body.impot_revenu,
    conge_n_1: req.body.conge_n_1,
    conge_n: req.body.conge_n,
    rtt: req.body.rtt
  });

  document = await document.save();
  res.send(document);
});

router.put('/:id', [auth, validateObjectId, validate(validateDocument)], async (req, res) => {
const document = await Document.findByIdAndUpdate(req.params.id, {
  year: req.body.year,
  month: req.body.month,
  name: req.body.name,
  SIRET: req.body.SIRET,
  salaire_brut: req.body.salaire_brut,
  salaire_net_paye: req.body.salaire_net_paye,
  impot_revenu: req.body.impot_revenu,
  conge_n_1: req.body.conge_n_1,
  conge_n: req.body.conge_n,
  rtt: req.body.rtt
}, {new: true});
if(!document) return res.status(404).send('This document does not exist');

res.send(document);
});

router.delete('/:id',[auth, validateObjectId], async (req, res) => {
  const document = await Document.findByIdAndRemove(req.params.id);
  if(!document) return res.status(404).send('This document does not exist');

  res.send(document);

});

module.exports = router;

