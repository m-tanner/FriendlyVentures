# build
FROM node:12-alpine3.10 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

RUN echo Copying package files over for install...
COPY package.json ./
COPY package-lock.json ./

RUN echo Installing dependencies...
RUN npm install --production --only=prod --no-optional --no-fund --silent
RUN npm install -g --production --only=prod react-scripts@3.4.1 --no-optional --no-fund --silent

RUN echo Copying app files over...
COPY . ./

RUN echo Building production version of app...
RUN npm run build

# production
FROM nginx:stable-alpine

RUN echo Copying build files into production container...
COPY --from=build /app/build /usr/share/nginx/html

RUN echo Exposing production port...
EXPOSE 80

RUN echo Firing up nginx...
CMD ["nginx", "-g", "daemon off;"]