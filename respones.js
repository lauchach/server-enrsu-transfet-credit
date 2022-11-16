const code = {
  Success: 0,
  NoAgentId: 404,
  reqBodyNotFond: 1001,
// : 1011
// 1012
  passwordNotMatch: 1012,
// 1021
// 1022
// transfer code 2000
  duplicateSubject: 2001,
}

const MultiLangResponse = require('./lang')

const response = (code, data) => {
  return {
    status: {
      code: code,
      message: setLanguage(code, 'th')
    },
    data: data,
  }
}

const setLanguage = (code, lang) => {
  const _lang = lang || 'th'
  return MultiLangResponse.response[code.toString()][_lang]
}

module.exports = {
  response: response,
  code: code,
}
