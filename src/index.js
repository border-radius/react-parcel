import 'babel-polyfill'
import 'semantic-ui-css/semantic.min.css'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Card, Icon, Image, Loader, Dimmer, Container } from 'semantic-ui-react'

const App = () => {
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ user, setUser ] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const request = await fetch('https://jsonplaceholder.typicode.com/users/1')

            if (request.ok) {
                setUser(await request.json())
            } else {
                setError(true);
            }

            setLoading(false);
        }

        fetchData();
    }, [])

    if (loading) {
        return <Dimmer active><Loader /></Dimmer>
    }

    if (error) {
        return <strong>Error</strong>
    }

    return (
        <Container style={{ padding: '50px 0' }}>
            <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                <Card.Header>{ user.name }</Card.Header>
                <Card.Meta>
                    <span className='date'>{ user.email }</span>
                </Card.Meta>
                <Card.Description>
                    <strong>{ user.company.name }</strong>, { user.company.catchPhrase }
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='phone' />
                    { user.phone }
                </a>
                </Card.Content>
            </Card>
        </Container>
    )
}

render(<App />, document.getElementById('app'))
