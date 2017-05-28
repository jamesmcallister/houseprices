FROM debian:jessie-backports
ADD *.sh /
RUN chmod a+x /worker.sh && /worker.sh
RUN chmod a+x /npm.sh && /npm.sh
