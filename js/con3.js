// 동물병원 슬라이드
$(document).ready(function(){
  let $articles = $("#content3 .con3_right .box article");
  let current = 0;

  // 처음에는 첫 번째만 보이기
  $articles.hide().eq(current).show();

  // 위쪽 화살표(이전)
  $(".con3_right .fa-arrow-up").click(function(){
    $articles.eq(current).hide();
    current = (current - 1 + $articles.length) % $articles.length;
    $articles.eq(current).fadeIn();
  });

  // 아래쪽 화살표(다음)
  $(".con3_right .fa-arrow-down").click(function(){
    $articles.eq(current).hide();
    current = (current + 1) % $articles.length;
    $articles.eq(current).fadeIn();
  });
});






// 잃어버린 반려동물 슬라이더
const slider = document.querySelector('.slider');
const articles = document.querySelectorAll('.slider > article');
let currentIndex = 0;
let visibleCount = getVisibleCount();

function getVisibleCount() {
  if (window.innerWidth <= 500) return 1;
  if (window.innerWidth <= 800) return 2;
  return 3;
}

function updateSlider() {
  const articleWidth = articles[0].offsetWidth + 20; 
  slider.style.transform = `translateX(-${currentIndex * articleWidth}px)`;
}

// 윈도우 리사이즈 시 다시 계산
window.addEventListener('resize', () => {
  visibleCount = getVisibleCount();
  if (currentIndex > articles.length - visibleCount) {
    currentIndex = articles.length - visibleCount;
    if (currentIndex < 0) currentIndex = 0;
  }
  updateSlider();
});

// 마우스 휠 이벤트
document.querySelector('.slider-wrapper').addEventListener('wheel', (e) => {
  e.preventDefault(); 
  if (e.deltaY > 0) {
    if (currentIndex < articles.length - visibleCount) {
      currentIndex++;
    }
  } else {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }
  updateSlider();
});


