import React, { useState} from 'react'

export default function MailchimpSubscribeForm(props) {

    let [email, setEmail] = useState("")
    let [isFetching, setFetching] = useState(false)
    let [isSubscribed, setSubscribed] = useState(false)

    const handleChange = (e) => { setEmail(e.target.value) }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setFetching(true)
        const req = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({email}) // body data type must match "Content-Type" header
              
        }

        console.log(req)
       let response = await fetch("/.netlify/functions/subscribe", req)
       console.log(response)
        let json = await response.json()
        console.log(json)
       if (json.email.data === email) {
           setSubscribed(true)
       }
    }

    return (
        <form onSubmit={handleSubmit} className="subscribeForm">
            <label htmlFor="email">Newsletter:</label>
            <input type="text" id="email" name="email" onChange={handleChange} aria-label="email newsletter subscribe form"/>
            <button disabled={isFetching} type="submit"> {isSubscribed ? "Subscribed!" : "Subscribe"}</button>
        </form>
    )


    
}