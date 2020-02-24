build:
	npm run clean 
	gatsby build
    GOBIN=${PWD}/gosrc/functions go install ./...