const express = require('express')
const controller = require('../controllers/transfer.controller')

const router = express.Router()

  router.route('/user/update')
  .post(controller.userUpdate)

  router.route('/record/fetch')
  .post(controller.recordFetch)

  router.route('/record/fetch/full')
  .post(controller.recordFetchFull)

  router.route('/record/list')
  .post(controller.recordList)

  router.route('/subject')
  .post(controller.transferSubject)

  router.route('/subject/save')
  .post(controller.transferRSUSave)

  router.route('/subject/list')
  .post(controller.subjectList)

  router.route('/subject/approve')
  .post(controller.transferSubjectApprove)

  router.route('/subject/unApprove')
  .post(controller.transferSubjectUnApprove)

  router.route('/subject/rsu/list')
  .post(controller.subjecRSUtList)

  module.exports = router
