# 构建阶段
FROM golang:1.20-alpine AS builder

WORKDIR /app
COPY . .

RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /monitor ./cmd/main.go

# 运行阶段  
FROM alpine:3.18

WORKDIR /app

COPY --from=builder /monitor /app/monitor
COPY --from=builder /app/configs /app/configs

EXPOSE 8080

ENTRYPOINT ["/app/monitor"]
