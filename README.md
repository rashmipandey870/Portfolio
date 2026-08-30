# Rashmi Pandey | Interactive Systems Developer Portfolio

Welcome to my portfolio! This repository contains a highly interactive, responsive single-page web application designed to showcase my capabilities in **distributed systems**, **carbon-aware cloud routing (DVQ)**, and **full-stack software engineering** to prospective clients.

Live link: [https://rashmipandey870.github.io/Portfolio/](https://rashmipandey870.github.io/Portfolio/)

---

## 🚀 Key Features & Interactive Showcases

1. **DVQ Carbon-Aware Routing Simulator**:
   - An interactive, visual dashboard demonstrating Lyapunov drift-plus-penalty optimization across 7 global AWS regions.
   - Dynamic parameter sliders to control **incoming traffic (req/s)**, **local grid carbon intensity (g CO2/kWh)**, and the **Lyapunov control constant (V)**.
   - Live network map canvas showing automated routing paths and regional outages, backed by a real-time analytics chart graphing carbon savings vs queuing latency.

2. **Developer Terminal & API Sandbox**:
   - An embedded terminal shell interface that allows visitors to execute queries (e.g. `help`, `about`, `skills`, `projects`).
   - Mock REST API routing endpoints (`curl /api/skills`, `curl /api/projects`, `curl /api/resume`) yielding syntax-highlighted JSON payloads.

3. **AI Copilot (Resume Assistant)**:
   - A floating conversation helper that answers common recruitment questions in real-time, including availability, stack preferences, and internship history.

4. **Printable Curriculum Vitae**:
   - A clean, dedicated printable layout modal. Clicking "Print/Save PDF" generates a professional print-ready document using custom CSS layout rules.

---

## 🛠️ Technology Stack

* **Core Framework**: React 18 (Vite-optimized setup)
* **Styling & Layout**: Tailwind CSS v3 & FontAwesome Icons
* **Animations**: Framer Motion
* **Analytics Rendering**: Recharts
* **CI/CD Pipeline**: GitHub Actions (`JamesIves/github-pages-deploy-action`)

---

## 💻 Local Setup & Development

Ensure you have Node.js 18+ and npm installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rashmipandey870/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch local dev environment**:
   ```bash
   npm run dev
   ```

4. **Verify production bundle locally**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📦 Deployment (GitHub Pages)

The project includes an automated GitHub Actions pipeline located at `.github/workflows/deploy.yml`. 

Every push to the `main` branch:
1. Triggers the action runner.
2. Checks out the code, installs dependencies, and runs `npm run build`.
3. Pushes the compiled static bundle (`/dist` output) to the `gh-pages` branch.

**To enable hosting:**
1. Navigate to your GitHub repository settings.
2. Select **Pages** on the left menu.
3. Under **Build and deployment**, set the source to **Deploy from a branch** and select the **`gh-pages`** branch.
4. Your portfolio will go live instantly at your profile's domain!
