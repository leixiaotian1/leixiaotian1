# Build stage
FROM golang:1.20-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o alert-manager .

# Final stage  
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/alert-manager .
EXPOSE 8080
CMD ["./alert-manager"]
