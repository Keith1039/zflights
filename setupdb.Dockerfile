FROM golang:1.26 AS builder

WORKDIR /app

COPY data/go.mod data/go.sum data/deals.json ./

RUN go mod download

COPY data/*.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o setup

CMD ["./setup"]