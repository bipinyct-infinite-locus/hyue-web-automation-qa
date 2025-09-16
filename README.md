---

# 🧪 QA Automation Framework – Playwright + JavaScript

This is an **industry-grade QA Automation Framework** built using **Playwright with JavaScript**.
Designed for **scalability, maintainability, and CI/CD readiness**, it helps QA engineers write clean and reliable automated tests.

---

## 🚀 Features

* **Page Object Model (POM) design** – keeps tests clean and maintainable
* **Environment configuration** via `.env`
* **CI/CD integration** with GitHub Actions
* **HTML reports** and **test data fixtures**
* **Screenshots and video recording** on failures
* **Modular folder structure** for tests and utilities
* **Linting and clean code practices**

---

## 📁 Folder Structure

| Folder / File        | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `tests/`             | Test specs organized by feature          |
| `pages/`             | Page Object Models (POM)                 |
| `utils/`             | Helper utilities like logger, data utils |
| `test-data/`         | Static test data in JSON                 |
| `config/`            | Environment-specific configurations      |
| `reports/`           | Auto-generated test reports              |
| `.github/workflows/` | GitHub Actions CI/CD workflows           |

---

### ⚡ Usage

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables in `.env`

3. Run tests:

```bash
npx playwright test
```

4. Generate reports (if configured):

```bash
npx playwright show-report
```

---

