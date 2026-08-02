"use client";

import { useState } from "react";

const phone = "+967776060802";

const contactRows = [
  { label: "Phone", value: "+967 776 060 802", href: `tel:${phone}`, icon: "✦" },
  { label: "Email", value: "omar@eshaqltd.com", href: "mailto:omar@eshaqltd.com", icon: "↗" },
  { label: "Location", value: "Yemen, Sana’a", href: "https://maps.google.com/?q=Sana'a%2C%20Yemen", icon: "●" },
];

export default function Home() {
  const [notice, setNotice] = useState("");

  async function openWeChat() {
    try {
      await navigator.clipboard.writeText(phone);
      setNotice("Phone number copied — opening WeChat");
    } catch {
      setNotice("Opening WeChat");
    }
    window.location.href = "weixin://";
    window.setTimeout(() => setNotice(""), 3200);
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <article className="contact-card" aria-label="Digital business card for Omar Abdullah Eshaq">
        <header className="identity-panel">
          <div className="top-line">
            <span>Digital contact</span>
            <span className="status"><i /> Available</span>
          </div>

          <div className="logo-orbit">
            <div className="logo-wrap">
              <img src="/logo.png" alt="Eshaq Trading Company logo" />
            </div>
          </div>

          <p className="eyebrow">Assistant General Manager</p>
          <h1>Omar Abdullah<br />Eshaq</h1>
          <p className="company">Eshaq Trading Company</p>
        </header>

        <section className="details-panel">
          <p className="section-kicker">Contact details</p>

          <div className="contact-list">
            {contactRows.map((item) => (
              <a className="contact-row" href={item.href} key={item.label} target={item.label === "Location" ? "_blank" : undefined} rel="noreferrer">
                <span className={`row-icon icon-${item.label.toLowerCase()}`} aria-hidden="true">{item.icon}</span>
                <span className="row-copy">
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </span>
                <span className="row-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <div className="actions">
            <a className="action action-primary" href="/omar-abdullah-eshaq.vcf" download>
              <span className="action-symbol" aria-hidden="true">＋</span>
              <span><small>One tap</small>Save Contact</span>
              <span aria-hidden="true">↓</span>
            </a>

            <a className="action action-whatsapp" href="https://wa.me/967776060802" target="_blank" rel="noreferrer">
              <span className="action-symbol whatsapp-mark" aria-hidden="true">◔</span>
              <span><small>Message directly</small>Chat on WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>

            <button className="action action-wechat" type="button" onClick={openWeChat}>
              <span className="action-symbol" aria-hidden="true">••</span>
              <span><small>Connect instantly</small>Add on WeChat</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>

        <footer>
          <span>Eshaq Trading Company</span>
          <span className="footer-mark">E</span>
          <span>Est. 1995</span>
        </footer>
      </article>

      <p className={`toast ${notice ? "is-visible" : ""}`} role="status" aria-live="polite">{notice}</p>
    </main>
  );
}
