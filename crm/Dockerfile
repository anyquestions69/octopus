FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm i --force
EXPOSE 8048

# Command to run the application
CMD ["npm", "run", "start"]