# OAA — Overall Ability Assessment

OAA is a mobile continuous ability assessment system inspired by the **Overall Ability Assessment (OAA)** system from *Classroom of the Elite*.

The application is designed to evaluate, track, and visualize a user's abilities over time through a combination of in-app assessments and verified real-world results.

> This is an independent fan-inspired software project and is not affiliated with or endorsed by the creators or rights holders of *Classroom of the Elite*.

---

## Core Concept

OAA evaluates four main areas:

- **Academic Ability**
- **Physical Ability**
- **Adaptability**
- **Social Contribution**

These values are combined to calculate the user's **Overall Ability**.

### Overall Ability Formula

```text
Overall Ability =
(Academic + Adaptability + Physical + Social Contribution × 0.5) / 3.5
```

Social Contribution has half the weight of the other three categories.

Scores preserve decimal precision internally.

Example:

```text
Academic Score: 78.42
Academic Rank: B+
```

---

## Ability Categories

### Academic Ability

Evaluated through academic performance such as:

- Written assessments
- School grades
- Academic results
- Verified external exams

### Physical Ability

Evaluated through physical performance such as:

- Physical tests
- Sports results
- Physical education performance
- Athletics and gym activities
- Verified competitions

### Adaptability

Evaluated through areas such as:

- Decision making
- Improvisation
- Communication
- Situational assessments
- Social situations
- Real-world challenges

### Social Contribution

Evaluated through areas such as:

- Participation
- Consistency
- Attendance
- Team contribution
- Leadership
- Responsibilities
- Volunteering
- Positive or negative behavioral records

---

## Rank System

| Rank | Score |
|------|-------|
| A+ | 96–100 |
| A | 86–95 |
| A- | 81–85 |
| B+ | 76–80 |
| B | 66–75 |
| B- | 61–65 |
| C+ | 56–60 |
| C | 46–55 |
| C- | 41–45 |
| D+ | 36–40 |
| D | 26–35 |
| D- | 21–25 |
| E+ | 16–20 |
| E | 6–15 |
| E- | 1–5 |
| F | 0 |

---

## How OAA Works

```text
Create Account
      ↓
Initial Assessment
      ↓
Receive First OAA
      ↓
Dashboard
      ↓
Training / Assessments / Real-World Activities
      ↓
Verified Results
      ↓
Scores Recalculated
      ↓
Progress History Updated
      ↓
New Overall Ability
```

Training activities are designed to help users improve their abilities, but **training does not directly modify official OAA scores**.

Official scores are modified only through valid assessments and verified real-world results.

---

## User Roles

OAA is designed around two roles.

### User

Users will be able to:

- Create an account
- Complete an initial assessment
- View their current OAA
- Complete official assessments
- Complete training activities
- Submit real-world results
- Submit evidence for verification
- Track historical progress
- Manage their profile

### Admin

Administrators will be able to:

- Review users
- Review verification requests
- Approve or reject real-world results
- Manage assessments
- Manage training activities
- Manage scoring rules
- Review system activity

---

## Main Navigation

The mobile application uses five primary sections:

```text
Home
Assess
Train
Progress
Profile
```

### Home

Current Overall Ability and category overview.

### Assess

Official assessments used to measure abilities.

### Train

Activities designed to improve specific abilities.

### Progress

Historical scores, statistics, and ability development.

### Profile

Account and personal information.

---

## Technology

OAA is currently being developed with:

- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind
- Tailwind CSS
- Firebase *(planned for authentication and backend services)*

Primary development and testing currently targets **iPhone / iOS**, while maintaining compatibility with Android where possible.

---

## Project Status

OAA is currently under active development.

### v0.1 — Foundation

Current foundation includes:

- Expo project setup
- TypeScript
- Expo Router
- NativeWind
- OAA design system
- Reusable base components
- Bottom-tab navigation
- Initial placeholder screens
- Physical iPhone testing

The next development milestone is:

### v0.2 — Authentication & Roles

Planned features include:

- Firebase integration
- Registration
- Login
- Persistent sessions
- User accounts
- User/Admin roles
- Protected routes

See [`TODO.md`](./TODO.md) for the complete development roadmap.

---

## Design Direction

The interface is inspired by the technological and institutional aesthetic associated with the OAA system in *Classroom of the Elite*.

The design system focuses on:

- Dark backgrounds
- Blue/cyan accents
- Thin borders
- High information clarity
- Minimal decoration
- Technical typography
- Data-focused interfaces
- Consistent ability and rank presentation

The goal is to preserve the identity of the inspiration while building a functional mobile assessment application.

---

## Development

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

For development through Expo Go using a tunnel:

```bash
npx expo start --tunnel
```

Run ESLint:

```bash
npm run lint
```

Run TypeScript validation:

```bash
npx tsc --noEmit
```

---

## Roadmap

Development is organized into incremental versions:

```text
v0.1  Foundation
v0.2  Authentication & Roles
v0.3  User Profile
v0.4  OAA Core
v0.5  Dashboard
v0.6  Initial Assessment
v0.7  Assessment System
v0.8  Real-World Activities
v0.9  Progress & History
v1.0  First OAA Release
```

Post-v1.0 development is planned to expand training, administration, assessment management, and advanced statistics.

For detailed tasks and definitions of done, see [`TODO.md`](./TODO.md).

---

## Disclaimer

OAA is an independent, fan-inspired software project created for educational and personal development purposes.

*Classroom of the Elite* and related names, concepts, and intellectual property belong to their respective rights holders.

This project is not an official *Classroom of the Elite* application and is not affiliated with or endorsed by its creators, publishers, or rights holders.