build:
	npm run clean 
	gatsby build
	go get ./gosrc/functions/...
	go build -o functions ./gosrc/functions/...
