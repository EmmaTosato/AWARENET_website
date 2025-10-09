# AWARENET Website

Sito web statico multipagina pensato per presentare il network AWARENET, le sue attività di ricerca e i partner coinvolti.

## Struttura del progetto

```
.
├── index.html               # Home page con panoramica del network
├── research.html            # Focus su obiettivi e filoni di ricerca
├── team.html                # Sezione partner e profili del team
├── news.html                # Archivio notizie ed eventi
├── event.html               # Template dinamico per il dettaglio evento
├── contact.html             # Form e recapiti per i contatti
├── assets
│   ├── css
│   │   └── styles.css       # Stili condivisi e varianti tema
│   ├── js
│   │   └── main.js          # Navigazione mobile, anno footer, utilità pagina eventi
│   ├── images               # Loghi, segnaposto e icone SVG
│   ├── icons_team           # Cartella pronta per eventuali icone dedicate al team
│   ├── icons_uni            # Cartella pronta per eventuali loghi/icone universitarie
│   └── photos_team          # Spazio dove caricare le foto del team
└── README.md
```

## Pagine disponibili

- **Home (`index.html`)** – Hero principale, call-to-action verso ricerca, team e news, obiettivi del network e contatti rapidi.
- **Research (`research.html`)** – Riassume missione scientifica, aree tematiche e modalità di collaborazione.
- **Team (`team.html`)** – Presenta istituzioni partner e profili dei membri con link social/professionali.
- **News (`news.html`)** – Cards per aggiornamenti, eventi e approfondimenti in evidenza.
- **Event (`event.html`)** – Pagina di dettaglio riutilizzabile: il titolo può essere passato come query string (`?title=...`) e viene aggiornato dallo script principale; previsto spazio per immagine e testo descrittivo.
- **Contact (`contact.html`)** – Informazioni di contatto e invito alla collaborazione.

Tutte le pagine condividono la stessa barra di navigazione responsive e il footer con aggiornamento automatico dell'anno corrente.

## Stili e risorse condivise

- `assets/css/styles.css` contiene variabili di colore, layout CSS grid/flex e varianti tema usate dalle diverse pagine. Personalizza qui palette, tipografia e componenti comuni.
- `assets/js/main.js` gestisce il menu mobile (apertura/chiusura e stato `aria-expanded`), aggiorna dinamicamente l'anno nel footer e, se presente la pagina evento, imposta titolo, `<title>` del documento e formattazione del placeholder rispetto ai media caricati.
- Le sottocartelle di `assets/images` raccolgono segnaposto (es. `placeholders/`) e icone social (`social/`). Sostituisci i file con le versioni definitive mantenendo i percorsi, oppure aggiorna gli attributi `src` nei file HTML.

## Personalizzazione rapida

1. **Logo e identità** – aggiorna l'elemento `.navbar__crest` o sostituisci `assets/images/logo.png` con il tuo logo.
2. **Contenuti** – modifica testi direttamente nei file HTML; ogni sezione è già organizzata con classi semantiche (`section__heading`, `card-grid`, ecc.).
3. **Eventi** – duplica `event.html` per creare landing dedicate oppure collega dalla pagina `news.html` aggiungendo il parametro `title` all'URL per personalizzare il titolo in modo rapido.
4. **Immagini del team** – carica le foto in `assets/photos_team` oppure sostituisci i segnaposto in `assets/images/placeholders/` con versioni reali (consigliata la stessa proporzione per mantenere il layout).

## Anteprima locale

Essendo un sito statico è sufficiente aprire una pagina nel browser. Per una migliore esperienza durante lo sviluppo può essere utile un piccolo server locale:

```bash
python3 -m http.server
```

Visitando `http://localhost:8000` potrai navigare tutte le pagine e verificare il comportamento della barra di navigazione responsive e della pagina eventi dinamica.

## Pubblicazione su GitHub Pages

Il repository include un workflow GitHub Actions (`.github/workflows/deploy.yml`) che pubblica automaticamente il sito come GitHub Page. Il workflow esegue due job: il primo crea l'artifact con tutti i file necessari al deploy (inclusa la cartella `assets`), il secondo lo pubblica sull'ambiente GitHub Pages.

1. Vai su **Settings → Pages** nel repository GitHub.
2. Seleziona **GitHub Actions** come sorgente di pubblicazione.
3. Verifica che il branch predefinito sia `main` e salva.
4. Ogni push su `main` (oppure l'avvio manuale del workflow) farà partire la pipeline che creerà l'artifact e aggiornerà l'URL pubblico del sito.

Per evitare la trasformazione Jekyll automatica di GitHub Pages è presente un file `.nojekyll` nella root del progetto. Quando la prima esecuzione del workflow sarà completata, GitHub mostrerà l'indirizzo definitivo della pagina nella scheda **Deployments**.
