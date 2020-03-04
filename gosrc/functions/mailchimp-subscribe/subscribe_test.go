package main

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestEmailEvent(t *testing.T) {
	fmt.Println("Testing EmailEvent")
	body := `{"email": "example@example.com"}`

	var email *EmailEvent
	jsonMarshallErr := json.Unmarshal([]byte(body), &email)

	if jsonMarshallErr != nil {
		t.Errorf(jsonMarshallErr.Error())
	}

	if email.Address != "example@example.com" {

		t.Errorf("Incorrect Unmarshal, got: %s, want: example@example.com", email.Address)

	}
	fmt.Println("**Email Unmarshal pass!**")
}
