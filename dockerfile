# Utilisez une image de base contenant Node.js pour exécuter l'application React
FROM node:alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json ./

COPY package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . ./

# Éxécuter la commande pour démarrer le front
CMD ["npm", "start"]