import React from 'react'
import axios from 'axios'

export default function App() {

    axios.get('/api/test')
        .then(function (response) {
            document.getElementById('test').innerHTML = response.data
        })
        .catch(function (error) {
            console.log(error);
        })

    return (
        <div id='test'>
            Hallo
        </div>
    )
}
