# INSPEC - Maritime Inspection & Certification

![INSPEC Logo](https://inspec.ma/)

## À propos du projet

**INSPEC** est une entreprise agréée d'inspection maritime et de certification au Maroc. Nous fournissons des services d'inspection de haute qualité pour assurer la précision de vos opérations portuaires.

### But de l'application

Ce site web présente les services d'inspection maritime proposés par INSPEC et permet aux clients de :

- Découvrir les services d'inspection maritime (Draft Survey, On/Offhire, Under Keel Clearance, etc.)
- Demander un devis pour les services d'inspection
- Contacter l'entreprise via un formulaire
- S'abonner à la newsletter pour recevoir les dernières nouvelles maritimes
- Consulter les articles du blog sur les réglementation maritimes

### Services proposés

- **Draft Survey** : Mesure précise du tirant d'eau du navire pour déterminer avec exactitude le poids de la cargaison chargée ou déchargée
- **Inspection On/Offhire** : Inspection complète de l'état du navire lors de la prise en charge ou de la restitution
- **Under Keel Clearance** : Contrôle précis du lest et du fuel, vérification de la stabilité du navire
- **Cargo Survey** : Inspection et expertise de tous types de cargaison : vrac, liquide, conteneurs
- **Temperature Control** : Vérification et calibration des systèmes de contrôle de température
- **Pre-Port Inspection** : Audit complet du navire avant l'entrée au port

---

## Technologies utilisées

### Frontend

| Technologie | Description |
|-------------|-------------|
| **React 18** | Framework JavaScript pour l'interface utilisateur |
| **Vite** | Outil de build rapide pour le développement |
| **Material UI (MUI)** | Composants UI React professionnels |
| **Tailwind CSS** | Framework CSS utilitaire |
| **React Router** | Gestion des routes côté client |
| **i18next** | Internationalisation (Français, Anglais, Arabe) |
| **Framer Motion** | Animations fluides |
| **React Query** | Gestion des requêtes serveur |
| **Axios** | Client HTTP |
| **Spline** | Graphiques 3D interactifs (Globe terrestre) |

### Backend

| Technologie | Description |
|-------------|-------------|
| **Express.js** | Framework Node.js pour l'API |
| **Supabase** | Base de données PostgreSQL et authentification |
| **JWT** | Authentification par token |
| **Nodemailer** | Envoi d'emails transactionnels |
| **Bcryptjs** | Chiffrement des mots de passe |
| **Mongoose** | Modélisation des données MongoDB |
| **CORS** | Gestion des requêtes cross-origin |
| **Helmet** | Sécurité des headers HTTP |
| **Morgan** | Logging des requêtes HTTP |

### Base de données

- **PostgreSQL** (via Supabase) pour le stockage des :
  - Formulaires de contact
  - Demandes de devis
  - Abonnés à la newsletter

---

## Structure du projet

```
inspec/
├── backend/                    # API Express.js
│   ├── src/
│   │   ├── config/            # Configuration (Supabase, plugins)
│   │   ├── controllers/       # Logique métier
│   │   ├── middleware/       # Middleware Express
│   │   ├── models/            # Modèles de données
│   │   ├── routes/            # Routes API
│   │   ├── App.js            # Application principale
│   │   └── index.js          # Point d'entrée
│   └── package.json
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/       # Composants React
│   │   │   ├── common/       # Composants partagés
│   │   │   ├── layout/       # Layout (Navbar, Footer)
│   │   │   └── ...
│   │   ├── pages/            # Pages principales
│   │   ├── services/         # Services API
│   │   ├── locales/          # Fichiers de traduction
│   │   │   ├── ar/           # Arabe
│   │   │   ├── en/           # Anglais
│   │   │   └── fr/           # Français
│   │   ├── styles/           # Styles CSS
│   │   └── ...
│   ├── strapi/               # CMS Strapi (optionnel)
│   ├── index.html
│   └── package.json
│
├── supabase-setup.sql         # Script de base de données
└── README.md                   # Ce fichier
```

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18 ou supérieur)
- **npm** ou **yarn**
- **Git**
- Un compte **Supabase** (pour la base de données)

---

## Comment cloner le projet via GitHub

### 1. Cloner le dépôt

```
bash
# Cloner le dépôt
git clone https://github.com/votre-repo/inspec.git

# Aller dans le dossier du projet
cd inspec
```

### 2. Configuration du Backend

```
bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
```

Modifier le fichier `.env` avec vos configurations :

```
env
# Configuration Supabase
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_cle_anon_supabase

# Configuration JWT
JWT_SECRET=votre_secret_jwt

# Configuration Email (Nodemailer)
EMAIL_USER=votre_email
EMAIL_PASS=votre_mot_de_passe_email
EMAIL_HOST=smtp.votre_provider.com
EMAIL_PORT=587

# Port du serveur
PORT=
```

Lancer le backend3001 :

```
bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

### 3. Configuration du Frontend

```bash
# Revenir à la racine et aller dans frontend
cd ../frontend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
```

Modifier le fichier `.env` avec vos configurations :

```
env
# URL de l'API backend
VITE_API_URL=http://localhost:3001

# Configuration Supabase
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

Lancer le frontend :

```
bash
# Mode développement
npm run dev

# Mode production
npm run build
npm run preview
```

### 4. Configuration de la Base de Données

1. Créer un projet sur [Supabase](https://supabase.com/)
2. Aller dans **SQL Editor**
3. Copier le contenu du fichier `supabase-setup.sql` et l'exécuter
4. Récupérer les URLs et clés dans **Settings > API**

---

## Fonctionnalités

### Frontend

- ✅ Page d'accueil avec globe terrestre interactif
- ✅ Pages services détaillées
- ✅ Formulaire de contact avec validation
- ✅ Demande de devis avec champs spécifiques (nom du navire, port, date prévue)
- ✅ Blog avec articles sur les réglementation maritimes
- ✅ Site multilingue (Français, Anglais, Arabe)
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Animations fluides
- ✅ SEO optimisé

### Backend

- ✅ API RESTful avec Express.js
- ✅ Gestion des contacts et demandes de devis
- ✅ Gestion des abonnements newsletter
- ✅ Authentification JWT
- ✅ Envoi d'emails transactionnels
- ✅ Intégration Supabase

---

## Variables d'environnement

### Backend (.env)

```
env
# Server
PORT=3001
NODE_ENV=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# JWT
JWT_SECRET=your-jwt-secret

# Email (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Frontend (.env)

```
env
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Commandes utiles

```
bash
# Backend
npm run dev    # Démarrer en mode développement
npm start      # Démarrer en mode production

# Frontend
npm run dev    # Démarrer le serveur de développement
npm run build  # Build pour production
npm run preview # Prévisualiser le build
```

---

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à créer une issue ou à soumettre une pull request.

---

## Licence

Tous droits réservés © INSPEC - Maritime Inspection & Certification

---

## Contact

- **Email** : contact@inspec.ma
- **Téléphone** : +212 5XX XXXXXX
- **Adresse** : Casablanca, Maroc
- **Site web** : https://inspec.ma
