# MeasureFit PWA – Version 5 / Update-sichere Grundlage

Diese Version verbessert den PWA-Update-Mechanismus, damit du nach Updates nicht jedes Mal Safari-Websitedaten löschen musst.

## Wichtig

Deine persönlichen Daten liegen weiterhin lokal auf deinem Gerät unter:

```text
measurefit_data
```

Sie werden nicht gelöscht, wenn du Dateien auf GitHub ersetzt.

## Neu in Version 5

- stabiler Datenspeicher `measurefit_data`
- Datenversion `dataVersion: 1`
- App-Version `appVersion: 1.0.1`
- automatische Übernahme alter v2/v3/v4-Daten
- Backup erstellen
- Backup importieren
- neuer Service Worker `measurefit-v5-cache`
- automatische Löschung alter MeasureFit-Caches
- Update-Hinweis in der App
- Button „Aktualisieren“, ohne lokale Daten zu löschen
- HTML wird network-first geladen, damit GitHub-Updates schneller sichtbar werden
- statische Dateien werden weiterhin offlinefähig gecacht

## So aktualisierst du künftig

1. Neue Dateien auf GitHub hochladen und alte ersetzen.
2. App/Safari öffnen.
3. Falls eine neue Version erkannt wird, erscheint ein Hinweis.
4. Auf „Aktualisieren“ tippen.
5. Die App lädt neu, deine Daten bleiben erhalten.

## Vor größeren Updates

Trotzdem empfohlen:

Einstellungen → Backup erstellen

## GitHub-Struktur

Alle Dateien im Hauptordner:

```text
/
├── index.html
├── styles.css
├── app.js
├── manifest.json
├── sw.js
├── README.md
├── icon-192.png
└── icon-512.png
```

## Falls doch einmal alte Versionen hängen

Nicht sofort Websitedaten löschen. Erst:

1. App komplett schließen und neu öffnen.
2. Safari-Seite neu laden.
3. 1–2 Minuten warten und erneut öffnen.
4. Backup erstellen, falls möglich.
5. Erst danach als letzte Option Websitedaten löschen.
