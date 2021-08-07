/**
 * Функция переключает класс active у бургер-меню и меню-body при клике
 * блокируется body при открытом меню. Блок сбрасывается при экране > 767, когда исчезает бургер-меню
 */

;(function burger() {
  const burger = document.querySelector('.menu__burger')
  const menuBody = document.querySelector('.menu__body')
  const body = document.querySelector('body')

  burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    menuBody.classList.toggle('active')
    if (burger.classList.contains('active')) {
      body.classList.add('lock')
    } else {
      body.classList.remove('lock')
    }
  })

  window.addEventListener('resize', (e) => {
    if (e.target.innerWidth > 767) {
      body.classList.remove('lock')
    }
  })

  menuBody.addEventListener('click', (e) => {
    if (
      e.target.getAttribute('href') === '#about-us' ||
      e.target.getAttribute('href') === '#work' ||
      e.target.getAttribute('href') === '#shop' ||
      e.target.getAttribute('href') === '#contacts'
    ) {
      burger.classList.toggle('active')
      menuBody.classList.toggle('active')
      body.classList.remove('lock')
    }
  })
})()
