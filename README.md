# ♻️ Recycling Line Manager Selection Dashboard

A React-based dashboard designed to help HR managers evaluate and select the best candidates for a high-stress Recycling Production Line Manager role. 

This system uses AI-generated scoring to visualize candidate performance in **Crisis Management**, **Sustainability**, and **Team Motivation**.

## 🚀 Features
- **Leaderboard:** Instantly view top-ranked candidates with Gold/Silver/Bronze indicators.
- **Skill Heatmap:** Visual grid to spot performance patterns across specific competencies.
- **Candidate Profiles:** Detailed views with experience, education, and breakdown of AI scores.
- **Search & Filter:** Find applicants by name or specific skill sets (e.g., "SAP", "OSHA").

## 🛠️ Tech Stack
- **Frontend:** React + Vite
- **UI Library:** Mantine UI (v7)
- **Routing:** React Router Dom
- **Icons:** Tabler Icons
- **Data:** Synthetic JSON (Mocked)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/recycling-dashboard.git](https://github.com/YOUR_USERNAME/recycling-dashboard.git)
   cd recycling-dashboard

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run the development server**
    ```bash
    npm run dev
    ```


4. **Open in Browser**
Navigate to `http://localhost:5173`

## 🌱 Data Seeding (Optional)

The project includes a realistic data generator script used to create the initial SQL schema and JSON mock data. This ensures the dashboard is populated with 40+ diverse, statistically relevant candidate profiles.

**To regenerate the dataset:**

```bash
node src/scripts/generateData.js
```

This will automatically update `src/data/mockCandidates.json` and `database/schema.sql`.

## 📂 Project Structure

* `/src/components`: Reusable UI widgets (Cards, Heatmap, Leaderboard).
* `/src/pages`: Main views (Dashboard, Details, Search).
* `/src/data`: Mock JSON data representing the database.
* `/database`: SQL schema reference.
* `/src/scripts`: Data generation scripts.
* `AI_PROMPTS.md`: AI prompts used for generation.

## 🤖 AI Integration

The data for this dashboard was generated using Large Language Models (LLMs) to simulate realistic candidate variations. The database schema in `/database/schema.sql` reflects the structure required to persist this data in a production environment.
