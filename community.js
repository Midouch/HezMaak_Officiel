/* =====================================================
   HEZ MAAK — COMMUNITY fdfdfdf
   1) Apertura di un annuncio dalle notifiche e da link diretti
   2) Condivisione su social e gruppi Facebook
   3) Benvenuto dell'admin ai nuovi iscritti
   Richiede app.js (supabaseClient, currentUser, currentLanguage,
   tripCard, requestCard, cityName, countryFlag, escapeHtml,
   openAuth, openMessages, closeNotificationsPanel).
   Per il benvenuto serve lo script supabase_benvenuto.sql.
===================================================== */

(function () {

  "use strict";

  /* ---------------------------------------------------
     TESTI  [it, en, fr, tn]
  --------------------------------------------------- */

  const D = {

    close: ["Chiudi", "Close", "Fermer", "سكّر"],
    seeAll: ["Vedi tutti gli annunci", "See all posts", "Voir toutes les annonces", "شوف كل الإعلانات"],
    postGone: ["Questo annuncio non è più disponibile.", "This post is no longer available.", "Cette annonce n'est plus disponible.", "الإعلان هذا ما عادش موجود."],
    postInactive: ["Questo annuncio non è più attivo.", "This post is no longer active.", "Cette annonce n'est plus active.", "الإعلان هذا ما عادش نشيط."],
    postLoading: ["Caricamento…", "Loading…", "Chargement…", "تحميل…"],

    shareTitle: ["Condividi l'annuncio", "Share this post", "Partager l'annonce", "شارك الإعلان"],
    sharePublished: [
      "✅ Annuncio pubblicato! Condividilo per essere trovato più in fretta.",
      "✅ Posted! Share it to be found faster.",
      "✅ Annonce publiée ! Partagez-la pour être trouvé plus vite.",
      "✅ الإعلان تنشر! شاركو باش يلقاوك أسرع."
    ],
    shareHint: ["Puoi modificare il testo prima di condividere.", "You can edit the text before sharing.", "Vous pouvez modifier le texte avant de partager.", "تنجم تبدّل النص قبل ما تشارك."],
    shareGroups: [
      "Per i gruppi Facebook: premi Facebook e scegli «Condividi in un gruppo», oppure copia il testo e incollalo nel gruppo. Per Instagram copia il link e usalo nella bio o in una Storia.",
      "For Facebook groups: tap Facebook and choose “Share to a group”, or copy the text and paste it into the group. For Instagram, copy the link and use it in your bio or a Story.",
      "Pour les groupes Facebook : appuyez sur Facebook et choisissez « Partager dans un groupe », ou copiez le texte et collez-le dans le groupe. Pour Instagram, copiez le lien et utilisez-le dans votre bio ou une Story.",
      "للقروبات في فيسبوك: اضغط فيسبوك واختار «شارك في مجموعة»، ولا انسخ النص والصقو في القروب. في إنستغرام انسخ الرابط واستعملو في البيو ولا في ستوري."
    ],
    shFb: ["Facebook", "Facebook", "Facebook", "فيسبوك"],
    shWa: ["WhatsApp", "WhatsApp", "WhatsApp", "واتساب"],
    shTg: ["Telegram", "Telegram", "Telegram", "تلغرام"],
    shX: ["X", "X", "X", "X"],
    shMail: ["Email", "Email", "Email", "إيميل"],
    shCopyText: ["Copia testo e link", "Copy text and link", "Copier le texte et le lien", "انسخ النص والرابط"],
    shCopyLink: ["Copia link", "Copy link", "Copier le lien", "انسخ الرابط"],
    shMore: ["Altre app…", "More apps…", "Autres applis…", "تطبيقات أخرى…"],
    copied: ["Copiato!", "Copied!", "Copié !", "تنسخ!"],

    txtTrip: [
      "✈️ Viaggio {from} → {to} il {date}: {kg} kg disponibili{price}. Contattami su Hez Maak:",
      "✈️ Trip {from} → {to} on {date}: {kg} kg available{price}. Contact me on Hez Maak:",
      "✈️ Voyage {from} → {to} le {date} : {kg} kg disponibles{price}. Contactez-moi sur Hez Maak :",
      "✈️ سفرة {from} → {to} في {date}: {kg} كغ متوفرين{price}. اتصل بيا في هزّ معاك:"
    ],
    txtPrice: [" ({p} €/kg)", " (€{p}/kg)", " ({p} €/kg)", " ({p} €/كغ)"],
    txtRequest: [
      "📦 Cerco qualcuno per {from} → {to} entro il {date}{item}. Scrivimi su Hez Maak:",
      "📦 Looking for someone to carry something {from} → {to} by {date}{item}. Write to me on Hez Maak:",
      "📦 Je cherche quelqu'un pour {from} → {to} avant le {date}{item}. Écrivez-moi sur Hez Maak :",
      "📦 نلوّج على واحد لـ {from} → {to} قبل {date}{item}. اكتبلي في هزّ معاك:"
    ],
    txtItem: [": {i}", ": {i}", " : {i}", ": {i}"],

    // admin: benvenuto
    wTitle: ["Nuovi iscritti da accogliere", "New members to welcome", "Nouveaux inscrits à accueillir", "المنخرطين الجدد للترحيب"],
    wSend: ["👋 Benvenuto", "👋 Welcome", "👋 Bienvenue", "👋 ترحيب"],
    wDone: ["✓ Benvenuto inviato", "✓ Welcome sent", "✓ Bienvenue envoyé", "✓ الترحيب تبعث"],
    wResend: ["Rinvia", "Resend", "Renvoyer", "عاود ابعث"],
    wNone: ["Nessun iscritto recente.", "No recent members.", "Aucun inscrit récent.", "ما فمّاش منخرطين جدد."],
    wModalTitle: ["Dai il benvenuto a {name}", "Welcome {name}", "Souhaiter la bienvenue à {name}", "رحّب بـ {name}"],
    wLang: ["Lingua del messaggio", "Message language", "Langue du message", "لغة الرسالة"],
    wMsg: ["Messaggio", "Message", "Message", "الرسالة"],
    wNote: [
      "Il messaggio arriva nella chat dell'utente e come notifica.",
      "The message arrives in the user's chat and as a notification.",
      "Le message arrive dans le chat de l'utilisateur et en notification.",
      "الرسالة توصل في الشات متاع المستخدم وكإشعار."
    ],
    wSendBtn: ["Invia benvenuto", "Send welcome", "Envoyer", "ابعث الترحيب"],
    wSent: ["Benvenuto inviato!", "Welcome sent!", "Bienvenue envoyé !", "الترحيب تبعث!"],
    wErr: ["Non sono riuscito a inviare. Riprova.", "Couldn't send. Try again.", "Envoi impossible. Réessayez.", "ما نجّمتش نبعث. عاود."],
    wSetup: [
      "Per tenere traccia dei benvenuti esegui lo script supabase_benvenuto.sql su Supabase.",
      "To keep track of welcomes, run the supabase_benvenuto.sql script on Supabase.",
      "Pour suivre les bienvenues, exécutez le script supabase_benvenuto.sql sur Supabase.",
      "باش تتبع الترحيبات شغّل سكريبت supabase_benvenuto.sql في Supabase."
    ],
    wUser: ["Iscritto il {d}", "Joined {d}", "Inscrit le {d}", "انخرط في {d}"]

  };

  const WELCOME_TEXT = [
    "Ciao {name}, benvenuto/a su Hez Maak! 👋 Siamo felici di averti con noi. Se hai domande su come pubblicare un viaggio o una richiesta, scrivici pure qui. Buon viaggio! ✈️",
    "Hi {name}, welcome to Hez Maak! 👋 We're happy to have you. If you have any questions about posting a trip or a request, just write to us here. Safe travels! ✈️",
    "Bonjour {name}, bienvenue sur Hez Maak ! 👋 Nous sommes ravis de vous compter parmi nous. Si vous avez des questions pour publier un voyage ou une demande, écrivez-nous ici. Bon voyage ! ✈️",
    "مرحبا {name}، مرحبا بيك في هزّ معاك! 👋 فرحانين بيك معانا. كان عندك أي سؤال على كيفاش تنشر سفرة ولا طلب، اكتبلنا هنا. سفرة موفقة! ✈️"
  ];

  const WELCOME_TITLE = [
    "👋 Benvenuto su Hez Maak!",
    "👋 Welcome to Hez Maak!",
    "👋 Bienvenue sur Hez Maak !",
    "👋 مرحبا بيك في هزّ معاك!"
  ];

  const LANGS = ["it", "en", "fr", "tn"];
  const LANG_LABEL = { it: "Italiano", en: "English", fr: "Français", tn: "تونسي" };

  const lg = () => {
    const i = LANGS.indexOf(currentLanguage);
    return i >= 0 ? i : 0;
  };

  function P(key, vars) {

    const entry = D[key];

    let text = entry ? (entry[lg()] || entry[0]) : key;

    if (vars) {
      Object.keys(vars).forEach(k => {
        text = text.split("{" + k + "}").join(vars[k]);
      });
    }

    return text;

  }

  const esc = s => escapeHtml(String(s === null || s === undefined ? "" : s));

  const $ = id => document.getElementById(id);

  function locale() {
    return currentLanguage === "fr" ? "fr-FR"
      : currentLanguage === "tn" ? "ar-TN"
      : currentLanguage === "en" ? "en-GB"
      : "it-IT";
  }

  function fmtDate(value) {

    if (!value) return "";

    const d = new Date(String(value).length === 10 ? value + "T12:00:00" : value);

    return isNaN(d) ? "" : d.toLocaleDateString(locale());

  }

  function toast(text) {

    if (typeof showToast === "function") {
      showToast(text);
      return;
    }

    window.alert(text);

  }

  /* ---------------------------------------------------
     1) ANNUNCIO: apertura da notifica o da link diretto
  --------------------------------------------------- */

  const TABLE = { trip: "trips", request: "requests" };

  function postUrl(type, id) {

    const base = location.href.split("#")[0].split("?")[0];

    return base + "#" + type + "-" + id;

  }

  function closeModalById(id) {

    const el = $(id);

    if (el) el.remove();

  }

  function modalShell(id, innerHtml) {

    closeModalById(id);

    const modal = document.createElement("div");

    modal.id = id;
    modal.className = "cm-overlay";
    modal.setAttribute("dir", currentLanguage === "tn" ? "rtl" : "ltr");

    modal.innerHTML = `<div class="cm-box" role="dialog" aria-modal="true">
        <button type="button" class="cm-close" data-cm-close aria-label="${P("close")}">×</button>
        ${innerHtml}
      </div>`;

    modal.addEventListener("click", e => {

      if (e.target === modal || e.target.hasAttribute("data-cm-close")) {
        modal.remove();
      }

    });

    document.body.appendChild(modal);

    return modal;

  }

  async function fetchPost(type, id, withProfile) {

    const table = TABLE[type];

    if (!table || !id) return null;

    const columns = withProfile
      ? "*, profiles(full_name, is_verified, rating, user_type, avatar_url)"
      : "*";

    const { data, error } =
      await supabaseClient
        .from(table)
        .select(columns)
        .eq("id", id)
        .maybeSingle();

    if (error) {
      console.error("Annuncio:", error);
      return null;
    }

    return data || null;

  }

  async function openPost(type, id) {

    if (!TABLE[type] || !id) return;

    const modal = modalShell(
      "postModal",
      `<div class="cm-loading">${P("postLoading")}</div>`
    );

    const post = await fetchPost(type, id, true);

    if (!$("postModal")) return;

    if (!post) {

      modal.querySelector(".cm-box").innerHTML = `
        <button type="button" class="cm-close" data-cm-close aria-label="${P("close")}">×</button>
        <div class="cm-empty">${P("postGone")}</div>
        <div class="cm-actions">
          <button type="button" class="primary" data-cm-all>${P("seeAll")}</button>
        </div>`;

      wirePostModal(modal, type);

      return;

    }

    const active = type === "trip" ? post.status === "active" : post.status === "open";

    const card = type === "trip" ? tripCard(post) : requestCard(post);

    modal.querySelector(".cm-box").innerHTML = `
      <button type="button" class="cm-close" data-cm-close aria-label="${P("close")}">×</button>
      ${active ? "" : `<div class="cm-warn">${P("postInactive")}</div>`}
      <div class="cm-card">${card}</div>
      <div class="cm-actions">
        <button type="button" class="secondary" data-cm-share>📣 ${P("shareTitle")}</button>
        <button type="button" class="secondary" data-cm-all>${P("seeAll")}</button>
      </div>`;

    wirePostModal(modal, type, id);

  }

  function wirePostModal(modal, type, id) {

    const all = modal.querySelector("[data-cm-all]");

    if (all) {
      all.onclick = () => {
        modal.remove();
        const section = $(type === "trip" ? "viaggi" : "richieste");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      };
    }

    const share = modal.querySelector("[data-cm-share]");

    if (share) share.onclick = () => openShare(type, id);

    // se dentro la scheda si preme "Contatta" la finestra si chiude
    modal.addEventListener("click", e => {
      if (e.target.closest(".card-actions-row .primary")) {
        setTimeout(() => modal.remove(), 50);
      }
    });

  }

  function handleHash() {

    const m = /^#(trip|request)-(.+)$/.exec(location.hash || "");

    if (m) openPost(m[1], decodeURIComponent(m[2]));

  }

  window.addEventListener("hashchange", handleHash);

  window.addEventListener("load", () => {
    setTimeout(handleHash, 1200);
  });

  // clic su una notifica
  function handleNotificationClick(el) {

    const trip = el.getAttribute("data-trip");
    const request = el.getAttribute("data-request");
    const type = el.getAttribute("data-type");

    if (typeof closeNotificationsPanel === "function") closeNotificationsPanel();

    if (trip) return openPost("trip", trip);
    if (request) return openPost("request", request);

    if (type === "welcome" && typeof openMessages === "function") openMessages();

  }

  /* ---------------------------------------------------
     2) CONDIVISIONE
  --------------------------------------------------- */

  function shareText(type, post) {

    const from = (countryFlag ? countryFlag(post.departure_country) : "") + " " + cityName(post.departure_city);
    const to = (countryFlag ? countryFlag(post.arrival_country) : "") + " " + cityName(post.arrival_city);

    if (type === "trip") {

      return P("txtTrip", {
        from: from.trim(),
        to: to.trim(),
        date: fmtDate(post.travel_date),
        kg: post.available_kg,
        price: post.price_per_kg ? P("txtPrice", { p: post.price_per_kg }) : ""
      });

    }

    return P("txtRequest", {
      from: from.trim(),
      to: to.trim(),
      date: fmtDate(post.needed_date),
      item: post.item_description ? P("txtItem", { i: String(post.item_description).slice(0, 80) }) : ""
    });

  }

  async function openShare(type, id, justPublished) {

    if (!TABLE[type] || !id) return;

    const post = await fetchPost(type, id, false);

    if (!post) {
      toast(P("postGone"));
      return;
    }

    const url = postUrl(type, id);

    const modal = modalShell("shareModal", `
      <h3>${justPublished ? P("sharePublished") : P("shareTitle")}</h3>
      <p class="cm-hint">${P("shareHint")}</p>
      <textarea id="shareText" rows="4" dir="auto">${esc(shareText(type, post))}</textarea>
      <div class="cm-share-grid">
        <button type="button" class="sh sh-fb" data-sh="fb">${P("shFb")}</button>
        <button type="button" class="sh sh-wa" data-sh="wa">${P("shWa")}</button>
        <button type="button" class="sh sh-tg" data-sh="tg">${P("shTg")}</button>
        <button type="button" class="sh sh-x" data-sh="x">${P("shX")}</button>
        <button type="button" class="sh sh-mail" data-sh="mail">${P("shMail")}</button>
        <button type="button" class="sh sh-copy" data-sh="copytext">${P("shCopyText")}</button>
        <button type="button" class="sh sh-copy" data-sh="copylink">${P("shCopyLink")}</button>
        ${navigator.share ? `<button type="button" class="sh sh-more" data-sh="native">${P("shMore")}</button>` : ""}
      </div>
      <p class="cm-hint cm-groups">${P("shareGroups")}</p>
      <div class="cm-link"><input id="shareLink" readonly value="${esc(url)}"></div>`);

    modal.addEventListener("click", async e => {

      const button = e.target.closest("[data-sh]");

      if (!button) return;

      const text = ($("shareText") ? $("shareText").value : "").trim();

      const enc = encodeURIComponent;

      const kind = button.getAttribute("data-sh");

      const open = href => window.open(href, "_blank", "noopener");

      if (kind === "fb") return open("https://www.facebook.com/sharer/sharer.php?u=" + enc(url) + "&quote=" + enc(text));
      if (kind === "wa") return open("https://wa.me/?text=" + enc(text + " " + url));
      if (kind === "tg") return open("https://t.me/share/url?url=" + enc(url) + "&text=" + enc(text));
      if (kind === "x") return open("https://twitter.com/intent/tweet?text=" + enc(text) + "&url=" + enc(url));
      if (kind === "mail") {
        window.location.href = "mailto:?subject=" + enc("Hez Maak") + "&body=" + enc(text + "\n" + url);
        return;
      }

      if (kind === "native") {
        try { await navigator.share({ title: "Hez Maak", text, url }); } catch (err) { /* annullato */ }
        return;
      }

      const toCopy = kind === "copylink" ? url : text + " " + url;

      try {
        await navigator.clipboard.writeText(toCopy);
      } catch (err) {
        const input = $("shareLink");
        if (input) { input.value = toCopy; input.select(); try { document.execCommand("copy"); } catch (e2) { /* niente */ } input.value = url; }
      }

      toast(P("copied"));

    });

  }

  /* ---------------------------------------------------
     3) BENVENUTO DELL'ADMIN
  --------------------------------------------------- */

  function defaultLangFor(country) {

    const c = String(country || "").toLowerCase();

    if (c === "tunisia" || c === "tn") return "tn";
    if (c === "france" || c === "fr") return "fr";
    if (c === "uk" || c === "gb" || c === "united_kingdom" || c === "united kingdom") return "en";

    return "it";

  }

  let welcomeSetupMissing = false;

  async function welcomedSet() {

    const { data, error } =
      await supabaseClient.from("hm_welcomes").select("user_id");

    if (error) {
      welcomeSetupMissing = true;
      return new Set();
    }

    welcomeSetupMissing = false;

    return new Set((data || []).map(r => r.user_id));

  }

  function welcomeRow(user, welcomed) {

    const flag = typeof countryFlag === "function" ? countryFlag(user.country) : "";

    return `
      <div class="welcome-row" data-welcome-row="${esc(user.id)}">
        <div class="welcome-who">
          <b>${esc(user.full_name || "—")}</b>
          <small>${flag} ${esc(user.user_type || "")} · ${P("wUser", { d: fmtDate(user.created_at) })}</small>
        </div>
        <div class="welcome-act">
          ${welcomed
            ? `<span class="welcomed">${P("wDone")}</span>
               <button type="button" class="link-button" data-welcome="${esc(user.id)}" data-name="${esc(user.full_name || "")}" data-country="${esc(user.country || "")}">${P("wResend")}</button>`
            : `<button type="button" class="primary" data-welcome="${esc(user.id)}" data-name="${esc(user.full_name || "")}" data-country="${esc(user.country || "")}">${P("wSend")}</button>`}
        </div>
      </div>`;

  }

  async function buildAdminWelcomeCard(users) {

    const list = (users || [])
      .filter(u => !currentUser || u.id !== currentUser.id)
      .slice(0, 20);

    const done = await welcomedSet();

    const pending = list.filter(u => !done.has(u.id)).length;

    return `
      <div class="profile-card" id="adminWelcomeCard">
        <div class="profile-card-title">
          <h3>👋 ${P("wTitle")}${pending ? ` <span class="welcome-count">${pending}</span>` : ""}</h3>
        </div>
        ${welcomeSetupMissing ? `<p class="welcome-setup">${P("wSetup")}</p>` : ""}
        <div class="welcome-list">
          ${list.length ? list.map(u => welcomeRow(u, done.has(u.id))).join("") : `<p>${P("wNone")}</p>`}
        </div>
      </div>`;

  }

  async function refreshAdminWelcomeBadge() {

    const button = $("adminHeaderButton");

    if (!button || !currentUser) return;

    try {

      let count = 0;

      try {

        const since = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString();

        const recent = await supabaseClient
          .from("profiles")
          .select("id")
          .gte("created_at", since)
          .neq("id", currentUser.id);

        if (!recent.error && recent.data) {

          const done = await welcomedSet();

          if (!welcomeSetupMissing) {
            count += recent.data.filter(u => !done.has(u.id)).length;
          }

        }

      } catch (e) {
        console.warn("Badge benvenuti:", e);
      }

      if (typeof window.hmPendingPlanCount === "function") {
        count += await window.hmPendingPlanCount();
      }

      if (typeof window.hmWatchPlanRequests === "function") {
        window.hmWatchPlanRequests();
      }

      let badge = button.querySelector(".notify-badge");

      if (!count) {
        if (badge) badge.remove();
        return;
      }

      if (!badge) {
        badge = document.createElement("span");
        badge.className = "notify-badge";
        button.appendChild(badge);
      }

      badge.textContent = String(count);

    } catch (e) {
      console.warn("Badge admin:", e);
    }

  }

  function openWelcomeModal(userId, name, country) {

    let lang = defaultLangFor(country);

    const first = String(name || "").trim().split(/\s+/)[0] || "";

    const textFor = l => WELCOME_TEXT[LANGS.indexOf(l)].split("{name}").join(first).replace(/\s+([,!])/g, "$1");

    const modal = modalShell("welcomeModal", `
      <h3>👋 ${P("wModalTitle", { name: esc(name || "") })}</h3>
      <label class="cm-field">${P("wLang")}
        <select id="welcomeLang">
          ${LANGS.map(l => `<option value="${l}" ${l === lang ? "selected" : ""}>${LANG_LABEL[l]}</option>`).join("")}
        </select>
      </label>
      <label class="cm-field">${P("wMsg")}
        <textarea id="welcomeText" rows="6" dir="auto">${esc(textFor(lang))}</textarea>
      </label>
      <p class="cm-hint">${P("wNote")}</p>
      <p class="cm-error" id="welcomeError"></p>
      <div class="cm-actions">
        <button type="button" class="primary" id="welcomeSend">${P("wSendBtn")}</button>
        <button type="button" class="secondary" data-cm-close>${P("close")}</button>
      </div>`);

    $("welcomeLang").onchange = e => {
      lang = e.target.value;
      $("welcomeText").value = textFor(lang);
    };

    $("welcomeSend").onclick = async () => {

      const button = $("welcomeSend");

      const text = $("welcomeText").value.trim();

      if (!text) return;

      button.disabled = true;

      $("welcomeError").textContent = "";

      try {

        await sendWelcome(userId, text, lang);

        modal.remove();

        toast(P("wSent"));

        const row = document.querySelector(`[data-welcome-row="${CSS.escape(userId)}"]`);

        const act = row ? row.querySelector(".welcome-act") : null;

        if (act) {
          act.innerHTML = `<span class="welcomed">${P("wDone")}</span>
            <button type="button" class="link-button" data-welcome="${esc(userId)}" data-name="${esc(name || "")}" data-country="${esc(country || "")}">${P("wResend")}</button>`;
        }

        refreshAdminWelcomeBadge();

      } catch (err) {

        console.error("Benvenuto:", err);

        $("welcomeError").textContent = P("wErr");

        button.disabled = false;

      }

    };

  }

  async function sendWelcome(userId, text, lang) {

    const admin = currentUser.id;

    const p1 = admin < userId ? admin : userId;
    const p2 = admin < userId ? userId : admin;

    // conversazione generica tra admin e utente (senza annuncio)
    const found = await supabaseClient
      .from("conversations")
      .select("*")
      .eq("participant_1", p1)
      .eq("participant_2", p2)
      .is("trip_id", null)
      .is("request_id", null)
      .limit(1);

    if (found.error) throw found.error;

    let conversation = found.data && found.data[0];

    if (!conversation) {

      const created = await supabaseClient
        .from("conversations")
        .insert({ participant_1: p1, participant_2: p2, trip_id: null, request_id: null })
        .select()
        .single();

      if (created.error) throw created.error;

      conversation = created.data;

    }

    const message = await supabaseClient
      .from("messages")
      .insert([{ conversation_id: conversation.id, sender_id: admin, message: text }]);

    if (message.error) throw message.error;

    // notifica nella campanella dell'utente
    const notification = await supabaseClient
      .from("notifications")
      .insert({
        user_id: userId,
        type: "welcome",
        title: WELCOME_TITLE[LANGS.indexOf(lang)],
        message: text.length > 110 ? text.slice(0, 107) + "…" : text,
        trip_id: null,
        request_id: null
      });

    if (notification.error) console.warn("Notifica benvenuto:", notification.error);

    // registro dei benvenuti (se la tabella esiste)
    const log = await supabaseClient
      .from("hm_welcomes")
      .upsert({ user_id: userId, admin_id: admin, welcomed_at: new Date().toISOString() });

    if (log.error) console.warn("Registro benvenuti:", log.error);

  }

  document.addEventListener("click", e => {

    const button = e.target.closest("[data-welcome]");

    if (!button) return;

    openWelcomeModal(
      button.getAttribute("data-welcome"),
      button.getAttribute("data-name"),
      button.getAttribute("data-country")
    );

  });

  document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    ["welcomeModal", "shareModal", "postModal"].some(id => {
      const el = $(id);
      if (el) { el.remove(); return true; }
      return false;
    });

  });

  /* ---------------------------------------------------
     API PUBBLICA
  --------------------------------------------------- */

  window.openPost = openPost;
  window.openShare = openShare;
  window.handleNotificationClick = handleNotificationClick;
  window.buildAdminWelcomeCard = buildAdminWelcomeCard;
  window.refreshAdminWelcomeBadge = refreshAdminWelcomeBadge;
  window.openWelcomeModal = openWelcomeModal;

})();
