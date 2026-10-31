(() => {
  const body = document.body;
  const menu = document.getElementById('menu');
  const menuOpen = document.getElementById('menuOpen');
  const menuClose = document.getElementById('menuClose');
  const dialog = document.getElementById('caseDialog');
  const dialogContent = document.getElementById('dialogContent');
  const cursorOverlay = document.getElementById('cursorOverlay');
  const cursorDot = cursorOverlay?.querySelector('.cursor-dot');
  const cursorRing = cursorOverlay?.querySelector('.cursor-ring');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let caseAnimationContext = null;
  let caseCarouselTimer = null;
  let lenisInstance = null;
  let processTrigger = null;
  let processStepIndex = 0;
  const bringCursorToFront = () => {
    if (!cursorOverlay || !cursorOverlay.showPopover) return;
    try { if (cursorOverlay.matches(':popover-open')) cursorOverlay.hidePopover(); cursorOverlay.showPopover(); } catch {}
  };

  const cases = {
    kizuna: {
      number:'01', title:'KYZUNA', italic:'CAFÉ', logo:'./Kyzuna/Kyzuna%20logo.svg', label:'CONCEPT PERSONNEL · COFFEE SHOP', kind:'Concept personnel',
      coverTitle:'UNE PAUSE', coverItalic:'EN VILLE', coverBg:'#EEE2D4', coverInk:'#32191D', coverAccent:'#471D20',
      palette:[['#32191D','Cacao','Profondeur'],['#471D20','Espresso','Ancrage'],['#EEE2D4','Crème','Fond lumineux'],['#D7C6B6','Latte','Support doux'],['#B09D8F','Lin','Nuance secondaire']],
      variants:[
        {bg:'#D7C6B6',label:'Crème sur latte',src:'./assets/brand-logos/kyzuna-white.svg'},
        {bg:'#471D20',label:'Latte sur espresso',src:'./assets/brand-logos/kyzuna-latte.svg'},
        {bg:'#D7C6B6',label:'Crème sur sable',src:'./assets/brand-logos/kyzuna-cream.svg'},
        {bg:'#B09D8F',label:'Cacao sur lin',src:'./assets/brand-logos/kyzuna-cacao.svg'},
        {bg:'#32191D',label:'Latte sur cacao',src:'./assets/brand-logos/kyzuna-latte.svg'},
        {bg:'#EEE2D4',label:'Cacao sur crème',src:'./assets/brand-logos/kyzuna-cacao.svg'}
      ],
      typefaces:[['Talina Regular','Signature'],['Nokie Regular','Accent'],['TT Commons Regular','Texte']],
      briefTitle:'Créer un lieu où l’on peut ralentir.',
      briefText:'Kyzuna est un concept de coffee shop imaginé comme un refuge en ville : on vient y boire un café, travailler ou simplement prendre une pause. L’identité doit paraître chaleureuse et accueillante sans perdre en lisibilité sur les petits formats.',
      responseTitle:'Une signature généreuse, des tons familiers.',
      responseText:'Le mot-symbole arrondi installe immédiatement une sensation de confort. Le brun profond donne de la présence ; les tons crème et latte apportent de la lumière. Les mêmes repères passent du fronton au gobelet et à la boisson, pour relier le lieu à l’expérience quotidienne.',
      principles:[['01 / SIGNATURE','Un mot-symbole souple','Le dessin massif et arrondi rend le nom mémorisable et garde sa personnalité lorsqu’il est réduit.'],['02 / CONTRASTE','Cacao, espresso, crème','Les teintes sombres portent la marque ; les tons clairs l’ouvrent et assurent une lecture nette.'],['03 / USAGES','Du lieu au geste','Le signe vit sur la façade, dans l’espace intérieur et sur les contenants.']],
      variantsNote:'Le même dessin est recoloré à partir du fichier vectoriel fourni. Chaque fond montre une combinaison prévue pour garder une lecture franche.',
      paletteNote:'La gamme alterne des bruns denses et des neutres clairs pour garder la chaleur tout en laissant respirer les supports.',
      applicationNote:'Façade, intérieur, gobelet et boisson signature : les fichiers disponibles montrent le passage de l’identité au lieu et au produit.',
      typefaceNote:'Talina Regular, Nokie Regular et TT Commons Regular sont les familles relevées sur ta planche. Le spécimen ci-dessous utilise un remplacement provisoire en attendant les fichiers de fontes.',
      role:'Identité visuelle / Direction artistique', year:'2026',
      intro:'Un coffee shop imaginé comme un refuge calme : un endroit chaleureux où l’on peut travailler, ralentir et prendre son temps.',
      storyTitle:'Une pause, dans la ville.',
      story:'L’identité s’appuie sur une typographie bold et organique, des tons café, crème et cacao, puis des images baignées d’une lumière douce. L’objectif : faire ressentir l’accueil et le confort avant même de pousser la porte.',
      images:[
        ['./Kyzuna/Caf%C3%A9%20Kyzuna%20au%20cr%C3%A9puscule.png','La devanture / identité dans la rue'],
        ['./Kyzuna/imageesdf.png','L’intérieur / lumière et matières'],
        ['./Kyzuna/Caf%C3%A9%20Kyzuna%20en%20lumi%C3%A8re%20tamis%C3%A9e.png','Le gobelet / déclinaison du logotype'],
        ['./Kyzuna/656a5e29-a897-4956-896b-b2aedb169e98%201.png','La boisson signature / expérience produit']
      ]
    },
    orvane: {
      number:'02', title:'ORVANE', italic:'JOAILLERIE', logo:'./Orvane/ORVANE%20Logo.svg', label:'CONCEPT PERSONNEL · MAISON DE BIJOUX', kind:'Concept personnel',
      coverTitle:'L’ÉCLAT', coverItalic:'VÉGÉTAL', coverBg:'#E7DBCD', coverInk:'#25271E', coverAccent:'#AC704E',
      palette:[['#525A43','Olive','Fond profond'],['#9CA18A','Sauge','Base naturelle'],['#E7DBCD','Pierre','Fond clair'],['#AC704E','Terracotta','Accent chaud'],['#834629','Ambre','Accent sombre']],
      variants:[
        {bg:'#9CA18A',label:'Terracotta sur sauge',src:'./assets/brand-logos/orvane-terracotta.svg'},
        {bg:'#AC704E',label:'Sauge sur terracotta',src:'./assets/brand-logos/orvane-sage.svg'},
        {bg:'#834629',label:'Sauge sur terre',src:'./assets/brand-logos/orvane-sage.svg'},
        {bg:'#E7DBCD',label:'Noir sur pierre',src:'./assets/brand-logos/orvane-black.svg'},
        {bg:'#525A43',label:'Terracotta sur olive',src:'./assets/brand-logos/orvane-terracotta.svg'}
      ],
      typefaces:[['Agraham','Signature'],['Helvetica Light','Texte']],
      briefTitle:'Faire cohabiter le végétal et le précieux.',
      briefText:'Orvane est un concept personnel de maison de bijoux. Son identité doit évoquer une maison haut de gamme, tout en gardant une chaleur naturelle grâce aux verts, aux tons de terre et aux reflets ambrés.',
      responseTitle:'Un signe fin, posé sur des matières chaudes.',
      responseText:'Le grand O donne au nom sa silhouette distinctive. Les versions olive, sauge, terracotta et sombre adaptent le signe aux écrins, aux sacs et aux supports de marque. Les mockups réunis montrent comment la palette se comporte avec le papier, le bijou et l’espace.',
      principles:[['01 / SIGNATURE','Le O comme emblème','Le O ample et contrasté agit comme un signe autonome autant que comme la première lettre du nom.'],['02 / MATIÈRE','Sauge et terre cuite','Le vert évoque le végétal ; la terracotta et l’ambre réchauffent les supports et les métaux.'],['03 / VARIANTES','Une marque, plusieurs accords','Les versions claires, sombres et colorées donnent de la souplesse sans changer la forme du logo.']],
      variantsNote:'Ici, les versions sont de vraies variantes vectorielles du logo : le O et le mot-symbole gardent leurs proportions, seule la couleur change.',
      paletteNote:'Les verts forment la base végétale ; pierre, terracotta et ambre apportent les contrastes nécessaires aux emballages et aux images.',
      applicationNote:'La sélection rassemble les mockups disponibles : deux sacs, un écrin, des vues de bagues et un espace boutique. Les formats d’origine sont conservés dans la mosaïque.',
      typefaceNote:'Agraham est relevée pour la signature et Helvetica Light pour les textes. Les échantillons sont des remplacements visuels temporaires, pas les fontes originales.',
      role:'Identité visuelle / Direction artistique', year:'2026',
      intro:'Une maison de joaillerie fictive, entre nature, matière et éclat. ORVANE cherche une présence luxueuse, mais douce et chaleureuse.',
      storyTitle:'Le luxe, avec de la matière.',
      story:'Une palette de verts sauge et olive, de terracotta et d’ambre accompagne un logotype fin et contrasté. Les mises en situation prolongent cette tension entre le végétal et le brillant, sans perdre le calme d’un univers minimaliste.',
      images:[
        ['./Orvane/Sac%20ORVANE%20vert%20sauge.png','Sac boutique / papier sauge et lumière ambrée'],
        ['./Orvane/ChatGPT%20Image%2026%20ao%C3%BBt%202026,%2011_00_30%201.png','Packaging / sac en papier texturé'],
        ['./Orvane/%C3%89crin%20de%20luxe%20ORVANE%20sous%20la%20lumi%C3%A8re%20chaude.png','Écrin / boîte de joaillerie'],
        ['./Orvane/Bague%20dor%C3%A9e%20dans%20une%20lumi%C3%A8re%20chaleureuse.png','Collection / série de bagues'],
        ['./Orvane/image%20d4.png','Détail matière / anneau doré'],
        ['./Orvane/Boutique%20de%20joyer%C3%ADa%20Orvane%20en%20luz%20dorada.png','Espace de marque / boutique']
      ]
    },
    novae: {
      number:'03', title:'NOVAE', italic:'IN-EAR 2K', logo:'./NOVAE/NOVAE%20logo%20.png', label:'PROJET RÉEL · AUDIO', kind:'Projet réel',
      coverTitle:'LE SON', coverItalic:'EN CHROME', coverBg:'#FFFFFF', coverInk:'#0A0A0A', coverAccent:'#0A0A0A',
      palette:[['#FFFFFF','Blanc','Espace'],['#C8F3FF','Glacier','Accent froid'],['#D9D9D9','Argent','Reflet doux'],['#B8B8B8','Chrome','Matière'],['#0A0A0A','Noir','Contraste']],
      variants:[
        {bg:'#B8B8B8',label:'Symbole chrome / fond argent',src:'./NOVAE/LOGO.png',treatment:'original'},
        {bg:'#FFFFFF',label:'Symbole chrome / fond blanc',src:'./NOVAE/LOGO.png',treatment:'original'},
        {bg:'#D9D9D9',label:'Symbole chrome / fond gris',src:'./NOVAE/LOGO.png',treatment:'original'},
        {bg:'#0A0A0A',label:'Symbole chrome / fond noir',src:'./NOVAE/LOGO.png',treatment:'original'}
      ],
      typefaces:[['Bagasine Antique','Logotype'],['Neue Haas Grotesk','Texte'],['Afacad','Secondaire']],
      briefTitle:'Faire du détail produit le signe de la marque.',
      briefText:'Novae est une marque réelle d’écouteurs intra-auriculaires chromés. Le matériau et la silhouette de l’écouteur sont les repères distinctifs fournis pour construire l’identité.',
      responseTitle:'L’écouteur devient le O de Novae.',
      responseText:'Le logotype associe une typographie à empattements fins à un élément chromé qui remplace le O. Le noir et les gris installent un registre technologique retenu ; le bleu glacier apporte un contraste plus lumineux. Les mockups produit préparés précédemment ont été écartés : cette étude montre les éléments de marque disponibles, sans leur substituer des rendus non validés.',
      principles:[['01 / SYMBOLE','Le O devient produit','Le signe circulaire de l’écouteur s’intègre au mot-symbole et reste identifiable seul.'],['02 / MATIÈRE','Chrome, gris, glace','La gamme froide soutient l’idée de précision et fait ressortir le détail métallique.'],['03 / PÉRIMÈTRE','Identité avant mockup','Les pages présentent le logo, son signe et le système couleur ; aucun rendu produit inventé n’est ajouté.']],
      variantsNote:'Cette planche montre uniquement le symbole chrome autonome fourni, sur plusieurs fonds de la palette. Le mot-symbole complet reste visible dans l’ouverture de l’étude.',
      paletteNote:'La gamme va du blanc au noir, avec le bleu glacier comme accent. Les deux gris matérialisent l’univers chrome sans ajouter de couleurs étrangères à la planche.',
      applicationNote:'Les éléments fournis permettent de documenter le mot-symbole, le signe autonome et la palette. Les mockups produits rapides ont été laissés de côté.',
      typefaceNote:'Bagasine Antique, Neue Haas Grotesk et Afacad sont les noms indiqués sur ta planche. Les échantillons emploient des fontes de remplacement tant que tu ne souhaites pas fournir les fichiers.',
      role:'Identité visuelle / Concept produit', year:'2026',
      intro:'Une identité minimaliste créée pour Novae, une marque d’écouteurs intra-auriculaires chromés, et son produit In-Ear 2K.',
      storyTitle:'Le chrome comme signature.',
      story:'Le logotype place l’écouteur au cœur du nom : sa silhouette devient le O de Novae. Le noir, les gris et le bleu glacier installent un univers précis et minimaliste. Cette étude présente la direction visuelle et les éléments de marque fournis.',
      images:[
        ['./NOVAE/LOGO%20simple%20NOVAE%20.png','Signe de marque / écouteur chromé'],
        ['./NOVAE/Colorpalette.png','Système couleur / noir, chrome et bleu glacier']
      ]
    },
    audace: {
      number:'04', title:'AUDACE', italic:'ÉDUCATION', logo:'./Audace/Audace%20logo.png', label:'BRIEF RÉEL · PISTE NON RETENUE', kind:'Proposition non retenue',
      coverTitle:'APPRENDRE', coverItalic:'EN MOUVEMENT', coverBg:'#F2EEE7', coverInk:'#111111', coverAccent:'#E65A24',
      palette:[['#777873','Gris','Fond neutre'],['#E65A24','Orange','Accent principal'],['#F2EEE7','Craie','Fond clair'],['#111111','Noir','Contraste']],
      variantsAsset:'./Audace/Palette%20color%20.png',
      variants:[],
      typefaces:[['Sélection à définir','Direction typographique']],
      briefTitle:'Une piste de direction artistique pour l’accompagnement.',
      briefText:'Audace est une proposition réalisée pour un brief réel autour de l’éducation et de l’accompagnement. Cette direction n’a pas été retenue ; elle est présentée comme une exploration et non comme l’identité finale du projet.',
      responseTitle:'Exprimer l’élan par la lumière et le mouvement.',
      responseText:'L’orange, le noir et le gris créent une tension énergique. Le flou, le grain et les silhouettes en mouvement donnent à l’ensemble une impression de progression. Les versions de logo sont montrées avec la planche d’origine afin de préserver les accords de couleur conçus.',
      principles:[['01 / INTENTION','L’apprentissage en action','La direction cherche à représenter le passage à l’action plutôt qu’un univers scolaire conventionnel.'],['02 / IMAGE','Flou, grain, énergie','Les effets de mouvement donnent une présence plus vive aux visuels et suggèrent un parcours qui avance.'],['03 / STATUT','Une piste non retenue','Les images documentent une proposition alternative, pas une identité adoptée par le projet.']],
      variantsNote:'La planche d’origine est affichée telle quelle pour conserver les quatre accords couleur conçus et les proportions exactes du logotype.',
      paletteNote:'Le gris et le noir structurent le système ; l’orange le rend immédiatement reconnaissable ; la craie ouvre les compositions.',
      applicationNote:'Les deux compositions montrent la direction en mouvement, avec son grain et ses contrastes. La planche de logos est conservée dans la section des déclinaisons.',
      typefaceNote:'Aucune famille de caractères n’avait été retenue pour cette piste. Le spécimen reste donc un espace de repère, sans attribution de police.',
      role:'Direction artistique / Identité visuelle', year:'2026',
      intro:'Une proposition de direction artistique pour un projet réel dans le secteur de l’éducation et de l’accompagnement. La piste n’a finalement pas été retenue.',
      storyTitle:'Le mouvement comme énergie.',
      story:'L’univers s’appuie sur une palette orange, noire et grise, un logotype expressif et des images volontairement floues, granuleuses et en mouvement. La direction cherchait à évoquer l’élan, le passage à l’action et l’énergie d’un apprentissage qui avance.',
      images:[
        ['./Audace/Group%20101.png','Étude graphique / mouvement et flou'],
        ['./Audace/Group%20100.png','Piste visuelle / contraste orange et noir']
      ]
    }
  };

  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert=!open;
    menuOpen.setAttribute('aria-expanded', String(open));
    body.classList.toggle('locked', open);
  };
  menuOpen.addEventListener('click', () => setMenu(menuOpen.getAttribute('aria-expanded') !== 'true'));
  menuClose.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('[data-menu-link]').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenu(false);
      if (dialog.open) dialog.close();
    }
  });

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(finePointer&&cursorOverlay&&cursorOverlay.showPopover){
    try{
      cursorOverlay.showPopover();
      body.classList.add('has-custom-cursor');
      window.addEventListener('pointermove',event=>{
        cursorDot.style.left=`${event.clientX}px`;cursorDot.style.top=`${event.clientY}px`;
        cursorRing.style.left=`${event.clientX}px`;cursorRing.style.top=`${event.clientY}px`;
      },{passive:true});
      const updateCursorHover=target=>{
        const interactive=target?.closest('a,button,[data-cursor-hover],.project-shelf [data-project],.case-cover-carousel,.logo-variant,.logo-variants-source,.palette-swatch,.type-sample,.type-hierarchy>div,.case-principle,.case-brand-logo');
        body.classList.toggle('cursor-hover',!!interactive);
        if(interactive)cursorRing.querySelector('i').textContent=interactive.matches('.case-cover-carousel')?'GLISSER':interactive.matches('.project-shelf [data-project]')?'OUVRIR':'VOIR';
      };
      document.addEventListener('pointerover',event=>updateCursorHover(event.target));
      document.addEventListener('pointerout',event=>{if(!event.relatedTarget||!event.target.contains(event.relatedTarget))updateCursorHover(event.relatedTarget)});
    }catch{}
  }
  document.querySelectorAll('.magnetic').forEach((element) => {
    if(!finePointer)return;
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${dx * .12}px,${dy * .14}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal,.project-heading,.approach-head').forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });

  const openCase = (key) => {
    const item = cases[key];
    if (!item) return;
    clearInterval(caseCarouselTimer);
    caseAnimationContext?.revert();
    caseAnimationContext = null;
    const caseKeys=Object.keys(cases);
    const nextKey=caseKeys[(caseKeys.indexOf(key)+1)%caseKeys.length];
    const nextCase=cases[nextKey];
    const slides = item.images.map(([src,caption],index)=>`<figure class="case-slide ${index===0?'is-active':''}" data-case-slide="${index}" aria-hidden="${index!==0}"><img src="${src}" alt="${caption}" loading="${index===0?'eager':'lazy'}"></figure>`).join('');
    const variants=item.variants.map((variant)=>`<article class="logo-variant" style="--variant-bg:${variant.bg}"><div class="logo-variant-art"><img src="${variant.src}" class="logo-variant-image treatment-${variant.treatment||'original'}" alt="Logo ${item.title}, version ${variant.label}" loading="lazy"></div><p>${variant.label}</p></article>`).join('');
    const variantsBoard=item.variantsAsset?`<figure class="logo-variants-source"><img src="${item.variantsAsset}" alt="Planche d’origine des déclinaisons du logo Audace" loading="lazy"></figure>`:variants;
    const palette = item.palette.map(([hex,name,role])=>{
      const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
      const ink=(rgb[0]*.299+rgb[1]*.587+rgb[2]*.114)>155?'#1b1515':'#f4f0eb';
      return `<div class="palette-swatch" style="--swatch:${hex};--swatch-ink:${ink}"><span>${name}</span><small>${hex}</small><em>${role}</em></div>`;
    }).join('');
    const typefaces=item.typefaces.map(([name,role],index)=>`<article class="type-sample type-sample-${index+1}"><span>0${index+1} / ${role}</span><strong>${index===0?'Aa':'aB'} <i>0123</i></strong><small>${name}</small><p>${index===0?'Porte la voix et la personnalité de la marque.':index===1?'Assure la lecture des informations et des textes courants.':'Apporte un accent distinctif aux détails et aux prises de parole.'}</p></article>`).join('');
    const principles=item.principles.map(([label,title,text])=>`<article class="case-principle"><span>${label}</span><h4>${title}</h4><p>${text}</p></article>`).join('');
    dialogContent.innerHTML = `
      <div class="dialog-kicker"><span>ÉTUDE DE CAS / ${item.number}</span><span>${item.label}</span></div>
      <header class="case-cover tone-${key}" style="--cover-bg:${item.coverBg};--cover-ink:${item.coverInk};--cover-accent:${item.coverAccent}">
        <div class="case-cover-layout"><div class="case-cover-copy">
          <div class="case-brand"><span class="case-brand-logo tone-${key}"><img src="${item.logo}" alt="Logo ${item.title}"></span><span class="case-brand-index">VISUAL IDENTITY / ${item.number}</span></div>
          <h2 class="dialog-title" id="dialogTitle">${item.coverTitle}<br><em>${item.coverItalic}</em></h2>
          <p class="dialog-lede">${item.intro}</p>
          <div class="dialog-meta"><span><b>STATUT</b>${item.kind}</span><span><b>RÔLE</b>${item.role}</span><span><b>ANNÉE</b>${item.year}</span></div>
        </div><div class="case-cover-carousel" data-case-carousel aria-label="Visuels de ${item.title}">
          <div class="case-carousel-stage">${slides}</div><div class="case-carousel-controls"><div class="case-carousel-progress">${item.images.map((_,i)=>`<button type="button" class="carousel-progress ${i===0?'is-active':''}" data-carousel-go="${i}" aria-label="Afficher le visuel ${i+1}" aria-pressed="${i===0}"><i></i></button>`).join('')}</div><div class="case-carousel-arrows"><button type="button" data-carousel-prev aria-label="Visuel précédent">←</button><span>GLISSER / EXPLORER</span><button type="button" data-carousel-next aria-label="Visuel suivant">→</button></div></div>
        </div></div>
      </header>
      <section class="case-section case-brief"><div class="case-section-label"><span>01 / LE POINT DE DÉPART</span><span>BRIEF & INTENTION</span></div><div class="case-explainer"><h3>${item.briefTitle}</h3><p>${item.briefText}</p></div><div class="case-principles">${principles}</div></section>
      <section class="case-section case-variations"><div class="case-section-label"><span>02 / DÉCLINAISONS DU LOGO</span><span>${item.variantsAsset?'PLANCHE ORIGINALE':`${item.variants.length} VERSIONS`}</span></div><div class="logo-variation-board ${item.variantsAsset?'is-source-board':''}">${variantsBoard}</div><p class="case-section-note">${item.variantsNote}</p></section>
      <section class="case-section case-palette" aria-label="Palette de couleurs"><div class="case-section-label"><span>03 / SYSTÈME COULEUR</span><span>${item.palette.length} TEINTES</span></div><p class="case-section-note">${item.paletteNote}</p><div class="palette-grid">${palette}</div></section>
      <section class="case-section case-typography tone-${key}"><div class="case-section-label"><span>04 / SYSTÈME TYPOGRAPHIQUE</span><span>FAMILLES & HIÉRARCHIE</span></div><p class="case-section-note">${item.typefaceNote}</p><div class="typeface-board">${typefaces}</div><div class="type-hierarchy"><div><small>ÉCHELLE DE LECTURE / 01</small><strong>Une idée forte.</strong><span>TITRE / ACCROCHE</span></div><div><small>ÉCHELLE DE LECTURE / 02</small><b>Une phrase qui précise l’intention et guide le regard.</b><span>SOUS-TITRE / INFORMATION</span></div><div><small>ÉCHELLE DE LECTURE / 03</small><p>Un texte courant reste confortable à lire, même lorsque la composition joue avec la couleur, le contraste et les grands formats.</p><span>TEXTE / LÉGENDE</span></div></div></section>
      <section class="case-section case-response"><div class="case-section-label"><span>05 / LA RÉPONSE VISUELLE</span><span>INTENTION → FORME</span></div><div class="case-explainer"><h3>${item.responseTitle}</h3><p>${item.responseText}</p></div></section>
      <div class="dialog-story"><h3>${item.storyTitle}</h3><p>${item.story}</p></div>
      <div class="dialog-footer"><span>VICTØR® / ${item.number}</span><button class="next-case" type="button" data-next-case="${nextKey}">SUIVANT / ${nextCase.title} ↓</button></div>`;
    if(!dialog.open)dialog.showModal();
    else dialog.scrollTop=0;
    bringCursorToFront();
    dialogContent.querySelectorAll('.case-cover,.case-section,.dialog-story,.dialog-footer').forEach((element)=>{
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
    if(window.gsap&&window.ScrollTrigger&&!reducedMotion){
      caseAnimationContext=gsap.context(()=>{
        gsap.fromTo('.case-cover .case-brand-logo',{y:26,opacity:0,filter:'blur(12px)'},{y:0,opacity:1,filter:'blur(0px)',duration:.85,ease:'power3.out',clearProps:'transform,filter,opacity'});
        gsap.fromTo('.case-cover .dialog-title',{y:54,opacity:0,clipPath:'inset(20% 0 0 0)'},{y:0,opacity:1,clipPath:'inset(0% 0 0 0)',duration:1,ease:'power4.out',delay:.08});
        gsap.utils.toArray('.case-section').forEach((section)=>{
          const label=section.querySelector('.case-section-label');
          const pieces=section.querySelectorAll('.case-explainer,.case-principle,.logo-variant,.logo-variants-source,.palette-swatch,.type-sample,.type-hierarchy>div');
          if(label)gsap.fromTo(label,{x:-28,opacity:0},{x:0,opacity:1,duration:.6,ease:'power2.out',scrollTrigger:{trigger:section,scroller:dialog,start:'top 82%',once:true}});
          if(pieces.length)gsap.fromTo(pieces,{y:34,opacity:0,scale:.97,filter:'blur(5px)'},{y:0,opacity:1,scale:1,filter:'blur(0px)',duration:.72,stagger:.075,ease:'power3.out',clearProps:'transform,filter,opacity',scrollTrigger:{trigger:section,scroller:dialog,start:'top 78%',once:true}});
        });
        gsap.fromTo('.palette-swatch',{scaleX:.82,transformOrigin:'left center'},{scaleX:1,duration:.8,stagger:.08,ease:'power3.out',clearProps:'transform',scrollTrigger:{trigger:'.case-palette',scroller:dialog,start:'top 78%',once:true}});
      },dialogContent);
      requestAnimationFrame(()=>ScrollTrigger.refresh());
    }
    const carousel=dialogContent.querySelector('[data-case-carousel]');
    if(carousel){
      const slideEls=[...carousel.querySelectorAll('[data-case-slide]')];
      const progressEls=[...carousel.querySelectorAll('[data-carousel-go]')];
      let activeSlide=0;
      const showSlide=(index)=>{
        activeSlide=(index+slideEls.length)%slideEls.length;
        slideEls.forEach((slide,i)=>{slide.classList.toggle('is-active',i===activeSlide);slide.setAttribute('aria-hidden',String(i!==activeSlide))});
        progressEls.forEach((button,i)=>{button.classList.toggle('is-active',i===activeSlide);button.classList.toggle('is-passed',i<activeSlide);button.setAttribute('aria-pressed',String(i===activeSlide))});
      };
      const startCarousel=()=>{clearInterval(caseCarouselTimer);if(slideEls.length>1&&!reducedMotion)caseCarouselTimer=setInterval(()=>showSlide(activeSlide+1),5200)};
      carousel.querySelector('[data-carousel-prev]').addEventListener('click',()=>{showSlide(activeSlide-1);startCarousel()});
      carousel.querySelector('[data-carousel-next]').addEventListener('click',()=>{showSlide(activeSlide+1);startCarousel()});
      progressEls.forEach(button=>button.addEventListener('click',()=>{showSlide(Number(button.dataset.carouselGo));startCarousel()}));
      carousel.addEventListener('pointerenter',()=>clearInterval(caseCarouselTimer));
      carousel.addEventListener('pointerleave',startCarousel);
      carousel.addEventListener('focusin',()=>clearInterval(caseCarouselTimer));
      carousel.addEventListener('focusout',event=>{if(!carousel.contains(event.relatedTarget))startCarousel()});
      let swipeStart=null;
      carousel.addEventListener('pointerdown',event=>{swipeStart=event.clientX});
      carousel.addEventListener('pointerup',event=>{if(swipeStart===null)return;const delta=event.clientX-swipeStart;swipeStart=null;if(Math.abs(delta)>45){showSlide(activeSlide+(delta<0?1:-1));startCarousel()}});
      startCarousel();
    }
    dialogContent.querySelector('[data-next-case]').addEventListener('click',()=>{
      if(window.gsap&&!reducedMotion)gsap.to(dialogContent,{opacity:0,y:18,duration:.18,ease:'power2.in',onComplete:()=>{openCase(nextKey);gsap.fromTo(dialogContent,{opacity:0,y:18},{opacity:1,y:0,duration:.38,ease:'power3.out'})}});
      else openCase(nextKey);
    });
    body.classList.add('locked');
  };
  document.querySelectorAll('.project-shelf [data-project]').forEach((book)=>{
    book.addEventListener('click',()=>openCase(book.dataset.project));
    book.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();openCase(book.dataset.project)}
    });
  });
  const closeCase = ()=>{clearInterval(caseCarouselTimer);if(dialog.open)dialog.close();body.classList.toggle('locked',menu.classList.contains('open'))};
  document.getElementById('dialogClose').addEventListener('click',closeCase);
  dialog.addEventListener('close',()=>{clearInterval(caseCarouselTimer);body.classList.toggle('locked',menu.classList.contains('open'))});

  const steps = [
    {number:'01',title:'D’abord,<br>la bonne question.',text:'Un échange pour comprendre le produit, la personne à qui il s’adresse et l’émotion que la marque doit laisser.',tag:'ÉCHANGE / ÉCOUTE / INTENTION',tone:'citric'},
    {number:'02',title:'Trouver le ton.<br>Poser le décor.',text:'Les références deviennent un moodboard. On le valide ensemble avant d’explorer les premières pistes visuelles.',tag:'RECHERCHE / MOODBOARD / ALIGNEMENT',tone:'pink'},
    {number:'03',title:'Explorer les pistes.<br>Faire des choix.',text:'Plusieurs directions sont mises en situation. On compare les intentions et les usages pour choisir la plus juste.',tag:'LOGOS / PALETTES / MOCKUPS',tone:'aqua'},
    {number:'04',title:'Affiner ensemble.<br>Faire exister.',text:'Les retours font avancer la piste retenue : variations, ajustements, puis une identité prête à vivre sur ses supports.',tag:'CO-CRÉATION / RETOURS / LIVRAISON',tone:'orange'}
  ];
  const processPanel=document.getElementById('processPanel');
  const selectStep=(index)=>{
    const next=Math.max(0,Math.min(steps.length-1,Number(index)));
    if(next===processStepIndex&&processPanel.dataset.tone){
      document.querySelectorAll('.process-step').forEach((button,i)=>{
        const active=i===next;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));
      });
      return;
    }
    processStepIndex=next;
    const step=steps[next];
    document.getElementById('processNumber').textContent=step.number;
    document.getElementById('processTitle').innerHTML=step.title;
    document.getElementById('processText').textContent=step.text;
    document.getElementById('processTag').textContent=step.tag;
    processPanel.dataset.tone=step.tone;
    processPanel.classList.remove('step-changing');
    void processPanel.offsetWidth;
    processPanel.classList.add('step-changing');
    clearTimeout(processPanel._stepChangeTimer);
    processPanel._stepChangeTimer=setTimeout(()=>processPanel.classList.remove('step-changing'),700);
    document.querySelectorAll('.process-step').forEach((button,i)=>{
      const active=i===next;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));
    });
  };
  const scrollToProcessStep=(index)=>{
    selectStep(index);
    if(!processTrigger)return;
    const last=Math.max(1,steps.length-1);
    const target=processTrigger.start+(processTrigger.end-processTrigger.start)*(index/last);
    if(lenisInstance)lenisInstance.scrollTo(target,{duration:.45,easing:t=>1-Math.pow(1-t,3)});
    else window.scrollTo({top:target,behavior:reducedMotion?'auto':'smooth'});
  };
  document.querySelectorAll('.process-step').forEach((button)=>{
    button.addEventListener('click',()=>scrollToProcessStep(Number(button.dataset.step)));
    button.addEventListener('keydown',(event)=>{
      if(event.key==='ArrowDown'||event.key==='ArrowRight'){event.preventDefault();document.querySelector(`.process-step[data-step="${(Number(button.dataset.step)+1)%steps.length}"]`).focus()}
      if(event.key==='ArrowUp'||event.key==='ArrowLeft'){event.preventDefault();document.querySelector(`.process-step[data-step="${(Number(button.dataset.step)+steps.length-1)%steps.length}"]`).focus()}
    });
  });
  selectStep(0);

  document.querySelectorAll('a[href^="#"]').forEach((link)=>link.addEventListener('click',(event)=>{
    const destination=document.querySelector(link.getAttribute('href'));
    if(destination){event.preventDefault();destination.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'})}
  }));

  const legalDialog=document.getElementById('legalDialog');
  const legalContent=document.getElementById('legalContent');
  const legalCopy={
    mentions:`<p class="legal-kicker">INFORMATIONS / AVANT MISE EN LIGNE</p><h2 id="legalTitle">MENTIONS<br><i>LÉGALES.</i></h2><p class="legal-intro">Cette page est une trame à compléter avec les informations exactes de l’éditeur et de l’hébergeur avant la mise en ligne.</p><div class="legal-grid"><span>ÉDITEUR DU SITE</span><b>Nom / prénom ou dénomination : à compléter</b><b>Statut : à compléter</b><b>Adresse professionnelle : à compléter</b><b>E-mail de contact : à compléter</b><b>Immatriculation / SIRET : à compléter si applicable</b><span>HÉBERGEUR</span><b>Nom et coordonnées de l’hébergeur : à compléter</b><span>RESPONSABLE DE PUBLICATION</span><b>À compléter</b></div><p class="legal-footnote">Les mentions obligatoires dépendent du statut de l’éditeur. Remplace chaque champ avant publication.</p>`,
    privacy:`<p class="legal-kicker">INFORMATIONS / DONNÉES PERSONNELLES</p><h2 id="legalTitle">VIE<br><i>PRIVÉE.</i></h2><p class="legal-intro">Le site ne propose pas de formulaire, de compte utilisateur ni d’outil de mesure d’audience. Aucun cookie publicitaire ou analytique n’est installé par son code.</p><div class="legal-grid"><span>CONTACT</span><b>Pour toute demande relative aux données personnelles : adresse de contact à renseigner.</b><span>CONTENUS EXTERNES</span><b>Les polices sont demandées à Google Fonts ; GSAP et ScrollTrigger à jsDelivr ; Lenis à unpkg. Le navigateur contacte ces services pour charger les fichiers. Ces ressources pourront être hébergées sur le même domaine.</b><span>MISE À JOUR</span><b>Cette information doit correspondre aux services réellement utilisés sur le site publié.</b></div>`,
    terms:`<p class="legal-kicker">INFORMATIONS / CONDITIONS D’UTILISATION</p><h2 id="legalTitle">CONDITIONS<br><i>D’UTILISATION.</i></h2><p class="legal-intro">Le site présente le travail et les projets de VICTØR à titre informatif. L’accès au site suppose le respect des droits de propriété intellectuelle associés aux textes, identités et visuels présentés.</p><div class="legal-grid"><span>PROJETS PRÉSENTÉS</span><b>Kyzuna Café et Orvane sont des concepts personnels. Novae est un projet réel. Audace est une proposition de direction artistique réalisée pour un brief réel, mais non retenue.</b><span>PROPRIÉTÉ INTELLECTUELLE</span><b>Les créations restent la propriété de leurs ayants droit respectifs. Toute reproduction ou réutilisation nécessite l’autorisation préalable des titulaires.</b><span>ÉDITEUR</span><b>Identité et coordonnées de l’éditeur à compléter dans les mentions légales avant publication.</b></div>`
  };
  document.querySelectorAll('[data-legal-open]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();legalContent.innerHTML=legalCopy[link.dataset.legalOpen]||legalCopy.mentions;legalDialog.showModal();bringCursorToFront();
  }));
  document.querySelectorAll('[data-legal-open]').forEach(link=>link.addEventListener('click',()=>body.classList.add('locked')));
  document.getElementById('legalClose').addEventListener('click',()=>legalDialog.close());
  legalDialog.addEventListener('click',event=>{if(event.target===legalDialog)legalDialog.close()});
  legalDialog.addEventListener('close',()=>body.classList.toggle('locked',menu.classList.contains('open')||dialog.open));

  if(window.gsap&&window.ScrollTrigger&&!reducedMotion){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.offers,.manifesto,.about,.contact').forEach((panel)=>gsap.fromTo(panel,
      {scaleX:.94,scaleY:.97,borderRadius:'48px'},
      {scaleX:1,scaleY:1,borderRadius:'0px',ease:'none',scrollTrigger:{trigger:panel,start:'top bottom',end:'top 18%',scrub:.7}}
    ));
    gsap.utils.toArray('.section-overline,.heading-layout h2,.heading-layout>p').forEach((el)=>gsap.fromTo(el,
      {y:38,opacity:0,filter:'blur(8px)'},{y:0,opacity:1,filter:'blur(0px)',duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}
    ));
    const headerOffset=()=>Math.round((document.querySelector('.site-header')?.offsetHeight||76)+12);
    processTrigger=ScrollTrigger.create({
      trigger:'.process-layout',
      start:()=>`top ${headerOffset()}px`,
      end:()=>`+=${Math.round(window.innerHeight*1.35)}`,
      pin:true,
      pinSpacing:true,
      pinType:'fixed',
      anticipatePin:1,
      invalidateOnRefresh:true,
      onUpdate:self=>selectStep(Math.round(self.progress*(steps.length-1)))
    });
    gsap.fromTo('.manifesto>p',{xPercent:-9,scaleX:.86},{xPercent:0,scaleX:1,ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:.65}});
    // The SVG books animate in with CSS so their hover lift remains independent of scroll transforms.
    gsap.fromTo('.project-shelf',{y:34,opacity:0,filter:'blur(5px)'},{y:0,opacity:1,filter:'blur(0px)',duration:.82,ease:'power3.out',clearProps:'transform,filter,opacity',scrollTrigger:{trigger:'.project-shelf',start:'top 84%',once:true}});
    gsap.utils.toArray('.offer-card').forEach((card)=>gsap.fromTo(card.children,
      {y:20,opacity:0},{y:0,opacity:1,stagger:.055,duration:.62,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 88%',once:true}}
    ));
    document.querySelectorAll('.project-shelf [data-project]').forEach(book=>book.addEventListener('click',()=>{
      gsap.fromTo(dialog,{clipPath:'inset(48% 0 48% 0)',scale:.97,opacity:.6},{clipPath:'inset(0% 0 0% 0)',scale:1,opacity:1,duration:.62,ease:'power4.inOut'});
    }));
  }

  if(window.Lenis){
    const linked=!!(window.gsap&&window.ScrollTrigger&&!reducedMotion);
    lenisInstance=new Lenis({autoRaf:!linked,allowNestedScroll:true,anchors:false,stopInertiaOnNavigate:true,respectReducedMotion:true});
    if(linked){
      lenisInstance.on('scroll',ScrollTrigger.update);
      gsap.ticker.add(time=>lenisInstance.raf(time*1000));
      gsap.ticker.lagSmoothing(0);
    }
    const syncScrollLock=()=>body.classList.contains('locked')?lenisInstance.stop():lenisInstance.start();
    new MutationObserver(syncScrollLock).observe(body,{attributes:true,attributeFilter:['class']});
    syncScrollLock();
  }

})();
