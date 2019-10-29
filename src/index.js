import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

const Item = ({ item }) => {
    return (
        <div className="item">
            <p>
                <strong>{ item.title }</strong>, { item.desc }
            </p>
        </div>
    )
}

const NewItem = ({ onSubmit }) => {
    const [ title, setTitle ] = useState('')
    const [ desc, setDesc ] = useState('')

    const titleChanged = ({ target }) => setTitle(target.value)
    const descChanged = ({ target }) => setDesc(target.value)

    const addItem = (event) => {
        event.preventDefault()

        console.log({
            title, desc
        })

        onSubmit({
            desc,
            title,
            id: Math.random().toString(36).slice(2),
        })

        setTitle('')
        setDesc('')
    }

    return (
        <form onSubmit={ addItem }>
            <p>
                Title:
                <input type="text" value={ title } onChange={ titleChanged } />
            </p>
            <p>
                Desc:
                <input type="text" value={ desc } onChange={ descChanged } />
            </p>
            <button role="submit">Add</button>
        </form>
    )
}

const Board = () => {
    const [items, setItems] = useState([])

    const addItem = newItem => setItems(items.concat(newItem))

    return (
        <div className="board">
            { items.map(item => <Item item={ item } key={ item.id } />) }
            <NewItem onSubmit={ addItem } />
        </div>
    )
}

const App = () => {
    return <Board />
}

render(<App />, document.getElementById('app'))
