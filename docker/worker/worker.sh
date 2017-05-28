#!/bin/bash
apt-get update
apt-get install wget git curl build-essential -y
apt-get autoclean
apt-get autoremove
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
chmod a+x ~/.bashrc
