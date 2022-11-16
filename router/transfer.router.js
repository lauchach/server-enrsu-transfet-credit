const express = require('express')
const controller = require('../controllers/transfer.controller')

const router = express.Router()

  router.route('/user/update')
  .post(controller.userUpdate)

module.exports = router
