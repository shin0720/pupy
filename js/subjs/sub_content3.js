document.addEventListener("DOMContentLoaded", async () => {
  // 컨텐츠 1: 실종 동물 슬라이드 (경기도 API)
  const container = document.querySelector(".lose_box");

  if (container) {
    console.log("✅ .lose_box 찾음");

    const loseParent = container.parentElement;
    if (loseParent) {
      loseParent.style.width = "1200px";
      loseParent.style.maxWidth = "1200px";
      loseParent.style.margin = "0 auto";
      loseParent.style.overflow = "hidden";
      loseParent.style.position = "relative";
      loseParent.style.padding = "0";
    }

    const VISIBLE = 3;
    const MAX_CARDS = 7;
    const GAP = 30;

    container.style.display = "flex";
    container.style.gap = GAP + "px";
    container.style.transition = "transform 0.6s ease";
    container.style.width = "max-content";

    let currentIndex = 0;
    let page = 1;
    let isLoading = false;

    const KEY = "a10229cfb4024bf0b6b4647a37a3a7b0";
    const BASE = "https://openapi.gg.go.kr/AbdmAnimalProtect";
    const makeURL = () => `${BASE}?KEY=${KEY}&Type=json&pIndex=${page}&pSize=9`;

    container.innerHTML = "";

    function appendCard(pet) {
      if (container.children.length >= MAX_CARDS) return false;

      const imageUrl =
        pet.PHOTO_URL ||
        pet.IMAGE_COURS ||
        pet.POPFILE ||
        "./image/sub3/con2_dog1.png";

      const el = document.createElement("article");
      el.className = "box slide_item";
      el.innerHTML = `
        <div class="image">
          <img src="${imageUrl}" alt="유기동물" onerror="this.src='./image/sub3/con2_dog1.png'" />
        </div>
        <div class="notice">
          <strong>품종: <span>${pet.SPECIES_NM || "-"}</span></strong>
          <strong>색상: <span>${pet.COLOR_NM || "-"}</span></strong>
          <strong>나이: <span>${pet.AGE_INFO || "-"}</span></strong>
          <strong>발견장소: <span>${pet.DISCVRY_PLC_INFO || "-"}</span></strong>
          <strong>보호소명: <span>${pet.SHTER_NM || "-"}</span></strong>
          <strong>연락처: <span>${pet.SHTER_TELNO || "-"}</span></strong>
        </div>`;
      container.appendChild(el);
      return true;
    }

    async function loadAnimals() {
      if (isLoading || container.children.length >= MAX_CARDS) return;
      isLoading = true;

      try {
        const res = await fetch(makeURL());
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        const items = data?.AbdmAnimalProtect?.[1]?.row || [];

        for (let i = 0; i < items.length; i++) {
          if (!appendCard(items[i])) break;
        }
        page += 1;
      } catch (e) {
        console.error("API 오류:", e);
      } finally {
        isLoading = false;
      }
    }

    function updateTransform() {
      const first = container.querySelector(".box");
      if (!first) return;
      const cardW = first.offsetWidth;
      const offset = currentIndex * (cardW + GAP);
      container.style.transform = `translateX(-${offset}px)`;
    }

    function onWheel(e) {
      const content1 = document.getElementById("content1");
      if (!content1 || !content1.contains(e.target)) return;

      const total = container.children.length;
      const maxIndex = Math.max(0, total - VISIBLE);

      if (e.deltaY > 0 && currentIndex >= maxIndex) return;
      if (e.deltaY < 0 && currentIndex <= 0) return;

      e.preventDefault();
      const oldIndex = currentIndex;

      if (e.deltaY > 0) {
        if (currentIndex < maxIndex) currentIndex += 1;
      } else {
        if (currentIndex > 0) currentIndex -= 1;
      }

      if (oldIndex !== currentIndex) updateTransform();
    }

    (async () => {
      while (container.children.length < MAX_CARDS) {
        await loadAnimals();
        if (container.children.length >= MAX_CARDS) break;
      }
      updateTransform();
    })();

    window.addEventListener("wheel", onWheel, { passive: false });
  }

  // 컨텐츠 2: 입양 동물 (서울 데이터 API)

  const grid = document.querySelector(".adoption_grid");
  const moreBtn = document.querySelector(".more_btn");
  const tabs = document.querySelectorAll(".tab ul li");

  let allAnimals = [];
  let currentTab = "dog";
  let visibleCount = 6;

  const API_VPET =
    "https://seoul-proxy-b1gh.vercel.app/api/seoul?start=1&end=200";
  const API_TB =
    "https://seoul-proxy-b1gh.vercel.app/api/seoul?start=1&end=200";

  // ✅ API 호출 (vPetInfo → 실패 시 TbAdpWaitAnimalView)

  async function fetchAnimals() {
    allAnimals = [];
    try {
      const res = await fetch(API_VPET);
      const data = await res.json();
      if (data?.vPetInfo?.row?.length) {
        allAnimals = data.vPetInfo.row.map((x) => ({
          name: x.ANIMAL_NM || "",
          type: (x.ANIMAL_TYPE || "").toLowerCase() === "dog" ? "dog" : "cat",
          breed: x.ANIMAL_BREED || "",
          sex:
            x.ANIMAL_SEX === "M" ? "수컷" : x.ANIMAL_SEX === "W" ? "암컷" : "",
          status: x.ADOPT_STATUS || "입양문의가능",
          img: "./image/sub3/default.png",
          movie: x.MOVIE_URL || "",
        }));
        console.log("✅ vPetInfo 로드 성공:", allAnimals.length);
        return;
      }
      throw new Error("vPetInfo 데이터 없음");
    } catch (e1) {
      console.warn("⚠️ vPetInfo 실패, TbAdpWaitAnimalView 시도:", e1.message);
      try {
        const res2 = await fetch(API_TB);
        const data2 = await res2.json();
        const rows = data2?.TbAdpWaitAnimalView?.row || [];
        allAnimals = rows.map((x) => ({
          name: x.ANIMAL_NM || "",
          type: x.SPECIES_NM === "개" ? "dog" : "cat",
          breed: x.BREEDS || x.KIND || "",
          sex:
            x.SEXDSTN_KOR_NM === "수컷" || x.SEX_KOR === "수컷"
              ? "수컷"
              : x.SEXDSTN_KOR_NM === "암컷" || x.SEX_KOR === "암컷"
              ? "암컷"
              : "",
          status: x.ADOPT_STATE_NM || x.ADOPT_STATUS || "입양문의가능",
          img: x.THUMBNAIL_IMAGE || "./image/sub3/default.png",
          movie: x.MOVIE_URL || "",
        }));
        console.log("✅ TbAdpWaitAnimalView 로드 성공:", allAnimals.length);
      } catch (e2) {
        console.error("❌ 서울 API 모두 실패:", e1, e2);
        allAnimals = [];
      }
    }
  }

  function renderAnimals() {
    const filtered = allAnimals.filter((a) => a.type === currentTab);
    const slice = filtered.slice(0, visibleCount);
    grid.innerHTML = slice
      .map(
        (a) => `
        <div class="adoption_item">
          ${
            a.movie
              ? `<iframe src="${a.movie}" frameborder="0" allowfullscreen></iframe>`
              : `<img src="${a.img}" alt="${a.name}">`
          }
          <div class="adoption_info">
            <strong>${a.name}</strong><br>
            품종: ${a.breed}<br>
            성별: ${a.sex}<br>
            상태: ${a.status}
          </div>
        </div>`
      )
      .join("");
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentTab = idx === 0 ? "dog" : "cat";
      visibleCount = 6;
      renderAnimals();
    });
  });

  moreBtn.addEventListener("click", () => {
    visibleCount += 6;
    renderAnimals();
  });

  await fetchAnimals();
  renderAnimals();
});
