FROM node:20-slim

WORKDIR /app

COPY index.js .

ENV PORT=3000
ENV EXTRA_HEADERS={}
EXPOSE 3000

CMD ["node", "index.js"]
