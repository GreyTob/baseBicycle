;(function emailValidate() {
  const form = document.querySelector('form.subscribe__form')
  const email = form.querySelector('.form__input input')
  const btn = form.querySelector('.form__btn button')
  const error = document.querySelector('.error')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(email.value)

    const checkEmail = (email) => {
      const reg =
        /^[a-z0-9_][a-z0-9\._-]*[a-z0-9_]*@([a-z0-9]+[a-z0-9_-]*[a-z0-9]+\.)+[a-z0-9]+$/i
      return email.match(reg)
    }

    const userEmail = email.value

    if (!checkEmail(userEmail)) {
      error.style.display = 'block'
      email.style.border = '1px solid red'
    } else {
      error.style.display = 'none'
      email.style.border = '1px solid #848789'

      //эмитация отправки
      email.value = 'Отправка...'
      btn.textContent = '. . .'
      const clk = (e) => e.preventDefault()
      form.addEventListener('click', clk)

      setTimeout(() => {
        email.value = `Успешная подписка!`
      }, 1000)

      setTimeout(() => {
        email.value = ''
        btn.textContent = 'GO'
        form.removeEventListener('click', clk)
      }, 3000)
    }
  })
})()
