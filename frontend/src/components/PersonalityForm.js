import React, { useState } from "react";
import axios from "axios";

const PersonalityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject1: "",
    subject2: "",
    subject3: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // clamp value between 0 and 100
  const clampMarks = (value) => {
    if (value === "") return "";
    const num = Number(value);
    if (num < 0) return 0;
    if (num > 100) return 100;
    return num;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // apply limit only to subjects
    if (name.startsWith("subject")) {
      setFormData({
        ...formData,
        [name]: clampMarks(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/personality",
        {
          name: formData.name,
          subject1: Number(formData.subject1),
          subject2: Number(formData.subject2),
          subject3: Number(formData.subject3),
        }
      );

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-6">
          Personality Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          {/* Subjects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["subject1", "subject2", "subject3"].map((sub, i) => (
              <div key={sub}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject {i + 1}
                </label>
                <input
                  type="number"
                  name={sub}
                  min={0}
                  max={100}
                  value={formData[sub]}
                  onChange={handleChange}
                  placeholder="0 - 100"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-indigo-700 active:scale-95 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Calculating..." : "Discover My Personality Trait"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="mt-4 text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
            <h2 className="text-lg font-semibold mb-2">
              Hello, {result.name} 👋
            </h2>

            <p className="text-gray-700">
              <strong>Average:</strong> {result.average}
            </p>
            <p className="text-gray-700">
              <strong>Grade:</strong> {result.grade}
            </p>

            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Your Personality Trait
              </p>
              <p className="text-xl font-bold text-indigo-600">
                {result.personalityTrait}
              </p>

              <p className="mt-2 text-gray-600 text-sm">
                {result.personalityTrait === "Leader" &&
                  "You are confident, ambitious, and naturally take charge."}
                {result.personalityTrait === "Thinker" &&
                  "You are analytical, thoughtful, and love solving problems."}
                {result.personalityTrait === "Artist" &&
                  "You are creative, expressive, and imaginative."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityForm;
