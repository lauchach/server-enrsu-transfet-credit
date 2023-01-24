const langList = ['th', 'en']
const response = {
  0: {
    en: 'Success',
    th: 'ดำเนินการสำเร็จ',
  },
  404: {
    en: 'Success',
    th: 'ดำเนินการสำเร็จ',
  },
  1001: {
   en: 'request data not fond ',
   th: 'ข้อมูลบางอย่างผิดพลาด',
  },
  1011: {
    en: '',
    th: 'ไม่พบยูสที่ตรงกัน',
  },
  1012: {
    en: '',
    th: 'ระหัสผ่านไม่ถูกต้อง',
  },
  1021: {
    en: '',
    th: 'Email นี้ถูกใช้งานแล้ว',
  },
  1022: {
    en: '',
    th: 'ระหัสผ่านไม่ตรงกัน',
  },
  2001: {
    en: '',
    th: 'มีรายวิชาที่ซ้ำกัน',
  },
}

module.exports = {
  response: response,
  langList: langList
}