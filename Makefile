build:
	npm run clean 
	gatsby build
    GOBIN=${PWD}/lambda go install -i ./gosrc/functions/...