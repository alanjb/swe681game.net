FROM node:12.18.1
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
EXPOSE 8080
CMD ["npm","run", "dev"]