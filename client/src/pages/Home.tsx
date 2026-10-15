import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileUser,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  QrCode,
  ScanLine,
  Search,
  Share2,
  Sparkles,
  UserRoundPlus,
  X,
  Zap,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { siTiktok, siWhatsapp } from "simple-icons";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_URL = "https://digigeek.manus.space/";
const WHATSAPP_URL = "https://wa.me/773831364?text=Bonjour%20Mouhamed%2C%20je%20viens%20de%20voir%20ta%20carte%20DigiGeek.";

function SimpleBrandIcon({ path, title }: { path: string; title: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={title} fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const TikTokIcon = () => <SimpleBrandIcon path={siTiktok.path} title="TikTok" />;
const WhatsAppIcon = () => <SimpleBrandIcon path={siWhatsapp.path} title="WhatsApp" />;

const socials = [
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "mouhamed-dione-60428a335",
    description: "Parcours & réseau professionnel",
    url: "https://www.linkedin.com/in/mouhamed-dione-60428a335",
    color: "#72a8ff",
    icon: Linkedin,
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@mouhameddione69",
    description: "Coulisses, idées & quotidien",
    url: "https://www.instagram.com/mouhameddione69/",
    color: "#ff7bba",
    icon: Instagram,
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@sa_xel_mooy_sa_koom",
    description: "Du contenu tech qui se partage",
    url: "https://www.tiktok.com/@sa_xel_mooy_sa_koom",
    color: "#8be9e8",
    icon: TikTokIcon,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "Discussion directe",
    description: "Parler d’un projet ou d’une idée",
    url: WHATSAPP_URL,
    color: "#68e6a1",
    icon: WhatsAppIcon,
  },
];

const focusAreas = [
  {
    icon: Code2,
    number: "01",
    title: "Build digital",
    text: "Des expériences web utiles, solides et pensées pour grandir.",
    color: "#72a8ff",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Créer du contenu",
    text: "Rendre la tech plus claire, plus humaine et plus accessible.",
    color: "#d49aff",
  },
  {
    icon: BriefcaseBusiness,
    number: "03",
    title: "Entreprendre",
    text: "Transformer les idées en produits, projets et opportunités.",
    color: "#68e6a1",
  },
];

function makeVCard() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Mouhamed Dione;;;",
    "FN:Mouhamed Dione",
    "ORG:DigiGeek",
    "TITLE:Développeur full stack · Entrepreneur digital · Créateur de contenu tech",
    "NOTE:Créateur de DigiGeek, une marque dédiée à la tech et aux solutions digitales.",
    "URL:https://digigeek.manus.space/",
    "X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/mouhamed-dione-60428a335",
    "X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/mouhameddione69/",
    "X-SOCIALPROFILE;TYPE=tiktok:https://www.tiktok.com/@sa_xel_mooy_sa_koom",
    "END:VCARD",
  ].join("\r\n");
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [activeQr, setActiveQr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filteredSocials = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return socials;
    return socials.filter(item =>
      `${item.name} ${item.handle} ${item.description}`.toLowerCase().includes(query),
    );
  }, [search]);

  const selectedSocial = socials.find(item => item.id === activeQr);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    if (!activeQr) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveQr(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeQr]);

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Lien de la carte copié");
    } catch {
      setNotice("Copie non disponible dans ce navigateur");
    }
  };

  const sharePage = async () => {
    const shareData = {
      title: "Mouhamed Dione — DigiGeek",
      text: "Développeur full stack · Entrepreneur digital · Créateur de contenu tech",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }
    await copyPageLink();
  };

  const downloadContact = () => {
    downloadFile(makeVCard(), "mouhamed-dione-digigeek.vcf", "text/vcard;charset=utf-8");
    setNotice("Fiche contact prête à enregistrer");
  };

  const openSocial = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-lines" aria-hidden="true" />

      <header className="topbar content-width">
        <a className="brand-lockup" href="#top" aria-label="DigiGeek, revenir en haut de la page">
          <span className="brand-mark" aria-hidden="true">
            <span>DG</span>
          </span>
          <span className="brand-copy">
            <strong>DigiGeek</strong>
            <small>digital identity / 01</small>
          </span>
        </a>
        <div className="topbar-note">
          <span className="status-dot" aria-hidden="true" />
          <span>Construire. Créer. Transmettre.</span>
        </div>
      </header>

      <main id="top" className="content-width main-layout">
        <section className="hero-panel" aria-labelledby="profile-title">
          <div className="eyebrow"><span>01</span> La personne derrière la marque</div>
          <div className="hero-identity">
            <div className="portrait" aria-label="Monogramme de Mouhamed Dione" role="img">
              <div className="portrait-orbit orbit-one" />
              <div className="portrait-orbit orbit-two" />
              <span>MD</span>
              <i>+</i>
            </div>
            <div className="identity-meta">
              <span className="identity-kicker">Mouhamed Dione</span>
              <h1 id="profile-title">Je donne une forme<br /><em>utile</em> aux idées tech.</h1>
            </div>
          </div>
          <p className="hero-description">
            Informaticien, <strong>développeur full stack</strong>, entrepreneur digital et créateur de contenu tech. DigiGeek est la marque que je construis pour partager, concevoir et faire avancer le digital.
          </p>
          <div className="role-row" aria-label="Rôles de Mouhamed Dione">
            <span>FULL STACK</span><span>ENTREPRENEUR</span><span>TECH CREATOR</span>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle size={17} aria-hidden="true" />
              Me contacter
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button className="button button-secondary" type="button" onClick={downloadContact}>
              <UserRoundPlus size={17} aria-hidden="true" />
              Ajouter aux contacts
            </button>
          </div>
          <div className="hero-utility">
            <button type="button" onClick={sharePage}><Share2 size={15} aria-hidden="true" /> Partager ma carte</button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={copyPageLink}><Copy size={15} aria-hidden="true" /> Copier le lien</button>
          </div>
          <div className="hero-footnote"><Zap size={14} aria-hidden="true" /> Une identité personnelle. Une marque en mouvement.</div>
        </section>

        <div className="content-stack">
          <section className="brand-card" aria-labelledby="brand-title">
            <div className="section-heading compact-heading">
              <div>
                <span className="section-index">02 / LA MARQUE</span>
                <h2 id="brand-title">DigiGeek, le terrain de jeu.</h2>
              </div>
              <div className="brand-stamp" aria-hidden="true"><ScanLine size={17} /><span>DG<br />LAB</span></div>
            </div>
            <p className="brand-lede">Une marque pensée pour rendre la technologie plus simple à comprendre, plus belle à utiliser et plus proche des réalités.</p>
            <div className="focus-grid">
              {focusAreas.map(({ icon: Icon, number, title, text, color }) => (
                <article className="focus-card" key={number} style={{ "--focus-color": color } as React.CSSProperties}>
                  <div className="focus-top"><span>{number}</span><Icon size={18} aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="social-section" aria-labelledby="social-title">
            <div className="section-heading">
              <div>
                <span className="section-index">03 / RESTONS CONNECTÉS</span>
                <h2 id="social-title">Les bons liens, au bon endroit.</h2>
              </div>
              <span className="link-count">{filteredSocials.length.toString().padStart(2, "0")} liens</span>
            </div>
            <div className="search-field">
              <Search size={16} aria-hidden="true" />
              <label className="sr-only" htmlFor="link-search">Rechercher dans les liens</label>
              <input id="link-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher un lien…" />
              {search && <button type="button" onClick={() => setSearch("")} aria-label="Effacer la recherche"><X size={15} /></button>}
            </div>
            <div className="social-list">
              {filteredSocials.map(({ id, name, handle, description, url, color, icon: Icon }) => (
                <article className="social-row" key={id} style={{ "--social-color": color } as React.CSSProperties}>
                  <button className="social-main" type="button" onClick={() => openSocial(url)} aria-label={`Ouvrir ${name}`}>
                    <span className="social-icon"><Icon size={20} aria-hidden="true" /></span>
                    <span className="social-copy"><strong>{name}</strong><span>{description}</span><small>{handle}</small></span>
                    <ArrowUpRight className="social-arrow" size={18} aria-hidden="true" />
                  </button>
                  <button className="qr-action" type="button" onClick={() => setActiveQr(id)} aria-label={`Afficher le QR code de ${name}`}>
                    <QrCode size={16} aria-hidden="true" /><span>QR</span>
                  </button>
                </article>
              ))}
            </div>
            {filteredSocials.length === 0 && <p className="empty-state">Aucun lien ne correspond à « {search} ».</p>}
          </section>

          <section className="projects-card" aria-labelledby="projects-title">
            <div className="section-heading">
              <div>
                <span className="section-index">04 / À VENIR</span>
                <h2 id="projects-title">Ce que je construis.</h2>
              </div>
              <span className="pill-muted">PORTFOLIO / 2026</span>
            </div>
            <div className="project-list">
              <article className="project-item project-featured">
                <div className="project-number">A</div>
                <div className="project-copy"><span className="project-type">DIGIGEEK LAB</span><h3>Des projets qui relient la tech aux vrais besoins.</h3><p>Un espace pour découvrir bientôt mes réalisations web, mes expérimentations et les coulisses de la création.</p></div>
                <span className="project-icon"><Layers3 size={20} aria-hidden="true" /></span>
              </article>
              <article className="project-item">
                <div className="project-number">B</div>
                <div className="project-copy"><span className="project-type">CONTENT SERIES</span><h3>La tech expliquée sans bruit.</h3><p>Conseils, découvertes et retours d’expérience pour apprendre en construisant.</p></div>
                <span className="project-icon"><Globe2 size={20} aria-hidden="true" /></span>
              </article>
            </div>
            <button className="project-link" type="button" onClick={() => setNotice("La section projets arrive bientôt")}>Explorer l’espace projets <ChevronRight size={16} aria-hidden="true" /></button>
          </section>

          <section className="contact-strip" aria-labelledby="contact-title">
            <div className="contact-icon"><Mail size={19} aria-hidden="true" /></div>
            <div><span className="section-index">UN PROJET EN TÊTE ?</span><h2 id="contact-title">On en parle simplement.</h2></div>
            <a className="contact-arrow" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Écrire à Mouhamed sur WhatsApp"><ArrowUpRight size={20} /></a>
          </section>

          <footer className="footer">
            <span>© 2026 Mouhamed Dione</span><span className="footer-divider" aria-hidden="true">/</span><span>Créateur de <strong>DigiGeek</strong></span><span className="footer-right">Made with intent <Sparkles size={13} aria-hidden="true" /></span>
          </footer>
        </div>
      </main>

      {notice && <div className="toast" role="status"><Check size={16} aria-hidden="true" /> {notice}</div>}

      {selectedSocial && (
        <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setActiveQr(null); }}>
          <section className="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-title">
            <button className="modal-close" type="button" onClick={() => setActiveQr(null)} ref={closeButtonRef} aria-label="Fermer le QR code"><X size={18} /></button>
            <div className="qr-dialog-label"><QrCode size={15} aria-hidden="true" /> CARTE DIGITALE / {selectedSocial.name.toUpperCase()}</div>
            <h2 id="qr-title">Scanner pour ouvrir<br /><em>{selectedSocial.name}</em></h2>
            <p className="qr-handle">{selectedSocial.handle}</p>
            <div className="qr-frame" style={{ "--qr-color": selectedSocial.color } as React.CSSProperties}>
              <QRCodeSVG value={selectedSocial.url} size={238} level="H" bgColor="#f5f7ff" fgColor="#101421" includeMargin />
              <span className="qr-corner corner-tl" /><span className="qr-corner corner-tr" /><span className="qr-corner corner-bl" /><span className="qr-corner corner-br" />
            </div>
            <div className="qr-dialog-actions"><a className="button button-primary" href={selectedSocial.url} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Ouvrir le lien</a><button className="button button-secondary" type="button" onClick={() => { const svg = document.querySelector(".qr-frame svg"); if (!svg) return; downloadFile(new XMLSerializer().serializeToString(svg), `qr-${selectedSocial.id}.svg`, "image/svg+xml"); setNotice("QR code téléchargé"); }}><Download size={16} /> Télécharger</button></div>
            <button className="qr-copy" type="button" onClick={async () => { await navigator.clipboard?.writeText(selectedSocial.url); setNotice("Lien copié"); }}><Copy size={14} aria-hidden="true" /><span>{selectedSocial.url.replace(/^https:\/\//, "")}</span><strong>Copier</strong></button>
          </section>
        </div>
      )}
    </div>
  );
}
