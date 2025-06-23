# 🗂️ Task Manager App

Application complète de gestion des tâches avec système de connexion.  
Permet aux utilisateurs authentifiés de créer, modifier, supprimer et consulter des tâches.

---

## 🚀 Fonctionnalités

- 🔐 Authentification avec JWT (email + mot de passe)
- ✅ Gestion sécurisée des routes protégées
- 📝 CRUD complet des tâches (Créer, Lire, Modifier, Supprimer)
- 🧭 Navigation conditionnelle selon l'état de connexion
- 📦 Stockage du token dans le `localStorage`
- 🎨 Interface simple et responsive (React + CSS)

---

## 🛠️ Technologies utilisées

### Frontend
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- CSS

### Backend (exemple)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT](https://jwt.io/)

---



## 🧪 Lancer le projet

### 🔧 Prérequis

- Node.js
- npm ou yarn
- Backend API opérationnel sur `http://localhost:8080/api`

### ▶️ Installation

```bash
git clone https://github.com/HMAIDIMOHAMED/task_crud.git
cd task_crud
npm install
npm start
