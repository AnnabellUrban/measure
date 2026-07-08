# MeasureFit PWA – Version 2

## Neu in Version 3

- Fixierte Bottom-Navigation mit Icons
- Unterseiten: Übersicht, Body, Workouts, Einstellungen
- Tägliche Motivationssprüche mit Lipödem-/Selbstfürsorge-Fokus
- Gesamtfortschritt mit animierter Silhouette
- Training-heute-Anzeige abhängig von gewählten Wochentagen
- Abhakbare Übungen auf der Übersichtsseite
- Tägliche abhakbare Alltagschallenge
- Wochenübersicht mit Trainings- und Ruhetagen
- Body-Seite mit Körpersilhouette und Messpunkten
- Messwerte ohne Bauch und Hals
- Veränderungsanzeige seit letzter Messung
- Gewichtsstatistik als Nebenbereich
- Workouts mit aufklappbaren Übungserklärungen
- Einstellungen mit konkreten Trainingstagen
- Monatsschwerpunkt als Auswahl statt Freitext
- Intensitätsfeedback: zu leicht / genau richtig / anstrengend / zu schwer
- Lokaler Datenspeicher und JSON-Export
- PWA-Manifest und Service Worker

## Lokal testen

```bash
python3 -m http.server 8080
```

Dann öffnen:

```text
http://localhost:8080
```

## Kostenlos veröffentlichen

Geeignet für GitHub Pages, Netlify, Vercel oder Cloudflare Pages.

Auf dem iPhone in Safari öffnen → Teilen → Zum Home-Bildschirm.

## Version 3 Anpassungen

- Schönere, nicht-interaktive Silhouetten
- Wochenübersicht mit Emojis statt abgeschnittenem Text
- Entfernte Zusatztexte unter den Silhouetten
- Neuer Service-Worker-Cache: measurefit-v3-cache
