# build step
FROM node:20.1.0 as build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
CMD ["node", "src/index.tsx"]
EXPOSE 3001

# release step
# FROM nginx:1.21.5-alpine as release
# COPY --from=build /app/build /usr/share/nginx/html/
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]