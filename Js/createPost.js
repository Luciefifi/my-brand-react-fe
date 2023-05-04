// // Creating a post

// const submitPosts = document.getElementById("blogSubmitData");
// const postMessages = document.getElementById("postMessage");

// postMessages.style.display = "none"

// submitPosts.addEventListener("click", (event) =>{
//     event.preventDefault();
//     postMessages.style.display = "block"

//     postMessages.innerHTML = `<img src="../Assets/loading1.gif" alt="" width="40px">`

//     createPost();
// });


// async function createPost(){
//     const postImage = document.getElementById("postImage");
//     const postTitle = document.getElementById("postTitle");
//     const postDescription = document.getElementById("postDescription");
//     const postBody = document.getElementById("postBody");

//     if (!postImage.files[0]) {
//         postMessages.style.color = "red"
//         postMessages.innerHTML = "Please add a post image!"
//         return;
//       }
    
//     const reader =  new FileReader();
//      reader.readAsDataURL(postImage.files[0])
//      reader.addEventListener("load",()=>{
//     const finalPostImage = reader.result

//     const data = {
//         title: postTitle.value, 
//         description: postDescription.value, 
//         blogBody: postBody.value,
//         image: finalPostImage,
//     }
        

//     const sendData = {  
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: new Headers({"auth_token": JSON.parse(localStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
//     }

// fetch("http://localhost:5000/api/create", sendData)
// .then(response => response.json())
// .then((fetchedData)=>{
//     console.log(fetchedData)

//     if (fetchedData.successMessage){
//         postMessages.style.color = "green"
//         postMessages.innerHTML = fetchedData.successMessage
//         setTimeout(()=>{location="managePost.html"},2000)
//     }

//     else if (fetchedData.validationError){
//         postMessages.style.color = "red"
//         postMessages.innerHTML = fetchedData.validationError
//     }

//     else{
//         postMessages.style.color = "red"
//         postMessages.innerHTML = "Something went wrong, we were unable to create this post!"
//     }
// })

//     })
// }





import React, { useState, useRef } from 'react';

function CreatePost() {
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [message, setMessage] = useState('');
  const postImageInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!postImage) {
      setMessage('Please add a post image!');
      return;
    }

    setMessage('Creating post...');
    const reader = new FileReader();
    reader.readAsDataURL(postImage);
    reader.addEventListener('load', () => {
      const data = {
        title: postTitle,
        description: postDescription,
        blogBody: postBody,
        image: reader.result,
      };
      const sendData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'auth_token': JSON.parse(localStorage.getItem('token')),
          'Content-Type': 'application/json; charset=UTF-8',
        }),
      };
      fetch('https://nice-ruby-squid-slip.cyclic.app/api/create', sendData)
        .then((response) => response.json())
        .then((fetchedData) => {
          if (fetchedData.successMessage) {
            setMessage(fetchedData.successMessage);
            setTimeout(() => {
              window.location.href = 'managePost.html';
            }, 2000);
          } else if (fetchedData.validationError) {
            setMessage(fetchedData.validationError);
          } else {
            setMessage('Something went wrong, we were unable to create this post!');
          }
        });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Post Title:
          <input type="text" value={postTitle} onChange={(event) => setPostTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Post Description:
          <input type="text" value={postDescription} onChange={(event) => setPostDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Post Body:
          <textarea value={postBody} onChange={(event) => setPostBody(event.target.value)} />
        </label>
        <br />
        <label>
          Post Image:
          <input type="file" ref={postImageInput} onChange={(event) => setPostImage(event.target.files[0])} />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
