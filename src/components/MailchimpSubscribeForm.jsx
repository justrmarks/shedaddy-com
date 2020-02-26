import React, { useState} from 'react'

export default function MailchimpSubscribeForm(props) {

    [email, setEmail] = useState("")

    const handleChange = (e) => { setEmail(e.email.value) }

    return (
        <form>
            <input type="text" name="email" onChange={handleChange} />
        </form>
    )
}