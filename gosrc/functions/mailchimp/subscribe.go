package main

import (
	"context"
	"fmt"
	"os"
	"string"
	"net/url"


	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/hanzoai/gochimp3"
)

const (
	apiKey     = os.Getenv("MAILCHIM_API_KEY")
	audienceID = os.Getenv("MAILCHIMP_AUDIENCE_ID") //"acbb592c9e"
)


func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	client := gochimp3.New(apiKey)
	var body strings.Builder

	list, err := client.GetList(audienceID, nil)

	if (request.HttpMethod !== "POST") {
		return &events.APIGatewayProxyResponse{StatusCode: 405, Body: "{message: Method Not Allowed}" };
	  }

	// error handling for mailchimp list retrieval
	if err != nil {
		fmt.Fprintf(&body, "{`message`: `error - couldn't find audience list`, `data`: `%s`}", err) 
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body: body.String()
		}, nil
		
	}

	newSub := &gochimp3.MemberRequest{
		// unmarshall query string into map[string][]string
        EmailAddress: url.ParseQuery(request.Body)["emailAddress"][0],
		Status: "subscribed",
	}

	if _, err := list.CreateMember(newSub); err != nil {
		fmt.Println("Failed to subscribe '%s'", newSub.EmailAddress)
		fmt.Fprintf(&body, "{`message`: `error - Failed to subscribe`, `data`: `%s`}", err) 
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body: body.String()
		}, nil
	}
	

	fmt.Fprintf(&body, "{`message`: `success`, `data`: `%s`}", newSub.EmailAddress) 
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body: body.String()
	}, nil
}

func main() {
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
