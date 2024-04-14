FROM node:20 AS builder

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Building our application
RUN npm run build

#EXPOSE 80
#EXPOSE 443
#CMD [ "npm", "start" ]

# Fetching the latest nginx image
FROM nginx

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copying built assets from builder
COPY --from=builder /usr/app/build /usr/share/nginx/html

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
