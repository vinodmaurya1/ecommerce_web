
const validName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}

const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const validMobile=/^[0]?[6789]\d{9}$/

const validPass=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const validname = /[0-9]+/

module.exports = { validName,validname,validEmail,validMobile, validPass}