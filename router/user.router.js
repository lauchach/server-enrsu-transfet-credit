const express = require('express')
const controller = require('../controllers/user.controller')

const router = express.Router()

  router.route('/login')
  .post(controller.login)

  router.route('/register')
  .post(controller.register)

  router.route('/profile/get')
  .post(controller.getProfile)

  router.route('/profile/update')
  .post(controller.updateProfile)

module.exports = router
