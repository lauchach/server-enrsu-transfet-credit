const express = require('express')
const controller = require('../controllers/upload.controller')

const router = express.Router()

  router.route('/img')
  .post(controller.uploadImg)

  router.route('/img/get')
  .post(controller.GetImgLink)

module.exports = router
