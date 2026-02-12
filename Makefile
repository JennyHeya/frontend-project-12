install:
	npm install && cd frontend/ && npm install

start:
	npm run server npm run frontend

build:
	cd frontend/ && npm run build