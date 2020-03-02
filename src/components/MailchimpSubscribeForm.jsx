import React, { useState} from 'react'

export default function MailchimpSubscribeForm(props) {

    let [email, setEmail] = useState("")
    let [isFetching, setFetching] = useState(false)

    const handleChange = (e) => { setEmail(e.email.value) }

    const handleSubmit = async (e) => { 
        setFetching(true)
        req = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: `${{email}}` // body data type must match "Content-Type" header
              
        }
       let response = await fetch("/.netlify/functions/hello", req)
        let json = response.json()
        console.log(json)
       if (json.email = email) {
           setFetching(false)
       }
    }

    return (
        <form onSubmit={handleSubmit} className="subscribeForm">
            <input type="text" name="email" onChange={handleChange} label="email newsletter subscribe"/>
            <button disabled={isFetching} type="submit"> Subscribe</button>
        </form>
    )


    style = {
        
    }
}