package main

import (
	"encoding/json"
	"testing"
)

func TestEmailEvent(t *testing.T) {

	body := `{"email": "example@example.com"}`

	var email *EmailEvent
	jsonMarshallErr := json.Unmarshal([]byte(body), &email)

	if jsonMarshallErr != nil {
		t.Errorf(jsonMarshallErr.Error())
	}

	if email.Address != "example@example.com" {

		t.Errorf("Incorrect Unmarshal, got: %s, want: example@example.com", email.Address)

	}
}
