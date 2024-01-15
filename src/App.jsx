import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movies, setMovies] = useState([]);

  //New Movie States
  const [movieTitle, setMovieTitle] = useState("");
  const [movieReleaseDate, setMovieReleaseDate] = useState(0);
  const [isRecivedSocar, setIsRecivedSocar] = useState(false);

  //update movie state
  const [updateTitle, setUpdateTitle] = useState("");

  //file upload state
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      //Read the data
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovies(filteredData);
      } catch (error) {
        console.log(error);
      }

      //set into state
    };
    getMovieList();
  }, [moviesCollectionRef]);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: movieTitle,
        releaseDate: movieReleaseDate,
        recivedAnOscar: isRecivedSocar,
        userId: auth?.currentUser.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.log(error);
    }
  };
  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updateTitle });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie Title...."
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date...."
          onChange={(e) => setMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isRecivedSocar}
          onChange={(e) => setIsRecivedSocar(e.target.checked)}
        />
        <label htmlFor=""> Recived an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movies?.map((movie) => {
          return (
            <div key={movie.id}>
              <h1 style={{ color: movie.recivedAnOscar ? "green" : "" }}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate} </p>
              <button onClick={() => deleteMovie(movie.id)}>
                delete Movie
              </button>
              <input
                type="text"
                placeholder="update Title"
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>update</button>
            </div>
          );
        })}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
