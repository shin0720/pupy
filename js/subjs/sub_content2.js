document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".button ul li");
  const hospitals = [...document.querySelectorAll(".inner_box")];
  const moreBtn = document.querySelector(".more_btn");

  let moreOpen = false; // more 버튼 상태

  // 전체 숨기기
  function hideAll() {
    hospitals.forEach(h => (h.style.display = "none"));
  }

  // 배열에서 무작위 n개 뽑기
  function pickRandom(arr, n) {
    const copy = [...arr];
    const result = [];
    while (result.length < n && copy.length > 0) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  // 무작위 4개만 표시
  function renderRandomFour() {
    hideAll();
    const picked = pickRandom(hospitals, 4);
    picked.forEach(el => (el.style.display = "inline-block"));
  }

  // li 클릭 이벤트 → 항상 초기 상태(랜덤 4개만, more 닫기)
  tabs.forEach(li => {
    li.addEventListener("click", () => {
      document.querySelector(".button ul li.active")?.classList.remove("active");
      li.classList.add("active");
      moreOpen = false; // 🔥 more 상태 초기화
      renderRandomFour();
    });
  });

  // more 버튼 클릭 이벤트
  moreBtn.addEventListener("click", () => {
    moreOpen = !moreOpen;
    if (moreOpen) {
      // 현재 보이는 4개 + 나머지 열기
      hospitals.forEach(el => (el.style.display = "inline-block"));
    } else {
      // 다시 랜덤 4개만
      renderRandomFour();
    }
  });

  // 초기 세팅: 첫 4개만
  hideAll();
  hospitals.slice(0, 4).forEach(el => (el.style.display = "inline-block"));
});
