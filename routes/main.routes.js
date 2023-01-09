'use strict';

const router = require('express').Router();
const prefix = '/logs';

const controller = require('../controllers/main.controller');

router.get(`${prefix}/`, controller.all);
router.post(`${prefix}/`, controller.create);
router.get(`${prefix}/:id`, controller.info);
router.put(`${prefix}/:id`, controller.update);
router.delete(`${prefix}/:id`, controller.delete);

router.post('/aplication', controller.createAplication);
router.post('/authorization', controller.createAuthorizations);

module.exports = router;