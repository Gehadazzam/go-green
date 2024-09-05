import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebaseConfig";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return; // Ensure user is logged in

    const post = {
      ...newPost,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
      likes: 0,
      comments: [],
    };

    if (image) {
      const imageRef = ref(storage, `posts/${image.name}`);
      await uploadBytes(imageRef, image);
      post.imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "posts"), post);
    setNewPost({ title: "", description: "" });
    setImage(null);
  };

  const handleLike = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: posts.find((p) => p.id === postId).likes + 1,
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-12 lg:px-24">
      <h1 className="text-3xl font-bold mb-4">Community</h1>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-2 mb-2 border rounded outline-none focus:border-quaternary focus:border-2"
        />
        <textarea
          placeholder="Description"
          value={newPost.description}
          onChange={(e) =>
            setNewPost({ ...newPost, description: e.target.value })
          }
          className="w-full p-2 mb-2 border rounded-lg resize-none outline-none focus:border-quaternary focus:border-2"
        />
        <input
          type="file"
          required
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Post
        </button>
      </form>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded p-4 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.description}</p>
            <button
              onClick={() => handleLike(post.id)}
              className="mt-2 bg-quaternary text-white p-1 rounded"
            >
              ❤️ {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
