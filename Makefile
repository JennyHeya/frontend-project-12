build:
	cd frontend && npm install && npm run build

start:
	cd frontend && npm run start

install:
	npm install
	cd frontend && npm install

dev:
	concurrently "npm run dev --prefix frontend" "npx start-server"

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

format:
	npx prettier --write "**/*.{js,jsx,json,md}"