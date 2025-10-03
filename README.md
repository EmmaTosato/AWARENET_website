# AWARENET Website

Questa è una pagina web statica pensata per presentare il network AWARENET. 

## Struttura del progetto

```
.
├── assets
│   ├── css
│   │   └── styles.css      # Stili personalizzati del sito
│   └── images
│       └── logo.svg        # Logo vettoriale usato nella navbar
├── index.html               # Pagina principale (Home)
└── README.md                # Documentazione del progetto
```

## Contenuti della pagina

La pagina `index.html` apre direttamente sulla **Home**, che comprende:

- un hero introduttivo con titolo, descrizione e pulsante di invito all'azione;
- un riquadro laterale con recapiti rapidi (email e indirizzo) per consentire il contatto immediato.

La barra di navigazione mostra già le voci "Research", "Team", "News" e "Contact" per rispecchiare il menu desiderato, ma al momento sono disattivate in attesa di eventuali pagine dedicate.

## Personalizzazione

- Aggiorna il logo sostituendo `assets/images/logo.svg` con la tua versione (mantenendo lo stesso nome file oppure aggiornando il percorso nell'`<img>` della navbar).
- Modifica i testi dell'hero e del riquadro contatti direttamente in `index.html` per adattarli ai contenuti reali.
- Personalizza la palette di colori aggiornando le variabili CSS dichiarate in cima a `assets/css/styles.css`.

## Anteprima locale

Trattandosi di un sito statico è sufficiente aprire `index.html` in un browser moderno. Per una migliore esperienza di sviluppo puoi servire il sito con un piccolo server locale:

```bash
python3 -m http.server
```

Visitando `http://localhost:8000` potrai navigare il sito e testare il comportamento della barra di navigazione responsive.
