/* =====================================================
   HEZ MAAK — AREA PRO
   Strumenti per trasportatori e aziende.
   Richiede: app.js (supabaseClient, currentUser, currentLanguage,
   openAuth, escapeHtml) e lo script supabase_area_pro.sql.
===================================================== */

(function () {

  "use strict";

  /* ---------------------------------------------------
     TESTI  [it, en, fr, tn]
  --------------------------------------------------- */

  const D = {

    proTitle: ["Area Pro", "Pro area", "Espace Pro", "فضاء المحترفين"],
    close: ["Chiudi", "Close", "Fermer", "سكّر"],
    loading: ["Caricamento…", "Loading…", "Chargement…", "تحميل…"],
    save: ["Salva", "Save", "Enregistrer", "سجّل"],
    cancel: ["Annulla", "Cancel", "Annuler", "ألغي"],
    edit: ["Modifica", "Edit", "Modifier", "بدّل"],
    del: ["Elimina", "Delete", "Supprimer", "امسح"],
    confirmDelete: ["Eliminare definitivamente?", "Delete permanently?", "Supprimer définitivement ?", "تمسح نهائيا؟"],
    all: ["Tutti", "All", "Tous", "الكل"],
    retry: ["Riprova", "Try again", "Réessayer", "عاود"],

    tabDash: ["Panoramica", "Overview", "Aperçu", "نظرة عامة"],
    tabShip: ["Spedizioni", "Shipments", "Expéditions", "الشحنات"],
    tabCli: ["Clienti", "Clients", "Clients", "الحرفاء"],
    tabTrips: ["Partenze", "Departures", "Départs", "السفرات"],
    tabPlan: ["Piano", "Plan", "Offre", "الباقة"],
    tabSet: ["Impostazioni", "Settings", "Paramètres", "الإعدادات"],

    planFree: ["Gratis", "Free", "Gratuit", "مجاني"],
    planBiz: ["Business", "Business", "Business", "Business"],

    stReceived: ["Ricevuto", "Received", "Reçu", "تسجّل"],
    stPicked: ["Ritirato", "Picked up", "Récupéré", "تم الاستلام"],
    stTransit: ["In viaggio", "In transit", "En route", "في الطريق"],
    stCustoms: ["In dogana", "At customs", "En douane", "في الديوانة"],
    stDelivered: ["Consegnato", "Delivered", "Livré", "تسلّمو المستلم"],
    stCancelled: ["Annullato", "Cancelled", "Annulé", "ملغى"],

    kActive: ["Spedizioni attive", "Active shipments", "Expéditions actives", "شحنات جارية"],
    kToCollect: ["Da incassare", "To collect", "À encaisser", "باش تقبض"],
    kDelivMonth: ["Consegnate nel mese", "Delivered this month", "Livrées ce mois", "تسلّموا الشهر هذا"],
    kNextTrip: ["Prossima partenza", "Next departure", "Prochain départ", "السفرة الجاية"],
    noTrip: ["Nessuna in programma", "None planned", "Aucun prévu", "ما فمّاش"],
    usageTrips: ["Viaggi in programma: {n} / {max}", "Upcoming trips: {n} / {max}", "Voyages prévus : {n} / {max}", "سفرات جاية: {n} / {max}"],
    usageClients: ["Clienti: {n} / {max}", "Clients: {n} / {max}", "Clients : {n} / {max}", "حرفاء: {n} / {max}"],
    usageUnlimitedAll: ["Viaggi e clienti illimitati", "Unlimited trips and clients", "Voyages et clients illimités", "سفرات وحرفاء بلا حدود"],
    recent: ["Ultime spedizioni", "Latest shipments", "Dernières expéditions", "آخر الشحنات"],
    dashHint: [
      "Inizia così: aggiungi un cliente, crea una spedizione e manda il link di tracking su WhatsApp.",
      "Start here: add a client, create a shipment and send the tracking link on WhatsApp.",
      "Commencez ainsi : ajoutez un client, créez une expédition et envoyez le lien de suivi sur WhatsApp.",
      "ابدا هكا: زيد حريف، اعمل شحنة وابعث رابط التتبع في واتساب."
    ],

    newShip: ["Nuova spedizione", "New shipment", "Nouvelle expédition", "شحنة جديدة"],
    editShip: ["Modifica spedizione", "Edit shipment", "Modifier l'expédition", "بدّل الشحنة"],
    newClient: ["Nuovo cliente", "New client", "Nouveau client", "حريف جديد"],
    editClient: ["Modifica cliente", "Edit client", "Modifier le client", "بدّل الحريف"],
    newTrip: ["Nuova partenza", "New departure", "Nouveau départ", "سفرة جديدة"],
    editTrip: ["Modifica partenza", "Edit departure", "Modifier le départ", "بدّل السفرة"],

    searchPh: [
      "Cerca per codice, cliente o destinatario",
      "Search by code, client or recipient",
      "Rechercher par code, client ou destinataire",
      "لوّج بالكود، الحريف ولا المستلم"
    ],
    emptyShip: ["Nessuna spedizione: creane una per iniziare.", "No shipments yet: create one to get started.", "Aucune expédition : créez-en une pour commencer.", "ما فمّاش شحنات: اعمل واحدة باش تبدا."],
    emptyCli: ["Nessun cliente ancora.", "No clients yet.", "Aucun client pour le moment.", "ما فمّاش حرفاء مازال."],
    emptyTrips: ["Nessuna partenza pianificata.", "No planned departures.", "Aucun départ planifié.", "ما فمّاش سفرات مبرمجة."],

    fClient: ["Cliente", "Client", "Client", "الحريف"],
    fSender: ["Mittente", "Sender", "Expéditeur", "المرسل"],
    fRecipient: ["Destinatario", "Recipient", "Destinataire", "المستلم"],
    fPhone: ["Telefono destinatario", "Recipient phone", "Téléphone du destinataire", "تلفون المستلم"],
    fFrom: ["Da (città)", "From (city)", "De (ville)", "من (مدينة)"],
    fTo: ["A (città)", "To (city)", "À (ville)", "لـ (مدينة)"],
    fDesc: ["Contenuto", "Contents", "Contenu", "المحتوى"],
    fPackages: ["Colli", "Packages", "Colis", "عدد الطرود"],
    fWeight: ["Peso (kg)", "Weight (kg)", "Poids (kg)", "الوزن (كغ)"],
    fPrice: ["Prezzo (€)", "Price (€)", "Prix (€)", "السوم (€)"],
    fPaid: ["Incassato (€)", "Paid (€)", "Encaissé (€)", "المقبوض (€)"],
    fTrip: ["Partenza", "Departure", "Départ", "السفرة"],
    fStatus: ["Stato", "Status", "Statut", "الحالة"],
    fNotes: ["Note interne", "Internal notes", "Notes internes", "ملاحظات داخلية"],
    noClientSel: ["— nessun cliente —", "— no client —", "— aucun client —", "— بلا حريف —"],
    noTripSel: ["— nessuna —", "— none —", "— aucun —", "— حتى وحدة —"],

    cName: ["Nome", "Name", "Nom", "الاسم"],
    cPhone: ["Telefono", "Phone", "Téléphone", "التلفون"],
    cEmail: ["Email", "Email", "Email", "الإيميل"],
    cCity: ["Città", "City", "Ville", "المدينة"],
    cNotes: ["Note", "Notes", "Notes", "ملاحظات"],
    cShipments: ["{n} spedizioni", "{n} shipments", "{n} expéditions", "{n} شحنات"],

    tDate: ["Data", "Date", "Date", "التاريخ"],
    tCap: ["Capacità (kg)", "Capacity (kg)", "Capacité (kg)", "السعة (كغ)"],
    tLoaded: ["{a} / {b} kg caricati", "{a} / {b} kg loaded", "{a} / {b} kg chargés", "{a} / {b} كغ محمّلين"],

    aTrack: ["Copia link di tracking", "Copy tracking link", "Copier le lien de suivi", "انسخ رابط التتبع"],
    aCopied: ["Link copiato", "Link copied", "Lien copié", "الرابط تنسخ"],
    aWhats: ["Invia su WhatsApp", "Send on WhatsApp", "Envoyer sur WhatsApp", "ابعث في واتساب"],
    aReceipt: ["Ricevuta", "Receipt", "Reçu", "وصل"],
    aExport: ["Esporta CSV", "Export CSV", "Exporter en CSV", "صدّر CSV"],
    proOnly: ["Disponibile con il piano Business", "Available on the Business plan", "Disponible avec l'offre Business", "موجود في باقة Business"],
    notePrompt: [
      "Nota per il cliente (facoltativa, visibile nel tracking):",
      "Note for the customer (optional, shown in tracking):",
      "Note pour le client (facultative, visible dans le suivi) :",
      "ملاحظة للحريف (اختيارية، تظهر في التتبع):"
    ],
    waMsg: [
      "Ciao {name}, il tuo pacco {code} è: {status}. Segui qui: {link}",
      "Hi {name}, your parcel {code} is: {status}. Track it here: {link}",
      "Bonjour {name}, votre colis {code} est : {status}. Suivez-le ici : {link}",
      "مرحبا {name}، طردك {code} حالته: {status}. تتبعو من هنا: {link}"
    ],
    paidBadge: ["Saldato", "Paid", "Soldé", "خالص"],
    dueBadge: ["Da incassare {n} €", "{n} € due", "{n} € à encaisser", "باقي {n} €"],

    planCurrent: ["Piano attuale", "Current plan", "Offre actuelle", "باقتك الحالية"],
    perMonth: ["/mese", "/month", "/mois", "/شهر"],
    perYear: ["o {n} €/anno", "or €{n}/year", "ou {n} €/an", "ولا {n} €/عام"],
    soon: ["In arrivo", "Coming soon", "Bientôt", "قريبا"],
    reqBiz: ["Passa a Business", "Upgrade to Business", "Passer à Business", "بدّل لـ Business"],
    reqTitle: ["Richiedi il piano {plan}", "Request the {plan} plan", "Demander l'offre {plan}", "اطلب باقة {plan}"],
    reqText: [
      "Durante la fase di prova attiviamo i piani a mano: lasciaci un contatto e ti scriviamo noi. I primi trasportatori possono provare Business gratis per 3 mesi.",
      "During the trial phase we activate plans by hand: leave a contact and we'll write to you. The first carriers can try Business free for 3 months.",
      "Pendant la phase de test, nous activons les offres à la main : laissez un contact et nous vous écrivons. Les premiers transporteurs peuvent essayer Business gratuitement 3 mois.",
      "في فترة التجربة نفعّلو الباقات باليد: خلّي رقم ولا إيميل ونكتبولك. أول الناقلين يجرّبو Business مجانا 3 أشهر."
    ],
    reqContact: ["Telefono o email", "Phone or email", "Téléphone ou email", "التلفون ولا الإيميل"],
    reqMsg: ["Messaggio (facoltativo)", "Message (optional)", "Message (facultatif)", "رسالة (اختيارية)"],
    reqSend: ["Invia richiesta", "Send request", "Envoyer la demande", "ابعث الطلب"],
    reqThanks: ["Richiesta inviata! Ti contatteremo presto.", "Request sent! We'll contact you soon.", "Demande envoyée ! Nous vous contacterons bientôt.", "الطلب تبعث! باش نتصلو بيك قريب."],

    // funzioni dei piani
    fe_free1: ["Fino a 3 viaggi in programma", "Up to 3 upcoming trips", "Jusqu'à 3 voyages prévus", "حتى 3 سفرات جاية"],
    fe_free2: ["Fino a 20 clienti", "Up to 20 clients", "Jusqu'à 20 clients", "حتى 20 حريف"],
    fe_free3: ["Spedizioni e link di tracking per i clienti", "Shipments and tracking links for your clients", "Expéditions et liens de suivi pour vos clients", "شحنات ورابط تتبع للحرفاء"],
    fe_free4: ["Calendario partenze e carico", "Departure calendar and load", "Calendrier des départs et chargement", "روزنامة السفرات والحمولة"],
    fe_free5: ["Messaggi WhatsApp e ricevute (con logo Hez Maak)", "WhatsApp messages and receipts (with Hez Maak logo)", "Messages WhatsApp et reçus (avec logo Hez Maak)", "رسائل واتساب ووصولات (بشعار هزّ معاك)"],
    fe_biz1: ["Tutto il piano Gratis", "Everything in Free", "Tout l'offre Gratuite", "كل ما في الباقة المجانية"],
    fe_biz2: ["Viaggi e clienti illimitati", "Unlimited trips and clients", "Voyages et clients illimités", "سفرات وحرفاء بلا حدود"],
    fe_biz3: ["Ricevute senza logo Hez Maak", "Receipts without Hez Maak logo", "Reçus sans logo Hez Maak", "وصولات بلا شعار هزّ معاك"],
    fe_biz4: ["Esportazione CSV / Excel", "CSV / Excel export", "Export CSV / Excel", "تصدير CSV / Excel"],
    fe_biz5: ["Team fino a 5 utenti (autisti, segreteria)", "Team of up to 5 users (drivers, office)", "Équipe jusqu'à 5 utilisateurs (chauffeurs, bureau)", "فريق حتى 5 مستخدمين (سواقة، مكتب)"],
    fe_biz6: ["Prova di consegna con foto", "Proof of delivery with photo", "Preuve de livraison avec photo", "إثبات التسليم بالصورة"],
    fe_biz7: ["Giri di ritiro", "Pick-up rounds", "Tournées de collecte", "جولات الاستلام"],
    fe_biz8: ["Report mensili e per tratta + supporto prioritario", "Monthly and per-route reports + priority support", "Rapports mensuels et par trajet + support prioritaire", "تقارير شهرية وحسب الخط + دعم بالأولوية"],

    repTitle: ["Report ultimi 6 mesi", "Last 6 months report", "Rapport des 6 derniers mois", "تقرير آخر 6 أشهر"],
    repMonth: ["Mese", "Month", "Mois", "الشهر"],
    repRevenue: ["Ricavi", "Revenue", "Revenus", "المداخيل"],
    repKg: ["Kg", "Kg", "Kg", "كغ"],
    repCount: ["Spedizioni", "Shipments", "Expéditions", "شحنات"],
    repTop: ["Tratte principali", "Top routes", "Principaux trajets", "أهم الخطوط"],
    repLocked: ["I report sono inclusi nel piano Business.", "Reports are included in the Business plan.", "Les rapports sont inclus dans l'offre Business.", "التقارير موجودة في باقة Business."],

    sName: ["Nome attività", "Business name", "Nom de l'activité", "اسم النشاط"],
    sPhone: ["Telefono attività", "Business phone", "Téléphone de l'activité", "تلفون النشاط"],
    sAddr: ["Indirizzo", "Address", "Adresse", "العنوان"],
    sHint: [
      "Questi dati compaiono su ricevute e sulla pagina di tracking. Le note che scrivi cambiando stato sono visibili a chi ha il link.",
      "These details appear on receipts and on the tracking page. Notes you add when changing status are visible to anyone with the link.",
      "Ces informations apparaissent sur les reçus et la page de suivi. Les notes ajoutées lors d'un changement de statut sont visibles par toute personne ayant le lien.",
      "هذي المعلومات تظهر في الوصولات وصفحة التتبع. الملاحظات إلي تكتبها وقت تبدّل الحالة يشوفها كل واحد عندو الرابط."
    ],
    saved: ["Salvato", "Saved", "Enregistré", "تسجّل"],

    rcTitle: ["Ricevuta di spedizione", "Shipment receipt", "Reçu d'expédition", "وصل شحنة"],
    rcDate: ["Data", "Date", "Date", "التاريخ"],
    rcTotal: ["Totale", "Total", "Total", "المجموع"],
    rcPaid: ["Incassato", "Paid", "Encaissé", "المقبوض"],
    rcBalance: ["Da saldare", "Balance due", "Reste à payer", "الباقي"],
    rcFoot: ["Generata con Hez Maak", "Generated with Hez Maak", "Générée avec Hez Maak", "تولّد بهزّ معاك"],

    errGeneric: ["Qualcosa è andato storto. Riprova.", "Something went wrong. Try again.", "Un problème est survenu. Réessayez.", "صار مشكل. عاود."],
    errLimitTrips: [
      "Hai raggiunto il limite di 3 viaggi in programma del piano Gratis. Passa a Business per viaggi illimitati.",
      "You've reached the Free plan limit of 3 upcoming trips. Upgrade to Business for unlimited trips.",
      "Vous avez atteint la limite de 3 voyages prévus de l'offre Gratuite. Passez à Business pour des voyages illimités.",
      "وصلت للحد متاع 3 سفرات جاية في الباقة المجانية. بدّل لـ Business باش تولّي بلا حدود."
    ],
    errLimitCli: [
      "Hai raggiunto il limite di 20 clienti del piano Gratis. Passa a Business per clienti illimitati.",
      "You've reached the Free plan limit of 20 clients. Upgrade to Business for unlimited clients.",
      "Vous avez atteint la limite de 20 clients de l'offre Gratuite. Passez à Business pour des clients illimités.",
      "وصلت للحد متاع 20 حريف في الباقة المجانية. بدّل لـ Business باش تولّي بلا حدود."
    ],
    errSetup: [
      "L'Area Pro non è ancora attiva sul database: esegui lo script SQL su Supabase.",
      "The Pro area isn't active on the database yet: run the SQL script on Supabase.",
      "L'espace Pro n'est pas encore actif sur la base de données : exécutez le script SQL sur Supabase.",
      "فضاء المحترفين مازال موش مفعّل في قاعدة البيانات: شغّل سكريبت SQL في Supabase."
    ]

  };

  const IDX = { it: 0, en: 1, fr: 2, tn: 3 };

  const lg = () => (IDX[currentLanguage] !== undefined ? IDX[currentLanguage] : 0);

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

  /* ---------------------------------------------------
     PIANI
  --------------------------------------------------- */

  const PLANS = {
    free: { price: 0, limitTrips: 3, limitClients: 20, csv: false, report: false, brand: true },
    business: { price: 49.9, yearly: 499, limitTrips: Infinity, limitClients: Infinity, csv: true, report: true, brand: false }
  };

  const SOON_FEATURES = { fe_biz5: 1, fe_biz6: 1, fe_biz7: 1 };

  const PLAN_FEATURES = {
    free: ["fe_free1", "fe_free2", "fe_free3", "fe_free4", "fe_free5"],
    business: ["fe_biz1", "fe_biz2", "fe_biz3", "fe_biz4", "fe_biz5", "fe_biz6", "fe_biz7", "fe_biz8"]
  };

  const PLAN_NAME = { free: "planFree", business: "planBiz" };

  const STATUSES = ["received", "picked_up", "in_transit", "customs", "delivered", "cancelled"];

  const STATUS_KEY = {
    received: "stReceived",
    picked_up: "stPicked",
    in_transit: "stTransit",
    customs: "stCustoms",
    delivered: "stDelivered",
    cancelled: "stCancelled"
  };

  /* ---------------------------------------------------
     STATO
  --------------------------------------------------- */

  const st = {
    open: false,
    tab: "dash",
    loaded: false,
    ready: false,
    error: null,
    plan: "free",
    settings: {},
    clients: [],
    shipments: [],
    trips: [],
    search: "",
    statusFilter: "all"
  };

  const $ = id => document.getElementById(id);

  const uid = () => currentUser.id;

  const num = v => {
    const n = parseFloat(String(v === undefined || v === null ? "" : v).replace(",", "."));
    return isFinite(n) ? n : 0;
  };

  const money = v => (Math.round(num(v) * 100) / 100).toLocaleString(locale(), { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  function locale() {
    return currentLanguage === "fr" ? "fr-FR"
      : currentLanguage === "tn" ? "ar-TN"
      : currentLanguage === "en" ? "en-GB"
      : "it-IT";
  }

  const fmtDate = d => {
    if (!d) return "";
    const dt = new Date(d);
    return isNaN(dt) ? "" : dt.toLocaleDateString(locale());
  };

  const plan = () => PLANS[st.plan] || PLANS.free;

  function friendlyError(e) {

    const msg = String((e && (e.message || e.details)) || "");

    if (msg.indexOf("PRO_LIMIT_TRIPS") !== -1) return P("errLimitTrips");
    if (msg.indexOf("PRO_LIMIT_CLIENTS") !== -1) return P("errLimitCli");

    if ((e && e.code === "42P01") ||
        /does not exist|schema cache|Could not find the table/i.test(msg)) {
      return P("errSetup");
    }

    console.error("Area Pro:", e);

    return P("errGeneric");

  }

  /* ---------------------------------------------------
     ACCESSO AI DATI
  --------------------------------------------------- */

  async function listOwn(table, orderColumn, ascending) {

    const { data, error } =
      await supabaseClient
        .from(table)
        .select("*")
        .eq("owner_id", uid())
        .order(orderColumn, { ascending: !!ascending });

    if (error) throw error;

    return data || [];

  }

  async function loadAll() {

    const results = await Promise.all([
      listOwn("hm_shipments", "created_at", false),
      listOwn("hm_clients", "created_at", false),
      listOwn("hm_trips", "trip_date", true)
    ]);

    st.shipments = results[0];
    st.clients = results[1];
    st.trips = results[2];

    const settings =
      await supabaseClient
        .from("hm_settings")
        .select("*")
        .eq("user_id", uid())
        .maybeSingle();

    st.settings = (settings && settings.data) || {};

    st.plan = "free";

    try {

      const planResult = await supabaseClient.rpc("hm_my_plan");

      const rp = planResult && planResult.data === "pro" ? "business" : planResult && planResult.data;

      if (rp && PLANS[rp]) {
        st.plan = rp;
      }

    } catch (e) {
      console.warn("Piano Pro:", e);
    }

  }

  async function reload() {

    try {
      await loadAll();
      st.error = null;
    } catch (e) {
      st.error = friendlyError(e);
    }

    st.ready = true;

    render();

  }

  /* ---------------------------------------------------
     APERTURA / CHIUSURA
  --------------------------------------------------- */

  function openPro(tab) {

    if (typeof currentUser === "undefined" || !currentUser) {
      openAuth("login");
      return;
    }

    st.open = true;

    if (tab) st.tab = tab;

    document.body.classList.add("pro-open");

    ensureOverlay();

    render();

    if (!st.loaded) {

      st.loaded = true;

      reload();

    }

  }

  function closePro() {

    st.open = false;

    closeModal();

    const overlay = $("proOverlay");

    if (overlay) overlay.remove();

    document.body.classList.remove("pro-open");

  }

  function ensureOverlay() {

    let overlay = $("proOverlay");

    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "proOverlay";
    overlay.className = "pro-overlay";

    overlay.addEventListener("click", onClick);
    overlay.addEventListener("change", onChange);
    overlay.addEventListener("input", onInput);

    document.body.appendChild(overlay);

    return overlay;

  }

  document.addEventListener("keydown", e => {

    if (e.key !== "Escape" || !st.open) return;

    if ($("proModal")) closeModal();
    else closePro();

  });

  /* ---------------------------------------------------
     DISEGNO
  --------------------------------------------------- */

  function render() {

    const overlay = $("proOverlay");

    if (!st.open || !overlay) return;

    overlay.setAttribute("dir", currentLanguage === "tn" ? "rtl" : "ltr");

    const tabs = [
      ["dash", "tabDash"],
      ["ship", "tabShip"],
      ["cli", "tabCli"],
      ["trips", "tabTrips"],
      ["plan", "tabPlan"],
      ["set", "tabSet"]
    ];

    let body;

    if (st.error) {
      body = `
        <div class="pro-alert">
          <p>${esc(st.error)}</p>
          <button type="button" class="primary" data-act="reload">${P("retry")}</button>
        </div>`;
    } else if (!st.ready) {
      body = `<div class="pro-loading">${P("loading")}</div>`;
    } else {
      body = bodyFor(st.tab);
    }

    overlay.innerHTML = `
      <div class="pro-shell">

        <header class="pro-head">
          <div class="pro-head-title">
            <span class="pro-head-ico">🚚</span>
            <h2>${P("proTitle")}</h2>
            <span class="pro-plan-badge pro-plan-${st.plan}">${P(PLAN_NAME[st.plan])}</span>
          </div>
          <button type="button" class="pro-close" data-act="close" aria-label="${P("close")}">×</button>
        </header>

        <div class="pro-tabs" role="tablist">
          ${tabs.map(t => `
            <button type="button" class="pro-tab ${st.tab === t[0] ? "active" : ""}" data-act="tab" data-tab="${t[0]}">
              ${P(t[1])}
            </button>`).join("")}
        </div>

        <main class="pro-body" id="proBody">${body}</main>

      </div>`;

  }

  function bodyFor(tab) {

    if (tab === "ship") return viewShipments();
    if (tab === "cli") return viewClients();
    if (tab === "trips") return viewTrips();
    if (tab === "plan") return viewPlan();
    if (tab === "set") return viewSettings();

    return viewDashboard();

  }

  /* ---------------------------------------------------
     CALCOLI
  --------------------------------------------------- */

  const isClosed = s => s.status === "delivered" || s.status === "cancelled";

  const due = s => s.status === "cancelled" ? 0 : Math.max(0, num(s.price) - num(s.paid));

  function monthStart() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  function shipmentsThisMonth() {
    const start = monthStart();
    return st.shipments.filter(s => new Date(s.created_at) >= start);
  }

  function loadedKg(trip) {
    return st.shipments
      .filter(s => s.trip_id === trip.id && s.status !== "cancelled")
      .reduce((sum, s) => sum + num(s.weight_kg), 0);
  }

  function clientName(id) {
    const c = st.clients.find(x => x.id === id);
    return c ? c.name : "";
  }

  function nextTrip() {
    const today = new Date().toISOString().slice(0, 10);
    return st.trips.find(t => t.trip_date >= today) || null;
  }

  function trackingLink(code) {
    return new URL("tracking.html?c=" + encodeURIComponent(code), location.href).href;
  }

  /* ---------------------------------------------------
     PANORAMICA
  --------------------------------------------------- */

  function viewDashboard() {

    const active = st.shipments.filter(s => !isClosed(s));

    const toCollect = st.shipments.reduce((sum, s) => sum + due(s), 0);

    const start = monthStart();

    const deliveredMonth = st.shipments.filter(
      s => s.status === "delivered" && new Date(s.updated_at || s.created_at) >= start
    ).length;

    const trip = nextTrip();

    const todayIso = new Date().toISOString().slice(0, 10);
    const upcomingTrips = st.trips.filter(t => t.trip_date >= todayIso).length;

    const p = plan();

    const meter = (label, n, max) => {
      const pct = Math.min(100, Math.round(n / max * 100));
      return `<div class="pro-usage-item"><div class="pro-usage-text">${label}</div><div class="pro-bar"><i style="width:${pct}%"></i></div></div>`;
    };

    const recent = st.shipments.slice(0, 5);

    return `
      <div class="pro-actions-row">
        <button type="button" class="primary" data-act="new-ship">+ ${P("newShip")}</button>
        <button type="button" class="secondary" data-act="new-client">+ ${P("newClient")}</button>
        <button type="button" class="secondary" data-act="new-trip">+ ${P("newTrip")}</button>
      </div>

      <div class="pro-kpis">
        <div class="pro-kpi"><span>${P("kActive")}</span><b>${active.length}</b></div>
        <div class="pro-kpi"><span>${P("kToCollect")}</span><b>${money(toCollect)} €</b></div>
        <div class="pro-kpi"><span>${P("kDelivMonth")}</span><b>${deliveredMonth}</b></div>
        <div class="pro-kpi"><span>${P("kNextTrip")}</span><b class="pro-kpi-small">${trip ? esc(fmtDate(trip.trip_date)) + "<br>" + esc(cityName(trip.from_city)) + " → " + esc(cityName(trip.to_city)) : P("noTrip")}</b></div>
      </div>

      <div class="pro-usage">
        ${p.limitTrips === Infinity
          ? `<div class="pro-usage-text">${P("usageUnlimitedAll")}</div>`
          : meter(P("usageTrips", { n: upcomingTrips, max: p.limitTrips }), upcomingTrips, p.limitTrips)
            + meter(P("usageClients", { n: st.clients.length, max: p.limitClients }), st.clients.length, p.limitClients)}
      </div>

      <h3 class="pro-h3">${P("recent")}</h3>

      ${recent.length
        ? `<div class="pro-list">${recent.map(shipRow).join("")}</div>`
        : `<div class="pro-empty">${P("emptyShip")}<br><small>${P("dashHint")}</small></div>`}

      ${reportBlock()}
    `;

  }

  function cityName(raw) {
    return typeof window.cityName === "function" ? window.cityName(raw) : raw;
  }

  function reportBlock() {

    if (!plan().report) {
      return `<div class="pro-locked">🔒 ${P("repLocked")}
        <button type="button" class="secondary" data-act="tab" data-tab="plan">${P("tabPlan")}</button></div>`;
    }

    const months = [];

    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"),
        label: d.toLocaleDateString(locale(), { month: "short", year: "2-digit" }),
        revenue: 0, kg: 0, count: 0
      });
    }

    const routes = {};

    st.shipments.forEach(s => {

      if (s.status === "cancelled") return;

      const d = new Date(s.created_at);

      const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");

      const m = months.find(x => x.key === key);

      if (m) {
        m.revenue += num(s.price);
        m.kg += num(s.weight_kg);
        m.count += 1;
      }

      const route = (cityName(s.from_city) || "?") + " → " + (cityName(s.to_city) || "?");

      routes[route] = (routes[route] || 0) + 1;

    });

    const top = Object.keys(routes)
      .map(r => [r, routes[r]])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return `
      <h3 class="pro-h3">${P("repTitle")}</h3>
      <div class="pro-table-wrap">
        <table class="pro-table">
          <thead><tr>
            <th>${P("repMonth")}</th><th>${P("repCount")}</th><th>${P("repKg")}</th><th>${P("repRevenue")}</th>
          </tr></thead>
          <tbody>
            ${months.map(m => `<tr><td>${esc(m.label)}</td><td>${m.count}</td><td>${money(m.kg)}</td><td>${money(m.revenue)} €</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
      ${top.length ? `
        <h3 class="pro-h3">${P("repTop")}</h3>
        <ul class="pro-top">${top.map(r => `<li><span>${esc(r[0])}</span><b>${r[1]}</b></li>`).join("")}</ul>` : ""}
    `;

  }

  /* ---------------------------------------------------
     SPEDIZIONI
  --------------------------------------------------- */

  function statusSelect(s) {

    return `
      <select class="pro-status pro-status-${s.status}" data-status-for="${s.id}" aria-label="${P("fStatus")}">
        ${STATUSES.map(x => `<option value="${x}" ${x === s.status ? "selected" : ""}>${P(STATUS_KEY[x])}</option>`).join("")}
      </select>`;

  }

  function shipRow(s) {

    const owed = due(s);

    const who = s.recipient_name || clientName(s.client_id) || s.sender_name || "";

    return `
      <div class="pro-row">

        <div class="pro-row-main">
          <b class="pro-code">${esc(s.code)}</b>
          <span class="pro-route">${esc(cityName(s.from_city) || "—")} → ${esc(cityName(s.to_city) || "—")}</span>
          <span class="pro-who">${esc(who)}</span>
          <span class="pro-meta">${esc(s.packages)} · ${money(s.weight_kg)} kg · ${money(s.price)} €
            ${owed > 0 && s.status !== "cancelled"
              ? `<em class="pro-due">${P("dueBadge", { n: money(owed) })}</em>`
              : (num(s.price) > 0 && s.status !== "cancelled" ? `<em class="pro-paid">${P("paidBadge")}</em>` : "")}
          </span>
        </div>

        <div class="pro-row-status">${statusSelect(s)}</div>

        <div class="pro-row-actions">
          <button type="button" class="pro-ibtn" data-act="copy-link" data-id="${s.id}" title="${P("aTrack")}">🔗</button>
          <button type="button" class="pro-ibtn" data-act="wa" data-id="${s.id}" title="${P("aWhats")}">💬</button>
          <button type="button" class="pro-ibtn" data-act="receipt" data-id="${s.id}" title="${P("aReceipt")}">🧾</button>
          <button type="button" class="pro-ibtn" data-act="edit-ship" data-id="${s.id}" title="${P("edit")}">✏️</button>
          <button type="button" class="pro-ibtn" data-act="del-ship" data-id="${s.id}" title="${P("del")}">🗑</button>
        </div>

      </div>`;

  }

  function filteredShipments() {

    const q = st.search.trim().toLowerCase();

    return st.shipments.filter(s => {

      if (st.statusFilter !== "all" && s.status !== st.statusFilter) return false;

      if (!q) return true;

      const hay = [s.code, s.recipient_name, s.sender_name, clientName(s.client_id), s.from_city, s.to_city, s.description]
        .join(" ").toLowerCase();

      return hay.indexOf(q) !== -1;

    });

  }

  function shipListHtml() {

    const list = filteredShipments();

    return list.length
      ? list.map(shipRow).join("")
      : `<div class="pro-empty">${P("emptyShip")}</div>`;

  }

  function viewShipments() {

    return `
      <div class="pro-toolbar">
        <input type="search" id="proSearch" class="pro-input" value="${esc(st.search)}" placeholder="${P("searchPh")}">
        <select id="proStatusFilter" class="pro-input">
          <option value="all">${P("all")}</option>
          ${STATUSES.map(x => `<option value="${x}" ${st.statusFilter === x ? "selected" : ""}>${P(STATUS_KEY[x])}</option>`).join("")}
        </select>
        <button type="button" class="secondary" data-act="export">${plan().csv ? "" : "🔒 "}${P("aExport")}</button>
        <button type="button" class="primary" data-act="new-ship">+ ${P("newShip")}</button>
      </div>
      <div class="pro-list" id="proList">${shipListHtml()}</div>`;

  }

  /* ---------------------------------------------------
     CLIENTI
  --------------------------------------------------- */

  function viewClients() {

    const rows = st.clients.map(c => {

      const n = st.shipments.filter(s => s.client_id === c.id).length;

      return `
        <div class="pro-row">
          <div class="pro-row-main">
            <b>${esc(c.name)}</b>
            <span class="pro-who">${esc([c.phone, c.email, cityName(c.city)].filter(Boolean).join(" · "))}</span>
            <span class="pro-meta">${P("cShipments", { n })}</span>
          </div>
          <div class="pro-row-actions">
            ${c.phone ? `<button type="button" class="pro-ibtn" data-act="wa-client" data-id="${c.id}" title="WhatsApp">💬</button>` : ""}
            <button type="button" class="pro-ibtn" data-act="edit-client" data-id="${c.id}" title="${P("edit")}">✏️</button>
            <button type="button" class="pro-ibtn" data-act="del-client" data-id="${c.id}" title="${P("del")}">🗑</button>
          </div>
        </div>`;

    }).join("");

    return `
      <div class="pro-toolbar">
        <span class="pro-toolbar-sp"></span>
        <button type="button" class="primary" data-act="new-client">+ ${P("newClient")}</button>
      </div>
      <div class="pro-list">${rows || `<div class="pro-empty">${P("emptyCli")}</div>`}</div>`;

  }

  /* ---------------------------------------------------
     PARTENZE
  --------------------------------------------------- */

  function viewTrips() {

    const rows = st.trips.map(t => {

      const kg = loadedKg(t);

      const cap = num(t.capacity_kg);

      const pct = cap > 0 ? Math.min(100, Math.round(kg / cap * 100)) : 0;

      return `
        <div class="pro-row">
          <div class="pro-row-main">
            <b>${esc(fmtDate(t.trip_date))}</b>
            <span class="pro-route">${esc(cityName(t.from_city))} → ${esc(cityName(t.to_city))}</span>
            <span class="pro-meta">${P("tLoaded", { a: money(kg), b: money(cap) })}</span>
            <div class="pro-bar ${pct >= 100 ? "full" : ""}"><i style="width:${pct}%"></i></div>
          </div>
          <div class="pro-row-actions">
            <button type="button" class="pro-ibtn" data-act="edit-trip" data-id="${t.id}" title="${P("edit")}">✏️</button>
            <button type="button" class="pro-ibtn" data-act="del-trip" data-id="${t.id}" title="${P("del")}">🗑</button>
          </div>
        </div>`;

    }).join("");

    return `
      <div class="pro-toolbar">
        <span class="pro-toolbar-sp"></span>
        <button type="button" class="primary" data-act="new-trip">+ ${P("newTrip")}</button>
      </div>
      <div class="pro-list">${rows || `<div class="pro-empty">${P("emptyTrips")}</div>`}</div>`;

  }

  /* ---------------------------------------------------
     PIANI
  --------------------------------------------------- */

  function viewPlan() {

    const order = ["free", "business"];

    const cards = order.map(key => {

      const p = PLANS[key];

      const current = st.plan === key;

      const price = key === "free"
        ? `<b>0 €</b>`
        : `<b>${p.price.toFixed(2).replace(".", ",")} €</b><small>${P("perMonth")}</small>
           <div class="pro-plan-year">${P("perYear", { n: p.yearly })}</div>`;

      let cta = "";

      if (current) {
        cta = `<div class="pro-plan-current">✓ ${P("planCurrent")}</div>`;
      } else if (key === "business") {
        cta = `<button type="button" class="primary" data-act="upgrade" data-plan="business">${P("reqBiz")}</button>`;
      }

      return `
        <div class="pro-plan-card ${current ? "current" : ""} ${key === "business" ? "featured" : ""}">
          <h3>${P(PLAN_NAME[key])}</h3>
          <div class="pro-plan-price">${price}</div>
          <ul>${PLAN_FEATURES[key].map(f => `<li>${P(f)}${SOON_FEATURES[f] ? ` <span class="pro-soon-inline">${P("soon")}</span>` : ""}</li>`).join("")}</ul>
          ${cta}
        </div>`;

    }).join("");

    return `<div class="pro-plans">${cards}</div>`;

  }

  /* ---------------------------------------------------
     IMPOSTAZIONI
  --------------------------------------------------- */

  function viewSettings() {

    const s = st.settings || {};

    return `
      <form class="pro-form" id="proSettingsForm">
        <p class="pro-hint">${P("sHint")}</p>
        <label>${P("sName")}<input class="pro-input" name="business_name" value="${esc(s.business_name)}"></label>
        <label>${P("sPhone")}<input class="pro-input" name="phone" value="${esc(s.phone)}"></label>
        <label>${P("sAddr")}<input class="pro-input" name="address" value="${esc(s.address)}"></label>
        <div class="pro-form-actions">
          <button type="submit" class="primary">${P("save")}</button>
          <span class="pro-saved" id="proSaved"></span>
        </div>
      </form>`;

  }

  /* ---------------------------------------------------
     FINESTRE (modali)
  --------------------------------------------------- */

  function closeModal() {

    const modal = $("proModal");

    if (modal) modal.remove();

  }

  function openModal(title, innerHtml, onSubmit) {

    closeModal();

    const modal = document.createElement("div");

    modal.id = "proModal";
    modal.className = "pro-modal";
    modal.setAttribute("dir", currentLanguage === "tn" ? "rtl" : "ltr");

    modal.innerHTML = `
      <div class="pro-modal-box" role="dialog" aria-modal="true">
        <button type="button" class="pro-close" data-modal-close aria-label="${P("close")}">×</button>
        <h3>${esc(title)}</h3>
        <form class="pro-form" id="proModalForm">
          ${innerHtml}
          <p class="pro-error" id="proModalError"></p>
          <div class="pro-form-actions">
            <button type="submit" class="primary">${P("save")}</button>
            <button type="button" class="secondary" data-modal-close>${P("cancel")}</button>
          </div>
        </form>
      </div>`;

    modal.addEventListener("click", e => {

      if (e.target === modal || e.target.hasAttribute("data-modal-close")) {
        closeModal();
      }

    });

    modal.querySelector("#proModalForm").addEventListener("submit", async e => {

      e.preventDefault();

      const form = e.target;

      const button = form.querySelector("button[type=submit]");

      const errorBox = $("proModalError");

      errorBox.textContent = "";

      button.disabled = true;

      try {

        const values = {};

        new FormData(form).forEach((v, k) => { values[k] = String(v).trim(); });

        await onSubmit(values);

        closeModal();

      } catch (err) {

        errorBox.textContent = friendlyError(err);

        button.disabled = false;

      }

    });

    document.body.appendChild(modal);

    const first = modal.querySelector("input,select,textarea");

    if (first) first.focus();

  }

  const field = (name, label, value, attrs) =>
    `<label>${label}<input class="pro-input" name="${name}" value="${esc(value)}" ${attrs || ""}></label>`;

  const area = (name, label, value) =>
    `<label>${label}<textarea class="pro-input" name="${name}" rows="2">${esc(value)}</textarea></label>`;

  function options(list, selected, emptyLabel) {

    return (emptyLabel !== undefined ? `<option value="">${emptyLabel}</option>` : "") +
      list.map(o => `<option value="${esc(o[0])}" ${o[0] === selected ? "selected" : ""}>${esc(o[1])}</option>`).join("");

  }

  /* ---- spedizione ---- */

  function shipmentForm(existing) {

    const s = existing || { status: "received", packages: 1, weight_kg: "", price: "", paid: "" };

    const clientOpts = options(st.clients.map(c => [c.id, c.name]), s.client_id, P("noClientSel"));

    const tripOpts = options(
      st.trips.map(t => [t.id, fmtDate(t.trip_date) + " · " + cityName(t.from_city) + " → " + cityName(t.to_city)]),
      s.trip_id,
      P("noTripSel")
    );

    const statusOpts = options(STATUSES.map(x => [x, P(STATUS_KEY[x])]), s.status);

    const html = `
      <div class="pro-grid2">
        <label>${P("fClient")}<select class="pro-input" name="client_id">${clientOpts}</select></label>
        ${field("sender_name", P("fSender"), s.sender_name)}
        ${field("recipient_name", P("fRecipient"), s.recipient_name)}
        ${field("recipient_phone", P("fPhone"), s.recipient_phone, 'inputmode="tel"')}
        ${field("from_city", P("fFrom"), s.from_city, 'list="cityList" autocomplete="off"')}
        ${field("to_city", P("fTo"), s.to_city, 'list="cityList" autocomplete="off"')}
        ${field("packages", P("fPackages"), s.packages, 'inputmode="numeric"')}
        ${field("weight_kg", P("fWeight"), s.weight_kg, 'inputmode="decimal"')}
        ${field("price", P("fPrice"), s.price, 'inputmode="decimal"')}
        ${field("paid", P("fPaid"), s.paid, 'inputmode="decimal"')}
        <label>${P("fTrip")}<select class="pro-input" name="trip_id">${tripOpts}</select></label>
        <label>${P("fStatus")}<select class="pro-input" name="status">${statusOpts}</select></label>
      </div>
      ${field("description", P("fDesc"), s.description)}
      ${area("notes", P("fNotes"), s.notes)}`;

    openModal(existing ? P("editShip") : P("newShip"), html, async v => {

      const row = {
        client_id: v.client_id || null,
        trip_id: v.trip_id || null,
        sender_name: v.sender_name || null,
        recipient_name: v.recipient_name || null,
        recipient_phone: v.recipient_phone || null,
        from_city: v.from_city || null,
        to_city: v.to_city || null,
        description: v.description || null,
        packages: Math.max(1, Math.round(num(v.packages)) || 1),
        weight_kg: num(v.weight_kg),
        price: num(v.price),
        paid: num(v.paid),
        status: v.status || "received",
        notes: v.notes || null
      };

      // se scelgo un cliente e non ho scritto il mittente, uso il suo nome
      if (!row.sender_name && row.client_id) row.sender_name = clientName(row.client_id) || null;

      if (existing) {

        const { error } = await supabaseClient
          .from("hm_shipments").update(row).eq("id", existing.id);

        if (error) throw error;

        if (existing.status !== row.status) {
          await addEvent(existing.id, row.status, null);
        }

      } else {

        row.owner_id = uid();

        const { data, error } = await supabaseClient
          .from("hm_shipments").insert(row).select().single();

        if (error) throw error;

        await addEvent(data.id, row.status, null);

      }

      await reload();

    });

  }

  async function addEvent(shipmentId, status, note) {

    const { error } = await supabaseClient
      .from("hm_shipment_events")
      .insert({ shipment_id: shipmentId, owner_id: uid(), status, note: note || null });

    if (error) console.warn("Storico stato:", error);

  }

  /* ---- cliente ---- */

  function clientForm(existing) {

    const c = existing || {};

    const html = `
      <div class="pro-grid2">
        ${field("name", P("cName"), c.name, "required")}
        ${field("phone", P("cPhone"), c.phone, 'inputmode="tel"')}
        ${field("email", P("cEmail"), c.email, 'type="email"')}
        ${field("city", P("cCity"), c.city, 'list="cityList" autocomplete="off"')}
      </div>
      ${area("notes", P("cNotes"), c.notes)}`;

    openModal(existing ? P("editClient") : P("newClient"), html, async v => {

      if (!v.name) throw new Error("name");

      const row = {
        name: v.name,
        phone: v.phone || null,
        email: v.email || null,
        city: v.city || null,
        notes: v.notes || null
      };

      let result;

      if (existing) {
        result = await supabaseClient.from("hm_clients").update(row).eq("id", existing.id);
      } else {
        row.owner_id = uid();
        result = await supabaseClient.from("hm_clients").insert(row);
      }

      if (result.error) throw result.error;

      await reload();

    });

  }

  /* ---- partenza ---- */

  function tripForm(existing) {

    const t = existing || { trip_date: new Date().toISOString().slice(0, 10), capacity_kg: "" };

    const html = `
      <div class="pro-grid2">
        ${field("trip_date", P("tDate"), t.trip_date, 'type="date" required')}
        ${field("capacity_kg", P("tCap"), t.capacity_kg, 'inputmode="decimal"')}
        ${field("from_city", P("fFrom"), t.from_city, 'list="cityList" autocomplete="off" required')}
        ${field("to_city", P("fTo"), t.to_city, 'list="cityList" autocomplete="off" required')}
      </div>
      ${area("notes", P("fNotes"), t.notes)}`;

    openModal(existing ? P("editTrip") : P("newTrip"), html, async v => {

      if (!v.trip_date || !v.from_city || !v.to_city) throw new Error("required");

      const row = {
        trip_date: v.trip_date,
        from_city: v.from_city,
        to_city: v.to_city,
        capacity_kg: num(v.capacity_kg),
        notes: v.notes || null
      };

      let result;

      if (existing) {
        result = await supabaseClient.from("hm_trips").update(row).eq("id", existing.id);
      } else {
        row.owner_id = uid();
        result = await supabaseClient.from("hm_trips").insert(row);
      }

      if (result.error) throw result.error;

      await reload();

    });

  }

  /* ---- richiesta piano ---- */

  function upgradeForm(planKey) {

    const html = `
      <p class="pro-hint">${P("reqText")}</p>
      ${field("contact", P("reqContact"), "", "required")}
      ${area("message", P("reqMsg"), "")}`;

    openModal(P("reqTitle", { plan: P(PLAN_NAME[planKey]) }), html, async v => {

      if (!v.contact) throw new Error("contact");

      const { error } = await supabaseClient
        .from("hm_upgrade_requests")
        .insert({ user_id: uid(), plan: planKey, contact: v.contact, message: v.message || null });

      if (error) throw error;

      window.alert(P("reqThanks"));

    });

  }

  /* ---------------------------------------------------
     AZIONI
  --------------------------------------------------- */

  async function changeStatus(id, status) {

    const ship = st.shipments.find(s => s.id === id);

    if (!ship || ship.status === status) return;

    const note = window.prompt(P("notePrompt"), "");

    if (note === null) {
      render();
      return;
    }

    const { error } = await supabaseClient
      .from("hm_shipments").update({ status }).eq("id", id);

    if (error) {
      window.alert(friendlyError(error));
      render();
      return;
    }

    await addEvent(id, status, note.trim());

    await reload();

  }

  async function removeRow(table, id) {

    if (!window.confirm(P("confirmDelete"))) return;

    const { error } = await supabaseClient.from(table).delete().eq("id", id);

    if (error) {
      window.alert(friendlyError(error));
      return;
    }

    await reload();

  }

  function digits(phone) {

    let d = String(phone || "").replace(/[^\d+]/g, "");

    if (d.indexOf("00") === 0) d = d.slice(2);

    return d.replace(/\D/g, "");

  }

  function openWhatsApp(phone, text) {

    const d = digits(phone);

    const url = "https://wa.me/" + (d ? d : "") + "?text=" + encodeURIComponent(text || "");

    window.open(url, "_blank", "noopener");

  }

  async function copyText(text) {

    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e2) { /* niente */ }
      ta.remove();
    }

  }

  function toast(text) {

    let el = $("proToast");

    if (!el) {
      el = document.createElement("div");
      el.id = "proToast";
      el.className = "pro-toast";
      document.body.appendChild(el);
    }

    el.textContent = text;
    el.classList.add("show");

    clearTimeout(toast._t);

    toast._t = setTimeout(() => el.classList.remove("show"), 2200);

  }

  function exportCsv() {

    if (!plan().csv) {
      window.alert(P("proOnly"));
      st.tab = "plan";
      render();
      return;
    }

    const head = ["code", "date", "client", "sender", "recipient", "phone", "from", "to", "contents", "packages", "kg", "price", "paid", "status"];

    const q = v => '"' + String(v === null || v === undefined ? "" : v).replace(/"/g, '""') + '"';

    const rows = st.shipments.map(s => [
      s.code, fmtDate(s.created_at), clientName(s.client_id), s.sender_name, s.recipient_name,
      s.recipient_phone, s.from_city, s.to_city, s.description, s.packages, s.weight_kg,
      s.price, s.paid, P(STATUS_KEY[s.status])
    ].map(q).join(";"));

    const csv = "\ufeff" + [head.map(q).join(";")].concat(rows).join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "hezmaak-spedizioni.csv";

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(a.href), 1000);

  }

  function printReceipt(s) {

    const set = st.settings || {};

    const rtl = currentLanguage === "tn";

    const brand = plan().brand;

    const total = num(s.price);
    const paid = num(s.paid);

    const rows = [
      [P("fClient"), clientName(s.client_id) || s.sender_name],
      [P("fSender"), s.sender_name],
      [P("fRecipient"), s.recipient_name],
      [P("fPhone"), s.recipient_phone],
      [P("fFrom"), cityName(s.from_city)],
      [P("fTo"), cityName(s.to_city)],
      [P("fDesc"), s.description],
      [P("fPackages"), s.packages],
      [P("fWeight"), money(s.weight_kg)]
    ].filter(r => r[1] !== null && r[1] !== undefined && String(r[1]) !== "");

    const html = `<!DOCTYPE html>
<html lang="${currentLanguage === "tn" ? "ar" : currentLanguage}" dir="${rtl ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8">
<title>${esc(s.code)}</title>
<style>
  body{font-family:Arial,'DejaVu Sans',sans-serif;color:#0f172a;max-width:720px;margin:30px auto;padding:0 24px}
  h1{font-size:22px;margin:0 0 4px}
  .biz{color:#475569;font-size:14px;line-height:1.5;margin-bottom:22px}
  .code{display:inline-block;padding:6px 14px;border-radius:8px;background:#fff1f2;color:#be123c;font-weight:700;letter-spacing:.06em}
  table{width:100%;border-collapse:collapse;margin:20px 0}
  td{padding:9px 0;border-bottom:1px solid #e2e8f0;font-size:15px}
  td:first-child{color:#64748b;width:40%}
  .tot td{font-weight:700;font-size:17px}
  .foot{margin-top:40px;color:#94a3b8;font-size:12px;text-align:center}
  @media print{body{margin:0}}
</style></head>
<body>
  <h1>${esc(set.business_name || "")}</h1>
  <div class="biz">${esc([set.phone, set.address].filter(Boolean).join(" · "))}</div>
  <h1>${P("rcTitle")}</h1>
  <p><span class="code">${esc(s.code)}</span> &nbsp; ${P("rcDate")}: ${esc(fmtDate(s.created_at))}</p>
  <table>
    ${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}
    <tr class="tot"><td>${P("rcTotal")}</td><td>${money(total)} €</td></tr>
    <tr><td>${P("rcPaid")}</td><td>${money(paid)} €</td></tr>
    <tr class="tot"><td>${P("rcBalance")}</td><td>${money(Math.max(0, total - paid))} €</td></tr>
  </table>
  <p>${esc(trackingLink(s.code))}</p>
  ${brand ? `<div class="foot">${P("rcFoot")}</div>` : ""}
</body></html>`;

    const w = window.open("", "_blank");

    if (!w) return;

    w.document.write(html);
    w.document.close();
    w.focus();

    setTimeout(() => { try { w.print(); } catch (e) { /* niente */ } }, 350);

  }

  /* ---------------------------------------------------
     EVENTI
  --------------------------------------------------- */

  function onClick(e) {

    const el = e.target.closest("[data-act]");

    if (!el) return;

    const act = el.getAttribute("data-act");
    const id = el.getAttribute("data-id");

    if (act === "close") return closePro();
    if (act === "reload") { st.error = null; return reload(); }
    if (act === "tab") { st.tab = el.getAttribute("data-tab"); return render(); }

    if (act === "new-ship") return shipmentForm(null);
    if (act === "new-client") return clientForm(null);
    if (act === "new-trip") return tripForm(null);

    if (act === "edit-ship") return shipmentForm(st.shipments.find(x => x.id === id));
    if (act === "edit-client") return clientForm(st.clients.find(x => x.id === id));
    if (act === "edit-trip") return tripForm(st.trips.find(x => x.id === id));

    if (act === "del-ship") return removeRow("hm_shipments", id);
    if (act === "del-client") return removeRow("hm_clients", id);
    if (act === "del-trip") return removeRow("hm_trips", id);

    if (act === "export") return exportCsv();
    if (act === "upgrade") return upgradeForm(el.getAttribute("data-plan"));

    if (act === "copy-link") {
      const s = st.shipments.find(x => x.id === id);
      if (s) copyText(trackingLink(s.code)).then(() => toast(P("aCopied")));
      return;
    }

    if (act === "wa") {

      const s = st.shipments.find(x => x.id === id);

      if (!s) return;

      const text = P("waMsg", {
        name: s.recipient_name || clientName(s.client_id) || "",
        code: s.code,
        status: P(STATUS_KEY[s.status]),
        link: trackingLink(s.code)
      });

      return openWhatsApp(s.recipient_phone, text);

    }

    if (act === "wa-client") {
      const c = st.clients.find(x => x.id === id);
      if (c) openWhatsApp(c.phone, "");
      return;
    }

    if (act === "receipt") {
      const s = st.shipments.find(x => x.id === id);
      if (s) printReceipt(s);
    }

  }

  function onChange(e) {

    const t = e.target;

    if (t.hasAttribute && t.hasAttribute("data-status-for")) {
      changeStatus(t.getAttribute("data-status-for"), t.value);
      return;
    }

    if (t.id === "proStatusFilter") {
      st.statusFilter = t.value;
      const list = $("proList");
      if (list) list.innerHTML = shipListHtml();
    }

  }

  function onInput(e) {

    if (e.target.id === "proSearch") {

      st.search = e.target.value;

      const list = $("proList");

      if (list) list.innerHTML = shipListHtml();

    }

  }

  // salvataggio impostazioni (il form è dentro l'overlay)
  document.addEventListener("submit", async e => {

    if (!e.target || e.target.id !== "proSettingsForm") return;

    e.preventDefault();

    const form = e.target;

    const v = {};

    new FormData(form).forEach((val, k) => { v[k] = String(val).trim(); });

    const { error } = await supabaseClient
      .from("hm_settings")
      .upsert({
        user_id: uid(),
        business_name: v.business_name || null,
        phone: v.phone || null,
        address: v.address || null,
        updated_at: new Date().toISOString()
      });

    const saved = $("proSaved");

    if (error) {
      if (saved) saved.textContent = friendlyError(error);
      return;
    }

    st.settings = { business_name: v.business_name, phone: v.phone, address: v.address };

    if (saved) saved.textContent = "✓ " + P("saved");

  });

  /* ---------------------------------------------------
     API PUBBLICA
  --------------------------------------------------- */

  window.openPro = openPro;
  window.closePro = closePro;

  window.refreshProLanguage = function () {
    if (st.open) render();
  };

  // se l'utente esce o cambia account, azzero i dati
  window.resetPro = function () {
    st.loaded = false;
    st.ready = false;
    st.shipments = [];
    st.clients = [];
    st.trips = [];
    closePro();
  };

  window.addEventListener("load", () => {

    if (location.hash === "#pro") {
      setTimeout(() => { if (currentUser) openPro(); else openAuth("login"); }, 1200);
    }

  });

})();
