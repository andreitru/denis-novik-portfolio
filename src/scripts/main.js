const menu = document.querySelector('.header__nav');
const burger = document.querySelector('.burger');
const close = document.querySelector('.close');
const menuItem = document.querySelectorAll('.header__link');
const theme = document.querySelector('.themes');
const themeButton = document.querySelectorAll('.themes__btn');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');


burger.addEventListener('click', function () {
  menu.classList.add('header__nav--showed');
  theme.classList.add('themes--showed');
});

close.addEventListener('click', function () {
  menu.classList.remove('header__nav--showed');
  theme.classList.remove('themes--showed');
});

menuItem.forEach(function (item) {
  item.addEventListener('click', function () {
    menu.classList.remove('header__nav--showed');
    theme.classList.remove('themes--showed');
    menuItem.forEach(function (i) {
      i.classList.remove('header__link--active')
    })
    item.classList.add('header__link--active');
  });
});

const root = document.documentElement;
const mainDarkBackground = '#5f5d5d';
const mainLightBackground = '#fff';
const secondDarkBackground = 'rgb(29, 28, 28)';
const secondLightBackground = '#f6f6f6';
const mainDarkText = '#ffffff';
const mainLightText = '#070707';
const secondDarkText = '#dadada';
const secondLightText = '#828282';

function lightTheme() {
  root.style.setProperty('--color-black', mainLightText);
  root.style.setProperty('--color-gray', secondLightText);
  root.style.setProperty('--main-background-color', mainLightBackground);
  root.style.setProperty('--second-background-color', secondLightBackground);
};

function darkTheme() {
  root.style.setProperty('--color-black', mainDarkText);
  root.style.setProperty('--color-gray', secondDarkText);
  root.style.setProperty('--main-background-color', mainDarkBackground);
  root.style.setProperty('--second-background-color', secondDarkBackground);
};

darkBtn.addEventListener('click', function () {
  darkBtn.classList.toggle('themes__btn--active');
  lightBtn.classList.toggle('themes__btn--active');
  darkTheme();
});

lightBtn.addEventListener('click', function () {
  darkBtn.classList.toggle('themes__btn--active');
  lightBtn.classList.toggle('themes__btn--active');
  lightTheme();
});