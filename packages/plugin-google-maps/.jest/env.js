process.env.NEO4J_URI = "bolt://localhost:7687"
process.env.NEO4J_USERNAME = "neo4j"
process.env.NEO4J_PASSWORD = "rel"

// Yes, I know you're not supposed to check-in secrets to a repo.
// This is a scoped key to Google Maps only and is almost always disabled.
// Project admins need to re-enable this key before being able to update Pollyjs recordings.
// Plus, it's the internet, and you can trust everyone. 
// But in reality, all we're testing is Google's ability to IP restrict.
process.env.GOOGLE_MAPS_API_KEY = "AIzaSyDgLbGqW7oeWvYy5ELiaq8PUjkZ37fg2Aw"

// Record or Replay saved requests.
// process.env.POLLY_MODE = "record"
process.env.POLLY_MODE = "replay"