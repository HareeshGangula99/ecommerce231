FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY cart.html /usr/share/nginx/html/
COPY details.html /usr/share/nginx/html/
COPY address.html /usr/share/nginx/html/
COPY payment.html /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY cart.js /usr/share/nginx/html/
COPY details.js /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
