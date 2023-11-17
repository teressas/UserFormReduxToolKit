import React, { useState, ChangeEvent, useEffect } from 'react';
import { User } from '../features/user/userTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateUser, fetchUser } from '../features/user/userSlice';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const [editUser, setEditUser] = useState<User>({ id: '', name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.user.currentUser)
    console.log({ currentUser })

    const { userId } = useParams<{ userId: string }>();

    useEffect(() => {
        console.log({userId})
        dispatch(fetchUser(userId || ''));
    }, [userId, dispatch])

    useEffect(() => {
        if (currentUser) {
            setEditUser(currentUser);
        }
    }, [currentUser])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditUser({ ...editUser, id: userId || '', [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ editUser })
        dispatch(updateUser(editUser));
        setIsEditing(false);
    }


    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={editUser.name}
                        onChange={changeHandler}
                    />
                    <input
                        name="email"
                        value={editUser.email}
                        onChange={changeHandler}
                    />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <>
                    <div>
                        <p>Name: {currentUser?.name}</p>
                        <p>Email: {currentUser?.email}</p>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </div>

                </>
            )}
        </div>
    )
}

export default UserProfile;