FROM node:8
WORKDIR /app
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm install --only=production
COPY . /app
EXPOSE 8080
CMD [ "npm", "start" ]
