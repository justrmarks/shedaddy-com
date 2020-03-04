package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/hanzoai/gochimp3"
)

// Payload is used to build API response body
type Payload struct {
	Message string      `json: "message"`
	Data    interface{} `json: "data"`
}

// EmailEvent is used to properly encode email address as a json field
type EmailEvent struct {
	Address string `json: "email"`
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	apiKey := os.Getenv("MAILCHIMP_API_KEY")
	audienceID := os.Getenv("MAILCHIMP_AUDIENCE_ID") //"acbb592c9e"

	client := gochimp3.New(apiKey)
	var body *Payload

	list, getListErr := client.GetList(audienceID, nil)

	// error handling for mailchimp list retrieval
	if getListErr != nil {
		fmt.Println(getListErr)
		body = &Payload{
			Message: `error - couldn't find audience list`,
			Data:    getListErr,
		}

		jsonBody, _ := json.Marshal(&body)
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       string(jsonBody),
		}, nil

	}

	var email EmailEvent
	jsonMarshallErr := json.Unmarshal([]byte(request.Body), &email)

	if jsonMarshallErr != nil {
		body = &Payload{
			Message: `error - couldn't process request json`,
			Data:    jsonMarshallErr,
		}

		jsonBody, _ := json.Marshal(&body)
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       string(jsonBody),
		}, nil

	}

	newSub := &gochimp3.MemberRequest{
		EmailAddress: email.Address,
		Status:       "subscribed",
	}

	if _, createMemErr := list.CreateMember(newSub); createMemErr != nil {
		fmt.Printf("Failed to subscribe '%s'", newSub.EmailAddress)
		fmt.Print(newSub)
		body = &Payload{
			Message: fmt.Sprintf(`error - failed to subscribe %s`, newSub.EmailAddress),
			Data:    createMemErr,
		}
		jsonBody, _ := json.Marshal(&body)

		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       string(jsonBody),
		}, nil
	}

	body = &Payload{
		Message: "success",
		Data: &EmailEvent{
			Address: newSub.EmailAddress,
		},
	}
	jsonBody, _ := json.Marshal(&body)

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(jsonBody),
	}, nil
}

func main() {
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
