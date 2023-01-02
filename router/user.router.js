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

  router.route('/profile/edit/status')
  .post(controller.editStatus)

module.exports = router
