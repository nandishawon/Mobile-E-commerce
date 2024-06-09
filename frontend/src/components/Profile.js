import React from 'react'

const Profile = ()=>{
    const profileData = JSON.parse(localStorage.getItem('user'));
    console.log(profileData);
    return (
        <div className='profile'>
            <h3>User Id: <span>{profileData._id}</span></h3>
            <h3>Name: <span>{profileData.name}</span></h3>
            <h3>Email: <span>{profileData.email}</span></h3>
        </div>
    )
}


export default Profile;

