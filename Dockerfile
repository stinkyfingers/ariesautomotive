FROM node:5.0.0

COPY . /
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
