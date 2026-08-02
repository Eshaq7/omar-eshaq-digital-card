"use client";

import { CSSProperties, MouseEvent, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiDownload,
  FiMail,
  FiMapPin,
  FiPhoneCall,
  FiShare2,
} from "react-icons/fi";
import { FaWhatsapp, FaWeixin } from "react-icons/fa";
import { PiAddressBookTabsFill } from "react-icons/pi";

const phone = "+967776060802";
const email = "omar@eshaqltd.com";

const contactRows = [
  { label: "Phone", value: "+967 776 060 802", href: `tel:${phone}`, icon: FiPhoneCall },
  { label: "Email", value: email, href: `mailto:${email}`, icon: FiMail },
  { label: "Location", value: "Yemen, Sana’a", href: "https://maps.google.com/?q=Sana'a%2C%20Yemen", icon: FiMapPin, external: true },
];

export default function Home() {
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState("");
  const cardRef = useRef<HTMLElement>(null);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  async function copyValue(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      showNotice(`${label} copied`);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      showNotice(`Could not copy ${label.toLowerCase()}`);
    }
  }

  async function shareCard() {
    const data = {
      title: "Omar Abdullah Eshaq",
      text: "Digital contact card for Omar Abdullah Eshaq — Eshaq Trading Company",
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else await copyValue(window.location.href, "Link");
    } catch {
      // Closing the native share panel needs no error message.
    }
  }

  async function openWeChat() {
    await copyValue(phone, "Phone number");
    showNotice("Number copied — opening WeChat");
    window.location.href = "weixin://";
  }

  function tiltCard(event: MouseEvent<HTMLElement>) {
    const card = cardRef.current;
    if (!card || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${-y * 1.3}deg`);
    card.style.setProperty("--tilt-y", `${x * 1.3}deg`);
    card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function resetTilt() {
    const card = cardRef.current;
    card?.style.setProperty("--tilt-x", "0deg");
    card?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <main className="page-shell">
      <div className="brand-halo halo-one" />
      <div className="brand-halo halo-two" />

      <article
        className="contact-card"
        aria-label="Digital business card for Omar Abdullah Eshaq"
        ref={cardRef}
        onMouseMove={tiltCard}
        onMouseLeave={resetTilt}
        style={{ "--tilt-x": "0deg", "--tilt-y": "0deg", "--glow-x": "50%", "--glow-y": "20%" } as CSSProperties}
      >
        <header className="identity-panel">
          <div className="top-bar">
            <span className="digital-label"><i /> Digital contact</span>
            <button className="share-button" type="button" onClick={shareCard} aria-label="Share digital contact card">
              <FiShare2 />
            </button>
          </div>

          <div className="logo-stage" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <div className="logo-wrap">
              <img src="/logo.png" alt="" />
              <span className="logo-shine" />
            </div>
          </div>

          <div className="availability"><i /> Available for business</div>
          <p className="eyebrow">Assistant General Manager</p>
          <h1>Omar Abdullah <span>Eshaq</span></h1>
          <p className="company">Eshaq Trading Company</p>

          <div className="identity-divider"><span>ETC</span></div>
        </header>

        <section className="details-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Contact</p>
              <h2>Let’s connect</h2>
            </div>
            <span className="section-number">01 — 03</span>
          </div>

          <div className="contact-list">
            {contactRows.map((item, index) => {
              const Icon = item.icon;
              return (
                <div className="contact-row" key={item.label}>
                  <a className="row-main" href={item.href} target={item.external ? "_blank" : undefined} rel="noreferrer">
                    <span className="row-index">0{index + 1}</span>
                    <span className="row-icon" aria-hidden="true"><Icon /></span>
                    <span className="row-copy">
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </span>
                    <FiArrowUpRight className="row-arrow" aria-hidden="true" />
                  </a>
                  {item.label !== "Location" && (
                    <button
                      type="button"
                      className="copy-button"
                      onClick={() => copyValue(item.label === "Phone" ? phone : email, item.label)}
                      aria-label={`Copy ${item.label.toLowerCase()}`}
                    >
                      {copied === item.label ? <FiCheck /> : <FiCopy />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="actions">
            <a className="action action-primary" href="/omar-abdullah-eshaq.vcf" download>
              <span className="action-icon"><PiAddressBookTabsFill /></span>
              <span><small>Add to your address book</small>Save Contact</span>
              <FiDownload />
            </a>

            <a className="action action-whatsapp" href="https://wa.me/967776060802" target="_blank" rel="noreferrer">
              <span className="action-icon"><FaWhatsapp /></span>
              <span><small>Message directly</small>Chat on WhatsApp</span>
              <FiArrowUpRight />
            </a>

            <button className="action action-wechat" type="button" onClick={openWeChat}>
              <span className="action-icon"><FaWeixin /></span>
              <span><small>Number copied automatically</small>Add on WeChat</span>
              <FiArrowUpRight />
            </button>
          </div>
        </section>

        <footer>
          <span>Eshaq Trading Company</span>
          <span className="footer-emblem">E</span>
          <span>Established 1995</span>
        </footer>
      </article>

      <p className={`toast ${notice ? "is-visible" : ""}`} role="status" aria-live="polite">
        <FiCheck aria-hidden="true" /> {notice}
      </p>
    </main>
  );
}
