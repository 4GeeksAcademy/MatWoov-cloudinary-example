import React, { useState } from "react";


export const UploadImage = () => {
    const [ image, setImage ] = useState('');
    const [ url, setUrl ] = useState('');

    const imageUpload = () => {
        // upload this image to cloudinary
        const data = new FormData();
        data.append('file', image);
        data.append(
            'upload_preset', 'ddpetmio'
        );
        data.append('cloudinary_name', 'dyfvztd5h');
        fetch('https://api.cloudinary.com/v1_1/ddpetmio/image/upload',
        {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Basic ${process.env.API_KEY}:${process.env.API_SECRET}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()).then((data) => {
            setUrl(data.url);
        }).catch((errors) => console.log(errors));
    }

    return (
        <div className="container mt-5 text-center">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={imageUpload}>Upload Image</button>
        </div>
    )
}