# Skivereniging Rigor Mortis 🎿

> *Geen genade op de piste. Wel gezelligheid in de bar.*

Website van **Skivereniging Rigor Mortis** — gebouwd met [Hugo](https://gohugo.io/) en gehost via GitHub Pages.

## 🏗 Architectuur

| Onderdeel | Technologie |
|-----------|-------------|
| Site generator | Hugo (static) |
| Hosting | GitHub Pages |
| Deployment | GitHub Actions |
| Custom domain | `www.rigormortis.nl` |

## 📁 Structuur

```
.
├── content/posts/      # Berichten & verslagen
├── layouts/            # Custom Hugo templates
├── static/css/         # Stijlen (dark ski theme)
├── static/js/          # Snow animatie & interactie
├── static/images/      # Afbeeldingen
├── hugo.toml           # Configuratie
└── .github/workflows/pages.yml  # CI/CD
```

## 🚀 Lokaal

```bash
# Vereiste: Hugo v0.140+ (https://gohugo.io/installation/)
hugo server        # http://localhost:1313
hugo --minify --gc # productie build → public/
```

## ✍️ Nieuw bericht toevoegen

Maak `content/posts/mijn-bericht.md`:

```markdown
---
title: "Titel"
date: 2025-01-01T12:00:00+00:00
categories: ["2025", "Locatie"]
summary: "Korte samenvatting voor de kaart."
---
Inhoud hier...
```

## ⚙️ GitHub Pages (eenmalig instellen)

**Settings → Pages → Source → GitHub Actions**

## 🔄 Deployment

- **Push naar `main`** → automatisch bouwen + deployen
- **Pull request** → bouw + preview artifact (download in Actions tab)
- **Handmatig** → "Run workflow" in Actions

## 🎨 Features

- 🌨 Realtime canvas sneeuw animatie
- 🌌 Aurora / noorderlicht effect in de hero
- 🏔 Parallax hero met zoom
- 🃏 Glassmorphism post kaarten
- 📱 Volledig responsive