FROM node:20.4.0
RUN mkdir /usr/src/reactapp
WORKDIR /usr/src/reactapp
ENV PATH /usr/src/reactapp/node_modules/.bin:$PATH

COPY . /usr/src/reactapp
RUN npm install --silent

USER root
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm install -g serve --save
CMD ["npm", "start"]