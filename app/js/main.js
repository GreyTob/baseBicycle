/**
 * Функция переключает класс active у бургер-меню, и меню-body при клике
 */
;(function burgerMenu() {
  const burger = document.querySelector('.menu__burger')
  const body = document.querySelector('.menu__body')

  burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    body.classList.toggle('active')
  })
})()
