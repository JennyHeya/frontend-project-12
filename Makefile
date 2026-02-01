build:
	cd frontend && npm install && npm run build

install:
	npm install && cd frontend/ && npm install

start:
	cd frontend && npm run start

dev:
	concurrently "npm run dev --prefix frontend" "npx @hexlet/chat-server"

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

format:
	npx prettier --write "**/*.{js,jsx,json,md}"