#!/bin/sh
# Replace backend URL placeholder in nginx config
sed -i "s|BACKEND_URL_PLACEHOLDER|${BACKEND_URL}|g" /etc/nginx/conf.d/default.conf

echo "Starting Qualidoc frontend (backend: ${BACKEND_URL})"
exec nginx -g 'daemon off;'
