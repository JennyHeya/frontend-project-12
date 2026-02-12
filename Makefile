install:
	npm install && cd frontend/ && npm install

start:
	# start backend server that serves static frontend and API
	# use chat-server so API endpoints are available for tests
	node ./node_modules/@hexlet/chat-server/bin/index.js -s ./frontend/dist
	start-server -s ./frontend/dist
	npm run dev

build:
	cd frontend/ && npm run build