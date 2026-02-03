build:
	cd frontend && npm install && npm run build

install:
	npm install && cd frontend/ && npm install

start:
	# start backend server that serves static frontend and API
	# use chat-server so API endpoints are available for tests
	node ./node_modules/@hexlet/chat-server/bin/index.js -s ./frontend/dist

setup:
	npm install && cd frontend/ && npm install

test:
	cd frontend && npx playwright test

test-with-backend:
	concurrently --kill-others "npx @hexlet/chat-server" "cd frontend && npx playwright test"

dev:
	concurrently "npm run dev --prefix frontend" "npx @hexlet/chat-server"

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

format:
	npx prettier --write "**/*.{js,jsx,json,md}"