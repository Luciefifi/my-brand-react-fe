
// const postsContainer = document.getElementById("postsContainer")
// const postLike = document.getElementById('postLike')
// var posts = ''
// const URL = "http://localhost:5000/api/getAllBlogs"
// fetch(URL)
//   .then(res => {
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   })
//   .then(data => {

// for(let i=0; i< data.data.length; i++){
//     postsArray = data.data[i]
//     console.log(postsArray.length)
//     const title = postsArray.title;
//     const picture = postsArray.image;
//     const postId = postsArray._id;
//     const description = postsArray.description;
//     const body = postsArray.blogBody;
//     const date = postsArray.createdAt;
//     const authorNames = postsArray.createdBy.firstName +" "+postsArray.createdBy.lastName;
//     const authorImageTemplate = postsArray.createdBy.firstName.charAt(0) + postsArray.createdBy.lastName.charAt(0)
//       // console.log(postsArray.length)
//        postsContainer.innerHTML += `
//         <div href="#" class="card-box">
//         <img src="${picture}" class="card-img">
//         <div class="card-text">
//         <div class="card-data">
//             <div class="card-author">
//             <div class="profilePicture">
//               ${authorImageTemplate}
//             </div>
//             <div class="author-info blogAuthorInfo">
//                 <p class="author-name">${authorNames}</p>
//                 <p class="post-timestamp">Admin</p>
//             </div>
//             </div>
//             <p class="blogSlash">/</p>
//             <p class="data-text">${date}</p>
//         </div>

//         <a href="singleBlog.html?postId=${postId}" class="card-title">${title}</a>
//         <p class="card-description">${description}</p>
//         </div>
//     </div>
//     `

// }

//   })
// //    console.log(posts);
//   .catch(error => console.log(error.message));




const root = document.getElementById("postsContainer")
const { useState, useEffect } = React;
function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const URL = "https://nice-ruby-squid-slip.cyclic.app/api/getAllBlogs";
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setBlogs(data.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div    style={{
      display: "grid",
      gridTemplateColumns: "auto auto",
      justifyContent: "center",
      gap: "2rem",
      marginTop: "3rem",
      width: "100%",
    }}>
      {blogs.map(blog => (
        <div href="#" className="card-box" key={blog._id}>
          <img src={blog.image} className="card-img" />
          <div className="card-text">
            <div className="card-data">
              <div className="card-author">
                <div className="profilePicture">
                  {blog.createdBy.firstName.charAt(0) + blog.createdBy.lastName.charAt(0)}
                </div>
                <div className="author-info blogAuthorInfo">
                  <p className="author-name">{blog.createdBy.firstName} {blog.createdBy.lastName}</p>
                  <p className="post-timestamp">Admin</p>
                </div>
              </div>
              <p className="blogSlash">/</p>
              <p className="data-text">{blog.createdAt}</p>
            </div>
            <a href={`singleBlog.html?postId=${blog._id}`} className="card-title">{blog.title}</a>
            <p className="card-description">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
ReactDOM.render(<BlogList/>,root)