build:
	npm run clean 
	gatsby build
	mkdir -p functions
    go get ./gosrc/functions/...
	go build -o functions ./gosrc/functions/...
