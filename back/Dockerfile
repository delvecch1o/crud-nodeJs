FROM node:18 

WORKDIR /back

COPY . . 

RUN npm i 
RUN cp .env.example .env

EXPOSE 5000

CMD ["npm","run","dev"]