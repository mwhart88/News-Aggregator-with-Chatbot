# AI-Powered News Aggregator with Chatbot

This intelligent news aggregation platform automatically categorizes news articles, identifies important stories, and provides a conversational interface to ask questions about current events using a RAG-powered chatbot.

## 🎯 Key Features

- **Automated News Collection**: Uses make.com to automatically gather and preprocess Australian news articles daily from multiple australian news outlets
- **Automated News Classification**: Categorizes news articles into topics (sports, finance, politics, lifestyle, music)
- **Content Clustering**: Detects and groups similar news stories to reduce redundancy
- **Highlights Extraction**: Identifies the most important news stories based on priority scoring
- **RAG-Powered Chatbot**: Ask questions about current news using Retrieval-Augmented Generation
- **Modern React Frontend**: Clean, responsive UI built with React, TypeScript, and Tailwind CSS
- **Flask Backend API**: Robust Python backend for all AI processing and data management
- **Docker Support**: Easy deployment with Docker Compose

## 🛠️ Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Flask, Python
- **AI/ML**: OpenAI API, LangChain, ChromaDB
- **Automation**: make.com workflows
- **Deployment**: Docker, Docker Compose

## 📊 Data Processing Pipeline

The platform processes news data through several stages:
1. **Data Collection**: Automated gathering of Australian news articles daily using make.com, which:
   - Collects articles from major Australian news outlets
   - Performs initial preprocessing and data cleaning
   - Exports to Google Sheets, which is then converted to CSV format
2. **Classification**: Articles are categorized into predefined topics
3. **Clustering**: Similar content is grouped to reduce redundancy
4. **Highlight Extraction**: Important stories are identified based on relevance and priority
5. **Indexing**: Content is vectorized and stored for retrieval by the chatbot

## 💻 Technical Implementation

### Automation with make.com

The news aggregation workflow is automated using make.com (formerly Integromat), which:
- Schedules daily news collection from multiple Australian news sources
- Extracts article titles, content, publication dates, and source information
- Implements custom filters to remove duplicate articles and irrelevant content
- Normalizes data formats (dates, text encoding, etc.)
- Pushes clean data to Google Sheets automatically

### Data Preprocessing

The application performs several preprocessing steps on the collected news data:
- **Text Cleaning**: Removes HTML tags, special characters, and formatting issues
- **Date Standardization**: Converts various date formats to a consistent ISO format
- **Content Deduplication**: Identifies and removes duplicate articles using similarity metrics
- **Missing Data Handling**: Implements strategies for handling missing fields in articles
- **Content Truncation**: Ensures article content is within appropriate length limits for processing

### Data Analysis

After preprocessing, the application applies several data analysis techniques:
- **NLP-based Classification**: Uses natural language processing to categorize articles by topic
- **Semantic Clustering**: Groups similar articles based on content similarity
- **Importance Scoring**: Calculates priority scores based on recency, source credibility, and content relevance

## Project Structure

```
├── app.py             # Main Flask application
├── config.py          # Configuration settings
├── datasets/          # News datasets (CSV files)
├── rag/               # RAG implementation modules
│   ├── categorizer.py # News classification 
│   ├── clustering.py  # Content clustering
│   ├── highlights.py  # Highlights extraction
│   ├── utils.py       # Utility functions
│   └── vector_store.py # Vector database management
├── src/               # React frontend
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile.backend # Backend Dockerfile
├── Dockerfile.frontend # Frontend Dockerfile
└── nginx.conf         # Nginx configuration for the frontend
```

## Prerequisites

- Python 3.10+ (for local development)
- Node.js 18+ (for local frontend development)
- Docker and Docker Compose (for containerized deployment)
- OpenAI API Key

## Setup and Installation

### Option 1: Using Docker (Recommended)

1. **Clone the repository**

```bash
git clone https://github.com/mr-jestin-roy/News-Aggregator-with-Chatbot.git
cd News-Aggregator-with-Chatbot
```

2. **Create a .env file with your OpenAI API key**

```bash
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=8000" >> .env
echo "FLASK_DEBUG=False" >> .env
```

3. **Build and start the containers**

```bash
docker compose up -d
```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8000/api

### Option 2: Local Development

1. **Clone the repository**

```bash
git clone https://github.com/mr-jestin-roy/News-Aggregator-with-Chatbot.git
cd News-Aggregator-with-Chatbot
```

2. **Set up the backend**

```bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

3. **Run the backend**

```bash
python app.py
```

4. **Set up the frontend**

```bash
cd src
npm install
```

5. **Run the frontend**

```bash
npm run dev
```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api

## Using the News Aggregator

### Browse News by Category

Navigate to different categories using the navigation bar:
- Sports: Latest sports news and updates
- Finance: Business and economic news
- Politics: Political developments
- Lifestyle: Health, travel, and culture
- Music: Music industry news and events

### Using the Chatbot

1. Click on the chat icon in the bottom right corner
2. Ask questions about current news, such as:
   - "What's happening in politics today?"
   - "Tell me about recent sports events"
   - "What are the latest financial developments?"
   - "Are there any major music events happening?"

## 🔍 Use Cases

- News readers seeking a categorized, streamlined news experience
- Researchers wanting quick summaries of news trends
- Users looking to ask natural language questions about current events
- Media analysts tracking coverage across different topics

## Dataset Information

The application uses CSV files stored in the `datasets/` directory:
- `Aggregated News Dataset - Sheet1.csv`: Original news data
- `classified_articles.csv`: Processed news with classifications (generated automatically)
- `daily_highlights.csv`: Extracted highlights for the chatbot (generated automatically)

## Docker Commands

```bash
# Build the containers
docker compose build

# Start the containers
docker compose up -d

# View logs
docker compose logs -f

# Stop the containers
docker compose down

# Remove containers and volumes
docker compose down -v
```

## OpenAI API Key

This application requires an OpenAI API key to power the RAG chatbot functionality. You need to:

1. Obtain an API key from [OpenAI's platform](https://platform.openai.com/api-keys)
2. Add it to your `.env` file as `OPENAI_API_KEY=your_key_here`
3. Never commit your API key to version control!

## Troubleshooting

- **Backend connection issues**: Verify that both containers are running with `docker compose ps`
- **Missing data**: Ensure your dataset files exist in the `datasets/` directory
- **API key errors**: Check that your OpenAI API key is correctly set in the `.env` file
- **Container restarts**: View logs with `docker compose logs backend` to identify issues

## License

[MIT License](LICENSE)

## Acknowledgements

- This project was built using OpenAI's APIs
- Special thanks to the open-source libraries that made this possible 