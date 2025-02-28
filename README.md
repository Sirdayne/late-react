# late react

Run Game

```bash
yarn run start:plinko
```
Deploy Pipeline:

```bash
#!/bin/bash

TARGET_DIR="/home/dev/plinko"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install v20.18.0
nvm use v20.18.0

corepack enable
corepack prepare yarn@4.3.0 --activate
export TERM=xterm

rm -rf node_modules
rm -rf dist

yarn cache clean
yarn install
```

Run Docker:

```bash
 docker-compose -f .\docker-compose.yml up -d
```
Test:

```bash
http://localhost:3000/
```
