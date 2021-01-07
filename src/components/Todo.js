import React, { useState } from 'react';

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.editTodo(props.id, newName);
        setNewName('');
        setEditing(false);
    }

    return (
        isEditing ?
            <form className="stack-small" onSubmit={handleSubmit}>
                <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />
                </div>
                <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                </button>
                </div>
            </form>
        :
            <div className="todo stack-small">
                <div className="c-cb">
                    <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleCompleted(props.id)} />
                    <label className="todo-label" htmlFor={props.id}>
                        {props.name}
                    </label>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn" onClick={() => setEditing(true)}>
                    Edit
                    </button>
                    <button type="button" className="btn btn__danger" onClick={() => props.delTodo(props.id)}>
                    Delete
                    </button>
                </div>
            </div>
    );
}