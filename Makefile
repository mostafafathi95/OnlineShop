# Makefile - Development Tasks

.PHONY: help install dev build test lint format clean db-push db-reset deploy

help:
	@echo "Available commands:"
	@echo "  make install        - Install dependencies"
	@echo "  make dev            - Start development server"
	@echo "  make build          - Build for production"
	@echo "  make test           - Run all tests"
	@echo "  make test-watch     - Run tests in watch mode"
	@echo "  make lint           - Run ESLint"
	@echo "  make format         - Format code with Prettier"
	@echo "  make type-check     - Check TypeScript types"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make db-push        - Push database schema"
	@echo "  make db-reset       - Reset database (DANGER!)"
	@echo "  make db-studio      - Open database studio"
	@echo "  make deploy         - Deploy to production"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	npm run test

test-watch:
	npm run test -- --watch

lint:
	npx eslint . --ext .ts,.tsx

format:
	npx prettier --write "src/**/*.{ts,tsx,json,css,md}"

type-check:
	npx tsc --noEmit

clean:
	rm -rf dist node_modules .next .turbo

db-push:
	npm run db:push

db-reset:
	npm run db:push -- --force

db-studio:
	npm run db:studio

deploy:
	npm run build && npm run start

# نوٹ: فارسی میں بھی کمنڈز چلتی ہیں
تنصیب:
	$(MAKE) install

شروع:
	$(MAKE) dev

تعمیر:
	$(MAKE) build

ٹیسٹ:
	$(MAKE) test
