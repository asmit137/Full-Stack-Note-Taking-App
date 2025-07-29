import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    if (!newNote.trim()) return;
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <div className="w-full px-4 py-4 border-b shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg width="30" height="20" viewBox="0 0 47 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.6424 0.843087L24.4853 0L21.8248 9.89565L19.4228 0.961791L16.2656 1.80488L18.8608 11.4573L12.3967 5.01518L10.0855 7.31854L17.1758 14.3848L8.34596 12.0269L7.5 15.1733L17.1477 17.7496C17.0372 17.2748 16.9788 16.7801 16.9788 16.2717C16.9788 12.6737 19.9055 9.75685 23.5159 9.75685C27.1262 9.75685 30.0529 12.6737 30.0529 16.2717C30.0529 16.7768 29.9952 17.2685 29.8861 17.7405L38.6541 20.0818L39.5 16.9354L29.814 14.3489L38.6444 11.9908L37.7984 8.84437L28.1128 11.4308L34.5768 4.98873L32.2656 2.68538L25.2737 9.65357L27.6424 0.843087Z" fill="#367AFF" />
          </svg>
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-blue-600 hover:underline"
        >
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-6 flex justify-center">
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          {/* Welcome card */}
          <div className="w-full bg-white shadow-sm border rounded-lg p-4 text-center">
            <h2 className="font-semibold mb-1">
              Welcome, {user?.name ? user.name
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ") : "User"}!
            </h2>

            <p className="text-sm text-gray-500">
              Email: {user?.email ? user.email.replace(/(.{3}).+(@.+)/, "$1xxxxx$2") : "xxxx@xxxx.com"}
            </p>
          </div>

          {/* New Note input */}
          <div className="flex w-full gap-2">
            <input
              type="text"
              placeholder="Write a note..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              onClick={createNote}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Add
            </button>
          </div>

          {/* Notes list */}
          <div className="w-full">
            <h3 className="text-md font-semibold mb-3">Your Notes</h3>
            <div className="flex flex-col gap-3">
              {notes.map((note: any) => (
                <div
                  key={note._id}
                  className="flex justify-between items-center px-4 py-2 bg-white border rounded shadow-sm"
                >
                  <span className="text-sm">{note.content}</span>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="text-gray-600 hover:text-red-500 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
