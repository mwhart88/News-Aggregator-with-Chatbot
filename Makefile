.PHONY: build up down logs restart clean

# Build and start the application
build:
	docker-compose build

# Start the application
up:
	docker-compose up -d

# Stop the application
down:
	docker-compose down

# View application logs
logs:
	docker-compose logs -f

# Restart the application
restart:
	docker-compose restart

# Remove all containers, volumes, and images
clean:
	docker-compose down -v
	docker system prune -f

# Run the complete setup
all: build up
	@echo "News Aggregator application is now running!"
	@echo "- Backend API: http://localhost:8000/api"
	@echo "- Frontend: http://localhost" 