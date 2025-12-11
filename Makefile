build:
	cd frontend && npm install && npm run build

start:
	npx start-server -s ./frontend/dist

dev:
	concurrently "npm run dev --prefix frontend" "npx start-server"

lint:
	npx eslint .

lint:fix:
	npx eslint . --fix

format:
	npx prettier --write "**/*.{js,jsx,json,md}"