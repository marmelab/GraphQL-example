install:
	cd server && npm install
	cd client && npm install

run-server:
	cd server && npm start

run-client:
	cd client && npm start

test:
	cd server && npm run test
	cd client && npm run test
