build:
	npm run clean 
	gatsby build
	mkdir -p functions
	go get -v ./gosrc/functions/...
	go build -o functions/subscribe ./gosrc/functions/...
