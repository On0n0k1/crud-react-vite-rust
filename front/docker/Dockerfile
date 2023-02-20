FROM crud-react-vite-rust_frontend1 as builder

# Use nginx as the base image
FROM nginx

# Copy nginx config file
COPY /front/nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the previous image
COPY --from=builder /app/dist/ /app

RUN ls -a /app

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]