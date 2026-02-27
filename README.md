# Ebookingphoto

Guide simple pour un client debutant (non dev):
- Recuperer le projet via GitHub (fork)
- Le connecter a Vercel
- Relier le nom de domaine (IONOS deja configure)
- Faire les futures modifications avec Builder.io

## 1) Creer le fork GitHub du projet

1. Ouvrir le repo source sur GitHub.
2. Cliquer en haut a droite sur `Fork`.
3. Valider la creation du fork dans son propre compte GitHub.
4. Verifier que le repo personnel est bien cree:
   - format attendu: `https://github.com/<son-compte>/<nom-du-repo>`

## 2) Creer le compte Vercel et connecter le repo

1. Aller sur [https://vercel.com/](https://vercel.com/) et cliquer `Sign Up`.
2. Choisir `Continue with GitHub` (recommande).
3. Autoriser Vercel a acceder au compte GitHub.
4. Dans Vercel: cliquer `Add New...` puis `Project`.
5. Selectionner le fork GitHub du client.
6. Cliquer `Import`.
7. Laisser la config detectee automatiquement (Vite), puis `Deploy`.

Resultat:
- Chaque `git push` sur la branche principale declenche un deploy automatique.

## 3) Connecter le nom de domaine (IONOS)

Le domaine est deja prepare cote IONOS, donc il faut seulement l'ajouter dans Vercel:

1. Ouvrir le projet dans Vercel.
2. Aller dans `Settings` -> `Domains`.
3. Cliquer `Add`.
4. Saisir le domaine (ex: `ebookingphoto.com`) puis valider.
5. Ajouter aussi `www.ebookingphoto.com` si besoin.
6. Attendre le statut `Valid Configuration` / `Active`.

Important:
- Si Vercel affiche encore une instruction DNS, recopier exactement les enregistrements demandes dans IONOS.
- Quand tout est vert, le site est en ligne sur le domaine.

## 4) Limites de push / deploy (important)

- Le plan `Hobby` est gratuit mais a des quotas.
- Pour une utilisation sans limitation pratique (equipe, volume, etc.), passer en plan `Pro` sur Vercel.

## 5) Faire les modifications avec Builder.io (sans coder)

Aller sur [https://www.builder.io/](https://www.builder.io/) et connecter le repo.

### Repere visuel

Cliquer sur le bouton `Connect a Repo`:

![Connect a Repo](./docs/images/connect-a-repo.svg)

### Etapes detaillees

1. Creer un compte Builder.io (idealement avec le meme GitHub).
2. Ouvrir Builder.io.
3. Cliquer sur `Connect a Repo`.
4. Autoriser Builder.io a acceder a GitHub.
5. Choisir le fork du client.
6. Choisir la branche principale (`main`).
7. Confirmer la connexion.
8. Utiliser l'assistant IA de Builder pour demander les changements en francais simple.
9. Laisser Builder proposer les modifications de code.
10. Valider la proposition (commit/PR selon le flux choisi dans Builder).
11. Une fois merge/push, Vercel redeploie automatiquement le site.

## 6) Workflow simple recommande au quotidien

1. Demander une modification dans Builder.io (texte, image, section...).
2. Verifier l'aperçu.
3. Valider la modification (commit ou PR).
4. Verifier le deploy dans Vercel (`Deployments`).
5. Verifier le site en ligne sur le domaine.

## 7) Checklist rapide en cas de blocage

- Le repo n'apparait pas dans Vercel:
  - Refaire l'autorisation GitHub dans Vercel.
- Le domaine ne repond pas:
  - Verifier `Settings -> Domains` dans Vercel.
  - Verifier les DNS dans IONOS.
- Les modifs n'apparaissent pas:
  - Verifier que la modif est bien mergee/pushee sur `main`.
  - Verifier le dernier deploy dans Vercel..
