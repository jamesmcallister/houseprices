FROM debian:jessie-backports
RUN apt-get update && \
    apt-get install build-essential && \
    apt-get autoclean && \
    apt-get autoremove && \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash && \
    nvm install -lts
    

