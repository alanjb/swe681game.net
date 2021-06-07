FROM node:12
WORKDIR /usr/src/api
COPY /api/package*.json ./
RUN npm install
COPY /api /usr/src/api
CMD ["npm", "start"]