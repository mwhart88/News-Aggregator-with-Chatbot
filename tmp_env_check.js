// This is a temporary file to check environment variables
console.log("Environment check:");
console.log("import.meta.env.VITE_API_URL =", import.meta.env.VITE_API_URL);
console.log("Default URL =", "http://localhost:8000");
console.log("Actual URL used =", import.meta.env.VITE_API_URL || "http://localhost:8000"); 