FROM node:18-alpine

WORKDIR /scripts

COPY . .
RUN npm i --force
EXPOSE 7018

# Command to run the application
CMD ["npm", "run", "start"]