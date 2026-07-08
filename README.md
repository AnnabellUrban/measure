# MeasureFit PWA – Version 4 / stabile Grundlage

Diese Version ist die neue technische Basis für zukünftige Updates.

## Wichtigste Änderung

Die App speichert Daten jetzt unter einem stabilen Schlüssel:

```text
measurefit_data
```

Die Daten enthalten außerdem:

```json
{
  "appVersion": "1.0.0",
  "dataVersion": 1
}
```

Damit können spätere Versionen Daten automatisch migrieren, ohne dass Einträge verloren gehen.

## Automatische Übernahme alter Daten

Beim ersten Start prüft die App:

1. Gibt es bereits neue Daten unter `measurefit_data`?
2. Falls nicht: Gibt es alte Daten unter `measurefit_v2` oder `measurefit_v1`?
3. Falls ja: Diese Daten werden automatisch in das neue Format übernommen.

## Backup

In den Einstellungen gibt es jetzt:

- Backup erstellen
- Backup importieren

Vor größeren Updates empfiehlt sich ein Backup.

## Enthaltene Funktionen

- Bottom-Navigation
- Übersicht mit täglichem Spruch
- Gesamtfortschritt
- Trainingstag-Erkennung über Wochentage
- Tageschallenge
- Body-Seite mit schöner Silhouette
- Messwerte und Veränderung seit letzter Messung
- Gewichtsstatistik
- Workouts mit Übungserklärungen
- Einstellungen mit Trainingssteuerung
- Intensitätsfeedback
- Lokaler Speicher
- PWA-Manifest und Service Worker

## Update-Hinweis

Wenn nach dem Hochladen auf GitHub noch die alte Version erscheint, liegt es meistens am Safari-/PWA-Cache.

Diese Version nutzt:

```text
measurefit-v4-cache
```

Falls Safari trotzdem alte Dateien zeigt: Websitedaten löschen oder die PWA vom Home-Bildschirm entfernen und neu hinzufügen.

## Lokal testen

```bash
python3 -m http.server 8080
```

Dann öffnen:

```text
http://localhost:8080
```
