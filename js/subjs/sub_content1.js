

// 로띠에 파일
document.addEventListener('DOMContentLoaded', () => {
    lottie.loadAnimation({
        container: document.getElementById('dog_lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './lottie/YummyDog.json'
    });
});






// 프로필
(() => {
    const vp = document.getElementById('feedViewport');
    const prevBtn = document.getElementById('feedPrev');
    const nextBtn = document.getElementById('feedNext');
    const dlg = document.getElementById('msgDialog');

    if (!vp) return;
    const cards = Array.from(vp.querySelectorAll('.post'));
    if (!cards.length) return;

    
    const likeKey = 'dogLikes_v2';
    const store = JSON.parse(localStorage.getItem(likeKey) || '{}');

    



    cards.forEach((card, i) => {
        const uid = card.dataset.id && card.dataset.id.trim() ? card.dataset.id.trim() : `card_${i}`;
        card.dataset.uid = uid;

        const likeBtn = card.querySelector('.icon.like');
        if (likeBtn) {
            let badge = likeBtn.querySelector('.count');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'count';
                likeBtn.prepend(badge); 
            }
            Object.assign(badge.style, {
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: '30',
                color: '#000',
                lineHeight: '1',
                fontWeight: '700',
                fontSize: '20px'
            });

            const base = Number(card.dataset.likes || likeBtn.getAttribute('data-likes') || badge.textContent || 0) || 0;
            const liked = !!store[uid];
            likeBtn.setAttribute('aria-pressed', liked ? 'true' : 'false');
            badge.textContent = String(base + (liked ? 1 : 0));
            // 나중 계산을 위해 원본 저장
            card.dataset._baseLikes = String(base);
            // 버튼 포인터 확실히
            likeBtn.style.cursor = 'pointer';
        }
    });

    /* 좋아요 / 메시지 */
    vp.addEventListener('click', (e) => {
        const like = e.target.closest?.('.icon.like');
        if (like) {
            const card = like.closest('.post');
            const uid = card.dataset.uid;
            const badge = like.querySelector('.count');
            const base = Number(card.dataset._baseLikes || 0);
            const was = like.getAttribute('aria-pressed') === 'true';
            const now = !was;

            like.setAttribute('aria-pressed', now ? 'true' : 'false');
            if (now) store[uid] = 1; else delete store[uid];
            localStorage.setItem(likeKey, JSON.stringify(store));

            if (badge) badge.textContent = String(base + (now ? 1 : 0));
            return;
        }

        const chat = e.target.closest?.('.icon.chat');
        if (chat && dlg?.showModal) {
            const to = document.getElementById('msgTo');
            const input = document.getElementById('msgInput');
            if (to) to.textContent = `👉 ${chat.dataset.name || '친구'}에게 메시지 보내기`;
            if (input) input.value = '';
            dlg.showModal();
        }
    });




    // 프로필 카드 슬라이드
    let idx = 0;
    const GAP = 24;
    let BASE_CW = null;

    function layout(force = false) {

        if (force || !BASE_CW) BASE_CW = cards[0].offsetWidth;
        const W = vp.clientWidth;
        const cw = BASE_CW;

        const centerX = (W - cw) / 2;
        const leftX = centerX - (cw + GAP);
        const rightX = centerX + (cw + GAP);

        const prev = (idx - 1 + cards.length) % cards.length;
        const next = (idx + 1) % cards.length;


        cards.forEach(el => { el.style.transition = 'none'; });

        cards.forEach((el, i) => {
            el.style.zIndex = 1;
            el.classList.remove('center', 'side');

            if (i === idx) {
                el.style.transform = `translate3d(${centerX}px,0,0) rotate(0deg) scale(1)`;
                el.style.top = `0px`;
                el.classList.remove('hidden'); el.classList.add('center'); el.style.zIndex = 3;

            } else if (i === prev) {
                el.style.transform = `translate3d(${leftX}px,-12px,0) rotate(-15deg) scale(.8)`;
                el.style.top = `50px`;
                el.classList.remove('hidden'); el.classList.add('side'); el.style.zIndex = 2;

            } else if (i === next) {
                el.style.transform = `translate3d(${rightX}px,-12px,0) rotate(15deg) scale(.8)`;
                el.style.top = `50px`;
                el.classList.remove('hidden'); el.classList.add('side'); el.style.zIndex = 2;

            } else {
                el.classList.add('hidden');
                el.style.transform = 'translate3d(-9999px,0,0)';
            }
        });

        // 보이는 3장만 다음 틱에 트랜지션 활성
        requestAnimationFrame(() => {
            cards.forEach((el, i) => {
                const on = (i === idx || i === prev || i === next);
                el.style.transition = on ? '' : 'none';
            });
        });
    }

    // 이벤트
    prevBtn.addEventListener('click', () => { idx = (idx - 1 + cards.length) % cards.length; layout(); });
    nextBtn.addEventListener('click', () => { idx = (idx + 1) % cards.length; layout(); });
    window.addEventListener('resize', () => layout(true));
    layout(true);

})();
