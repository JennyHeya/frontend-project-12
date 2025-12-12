build:
	cd frontend && npm install && npm run build

start:
	node ./node_modules/@hexlet/chat-server/bin/index.js -s ./frontend/dist

install:
	npm install
	cd frontend && npm install

dev:
	concurrently "npm run dev --prefix frontend" "npx @hexlet/chat-server"

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

format:
	npx prettier --write "**/*.{js,jsx,json,md}"