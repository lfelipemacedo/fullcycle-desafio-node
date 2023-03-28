FROM node:14.17.0-slim



RUN apt update && \
    apt install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for
RUN npm install express --save && npm install mysql --save

USER node
WORKDIR /home/node/app
COPY . .

# ENTRYPOINT [ "node", "index.js" ]

# EXPOSE 3000
