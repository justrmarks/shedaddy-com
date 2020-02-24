build:
	npm run clean 
	gatsby build
	mkdir -p functions
    GOBIN=${PWD}/functions go install -i ./gosrc/functions/...
	