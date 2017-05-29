add the ip of the server to your hosts file, i.e
``
#<ip-address>   <hostname.domain.org>   <hostname>
127.0.0.1       localhost.localdomain   localhost
::1             localhost.localdomain   localhost
123.123.123.123   do-droplet-house-prices
 ``
# Setup minikube
* Install minikube
* Install kubectl
* Install helm

Run minikube start --memory 8192 --disk-size 100g
Run helm init


# Setup dnsmasq (Debian instructions)
## Install dnsmasq
```
apt-get install dnsmasq -y
```

## Setup dnsmasq
Add the following to /etc/dhcp/dhclient.conf
```
prepend domain-name-servers 127.0.0.1;
```

## Setup dnsmasq to map .invalid to 127.0.0.1

/etc/dnsmasq.d/invalid
```
address=/.invalid/192.168.99.100
```

Restart computer

# Setup cloud
helm install ./helmchart -n uk-analytics

# Destroy cloud
helm delete --purge uk-analytics

# Use concourse
Visit http://concourse.invalid
