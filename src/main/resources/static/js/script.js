;(function(){

    // ====== CONFIGURAR AQUI ======
    const CONFIG = {
        yourName: "Kauã",
        herName: "Débora",
        tagLine: "Com todo carinho para Débora",
        primaryColor: "#e11d48", // mude a cor do tema
        anniversary: "2025-08-20", // YYYY-MM-DD (data do próximo evento/ani-versário)
        subtitle: "Cada dia ao seu lado é meu favorito. Preparei isso com muito amor, só pra te lembrar do quanto você é especial pra mim.",
        loveLetter: `
        Meu bem,

        Você sabe que sou uma pessoa de poucas palavras, mas desenvolvi este projetinho com a intenção de criar algo mais significativo, rsrs.
        (Alias, acabei fazendo essa ferramenta porque as disponíveis na internet não são gratuitas, futuramente estará disponivel para outra pessoas também destrufarem dessa simples aplicação!)

        O seu progresso também se torna o meu. Você se tornou uma pessoa muito especial para mim! Que Deus abençoe sua vida, e eu desejo todo sucesso para você. Suas vitórias e seu crescimento me alegram profundamente.

        Prometo continuar escolhendo você todos os dias. Hoje, amanhã e sempre.

        Com todo o meu amor,
        Kauã 💘
      `,
        // Galeria de fotos: troque os src pelos seus arquivos (ex.: "/fotos/nosso_anoitecer.jpg")
        gallery: [
            { src: "../image/photo-1.jpg", caption: "Linda Linda" },
            { src: "../image/photo-2.jpg", caption: "Toda Risonha" },
            { src: "../image/photo-3.jpg", caption: "A Melhor Companhia" },
            { src: "../image/photo-4.jpg", caption: "Mulher Cara" },
            { src: "../image/photo-5.jpg", caption: "Moça do Sorriso Lindo" },
            { src: "../image/photo-6.jpg", caption: "Cheia de Vergonha" }
        ],
        // Linha do tempo (use datas livres)
        timeline: [
            { when: "11/04/2023", what: "Olhei para você", detail: "O dia que entrei no Alpha e soube da sua existência!!" },
            { when: "26/12/2024", what: "Nosso primeiro encontro de verdade", detail: "Fomos ver o Rei Leão, eu estava muito feliz, mas só me lembro quando eu te chamei para jogar no Park kkkkk" },
            { when: "22/02/2025", what: "Demorou, né?", detail: "O dia que pedi você em namoro e entrando no processo do conhecer o pessoal!" },
            { when: "../../....", what: "Quero meu futuro com você", detail: "Iremos construir um futuro juntos!" }
        ],
        musicAutoplay: false // alguns navegadores bloqueiam autoplay; use o botão
    };

    // ====== THEME E TEXTS ======
    const setTheme = (color) => {
        document.documentElement.style.setProperty('--primary', color);
        document.documentElement.style.setProperty('--glow', `0 0 40px ${hexToRgba(color, .35)}`);
    }

    const hexToRgba = (hex, a=1) => {
        const h = hex.replace('#','');
        const bigint = parseInt(h.length===3 ? h.split('').map(x=>x+x).join('') : h, 16);
        const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    const $ = (sel) => document.querySelector(sel);

    const initTexts = () => {
        $('#tagLine').textContent = CONFIG.tagLine || 'Com carinho';
        $('#title').innerHTML = `Para <span style="color: var(--primary)">${CONFIG.herName || 'Você'}</span> 💘`;
        $('#subtitle').textContent = CONFIG.subtitle;
        $('#yourNameFoot').textContent = CONFIG.yourName;
        $('#yourNameFoot2').textContent = CONFIG.herName;
        setTheme(CONFIG.primaryColor || '#e11d48');
    }

    // ====== CONT ======
    const startCountdown = () => {
        const target = new Date(CONFIG.anniversary + 'T00:00:00');
        const update = () => {
            const now = new Date();
            let diff = Math.max(0, target - now);
            const s = Math.floor(diff / 1000);
            const d = Math.floor(s / 86400);
            const h = Math.floor((s % 86400) / 3600);
            const m = Math.floor((s % 3600) / 60);
            const ss = Math.floor(s % 60);
            $('#dd').textContent = String(d).padStart(2,'0');
            $('#hh').textContent = String(h).padStart(2,'0');
            $('#mm').textContent = String(m).padStart(2,'0');
            $('#ss').textContent = String(ss).padStart(2,'0');
        };
        update();
        setInterval(update, 1000);
    }

    // ====== GALLERY ======
    const buildGallery = () => {
        const g = $('#gallery');
        g.innerHTML = '';
        CONFIG.gallery.forEach(item => {
            const card = document.createElement('article');
            card.className = 'card';
            const img = document.createElement('img');
            img.alt = item.caption || 'Nossa foto';
            img.loading = 'lazy';
            img.src = item.src;
            const cap = document.createElement('div');
            cap.className = 'caption';
            cap.textContent = item.caption || '';
            card.appendChild(img); card.appendChild(cap); g.appendChild(card);
        })
    }

    // ====== TIMELINE ======
    const buildTimeline = () => {
        const t = $('#timeline');
        t.innerHTML = '';
        CONFIG.timeline.forEach(ev => {
            const item = document.createElement('div');
            item.className = 'event';
            item.innerHTML = `
          <div class="when">${ev.when}</div>
          <div>
            <div class="what">${ev.what}</div>
            <div class="detail">${ev.detail||''}</div>
          </div>
        `;
            t.appendChild(item);
        })
    }

    // ====== Letter ======
    const setupLetter = () => {
        const open = $('#openLetter');
        const close = $('#closeLetter');
        const backdrop = $('#backdrop');
        const body = $('#letterBody');
        body.innerHTML = CONFIG.loveLetter.trim().replace(/\n/g, '<br/>');
        open.addEventListener('click', () => { backdrop.style.display = 'flex'; });
        close.addEventListener('click', () => { backdrop.style.display = 'none'; });
        backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.style.display = 'none'; });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') backdrop.style.display = 'none'; });
    }

    // ====== Spawn Hearts ======
    const spawnHearts = () => {
        const box = $('#floaters');
        const add = () => {
            const h = document.createElement('div');
            h.className = 'heart';
            const size = 14; // 10-28px
            h.style.width = h.style.height = size + 'px';
            const hue = CONFIG.primaryColor || '#e11d48';
            h.style.background = hue;
            h.style.left = Math.random()*100 + 'vw';
            h.style.bottom = '-40px';
            const dur = 7 + Math.random()*6; // 7-13s
            h.style.animation = `rise ${dur}s linear`;
            h.style.opacity = .5 + Math.random()*.35;
            box.appendChild(h);
            setTimeout(()=> h.remove(), dur*1000);
        }
        setInterval(add, 700);
    }

    // INIT
    initTexts();
    startCountdown();
    buildGallery();
    buildTimeline();
    setupLetter();
    spawnHearts();

})()