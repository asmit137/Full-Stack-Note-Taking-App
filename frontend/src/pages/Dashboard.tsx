import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode"; 

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  exp: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [user, setUser] = useState<DecodedToken | null>(null);

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data);
  };

  const createNote = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newNote }),
    });
    setNewNote("");
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser(decoded);
      fetchNotes();
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/signin");
    }
  }, []);

  return (
    <>
    <Navbar />
    
    <div className="max-w-xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Welcome, {user?.name || "User"}</h1>
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Write a note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          onClick={createNote}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {notes.map((note: any) => (
          <li
            key={note._id}
            className="flex justify-between items-center p-2 border rounded mb-2"
          >
            {note.content}
            <button
              onClick={() => deleteNote(note._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Dashboard;
