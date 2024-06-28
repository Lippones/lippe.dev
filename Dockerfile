FROM oven/bun:latest AS base
WORKDIR /usr/src/app

COPY . .

RUN bun install


ARG PROJECT
ENV PROJECT=${PROJECT}

# Exponha a porta que a aplicação vai rodar
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["bun", "start", "--filter=${PROJECT}"]