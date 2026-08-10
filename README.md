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
| ---- | ----- |
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
- Supabase
  - Authentication
  - PostgreSQL Database
  - Storage
  - Row Level Security (RLS)

Supabase provides the backend infrastructure for OAA, including:

- User authentication
- Persistent sessions
- User profiles
- User and Admin roles
- PostgreSQL data persistence
- Profile image storage
- Row Level Security
- Storage access policies

Primary development and testing currently targets **iPhone / iOS**, while maintaining compatibility with Android where possible.

---

## Backend Architecture

OAA uses **Supabase** as its backend platform.

### Authentication

Supabase Authentication currently handles:

- Email/password registration
- Email/password login
- Email verification
- Persistent sessions
- Logout
- Authentication state management

### Database

User application data is stored in Supabase PostgreSQL.

The current profile model includes:

- User ID
- Email
- Role
- Display name
- Profile image
- Birth date
- Gender
- School
- Grade level
- Height
- Weight
- Creation timestamp
- Update timestamp

### Roles

OAA currently supports:

```text
user
admin
```

Roles are stored in the application profile and used to protect application routes and administrative functionality.

### Storage

Supabase Storage is used for user-uploaded files.

The current implementation includes profile image storage using the:

```text
profile-images
```

bucket.

Profile images are stored using user-specific paths and accessed through signed URLs.

### Security

Backend access is controlled using:

- Supabase Authentication
- PostgreSQL permissions
- Row Level Security (RLS)
- Storage policies
- User-specific resource access
- Protected application routes
- Admin-only application routes

---

## Project Status

OAA is currently under active development.

### v0.1 — Foundation

**Completed**

The initial application foundation includes:

- Expo project setup
- TypeScript
- Expo Router
- NativeWind
- Tailwind CSS
- OAA design system
- Reusable base components
- Bottom-tab navigation
- Main application screens
- Project metadata
- iOS bundle identifier
- Physical iPhone testing
- Git/GitHub repository setup

### v0.2 — Authentication & Roles

**Completed**

The authentication and role system includes:

- Supabase integration
- Environment variable configuration
- Supabase Authentication
- PostgreSQL profile records
- Email/password registration
- Email/password login
- Email verification flow
- Persistent authentication sessions
- Logout
- Authentication loading states
- Authentication error handling
- User roles
- Admin roles
- Current-role detection
- Protected authenticated routes
- Protected Admin routes
- Row Level Security configuration
- Authentication redirect configuration

### v0.3 — User Profile

**In Development**

Currently implemented:

- User profile data model
- Display name
- Birth date
- Gender
- School
- Grade level
- Height
- Weight
- Profile screen
- Edit profile screen
- Persistent profile updates
- Profile image selection
- Supabase Storage integration
- Profile image upload
- Private profile image access through signed URLs
- Profile loading states
- Profile error states

Remaining work includes:

- Account settings
- Account deletion workflow
- Final profile flow testing

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

### Install Dependencies

```bash
npm install
```

### Environment Variables

OAA requires Supabase environment variables.

Create a local `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_publishable_key
```

Do not commit the real `.env` file to the repository.

Use `.env.example` to document the environment variables required by the application.

### Start Expo

```bash
npx expo start
```

### Start Expo with Tunnel

For physical-device development through Expo Go:

```bash
npx expo start --tunnel
```

### Clear Expo Cache

If Metro or Expo develops cache-related problems:

```bash
npx expo start --clear
```

Or with a tunnel:

```bash
npx expo start --clear --tunnel
```

### Run ESLint

```bash
npm run lint
```

### Run TypeScript Validation

```bash
npx tsc --noEmit
```

---

## Development Builds

OAA is configured to support Expo development builds through EAS.

The project contains an `eas.json` configuration with:

- Development
- Preview
- Production

build profiles.

A development build can be requested with:

```bash
eas build --profile development --platform ios
```

A valid Apple Developer configuration may be required for iOS development builds and distribution.

Expo Go remains suitable for functionality that does not require unsupported native modules.

---

## Project Structure

The project follows a modular structure centered around Expo Router.

```text
app/
├── (auth)/
├── (tabs)/
├── admin/
├── auth/
└── profile/

assets/

components/

constants/

lib/
└── supabase.ts

providers/
└── AuthProvider.tsx

services/
├── authService.ts
├── profileService.ts
└── profileImageService.ts

types/
└── user.ts
```

### `app/`

Contains application routes and screens managed through Expo Router.

### `components/`

Contains reusable OAA interface components.

### `constants/`

Contains shared application and design-system constants.

### `lib/`

Contains infrastructure configuration such as the Supabase client.

### `providers/`

Contains global React providers, including authentication state management.

### `services/`

Contains application logic for communicating with backend services.

### `types/`

Contains shared TypeScript models and application types.

---

## Authentication Flow

The current authentication flow is:

```text
Open OAA
    ↓
Load persisted Supabase session
    ↓
Authenticated?
    ├── No → Authentication screens
    │
    └── Yes
         ↓
    Load profile
         ↓
    Detect role
         ↓
    User → Main OAA application
    Admin → Main OAA application + Admin access
```

Application routes are protected according to the authentication state and user role.

---

## Profile Flow

The current profile system follows:

```text
Supabase Auth User
        ↓
profiles table
        ↓
AppUser
        ↓
AuthProvider
        ↓
Profile / Application
```

When the user edits their profile:

```text
Edit Profile
      ↓
Validate data
      ↓
Update Supabase profile
      ↓
Refresh AppUser
      ↓
Updated UI
```

Profile images follow a separate Storage flow:

```text
Select Image
      ↓
Supabase Storage
      ↓
Store image path
      ↓
profiles.photo_url
      ↓
Generate signed URL
      ↓
Display image
```

---

## Roadmap

Development is organized into incremental versions:

```text
v0.1  Foundation                    ✓
v0.2  Authentication & Roles        ✓
v0.3  User Profile                  In Development
v0.4  OAA Core
v0.5  Dashboard
v0.6  Initial Assessment
v0.7  Assessment System
v0.8  Real-World Activities
v0.9  Progress & History
v1.0  First OAA Release
```

Post-v1.0 development is planned to include:

```text
v1.1  Training System
v1.2  Admin Verification
v1.3  Assessment Management
v1.4  Advanced Statistics
```

For detailed tasks and definitions of done, see [`TODO.md`](./TODO.md).

---

## Planned OAA Architecture

As development progresses, OAA will expand beyond user accounts and profiles into the complete assessment system.

The planned data flow is:

```text
User
 ↓
Assessment / Real-World Result
 ↓
Result Validation
 ↓
Verification
 ↓
Ability Score
 ↓
Rank
 ↓
Overall Ability
 ↓
History Snapshot
 ↓
Progress Analysis
```

Only valid assessment results and verified real-world results will modify official OAA scores.

---

## Security Principles

OAA handles user-specific assessment and profile information.

The backend architecture should therefore maintain:

- User data isolation
- Row Level Security
- Restricted profile modification
- Protected administrative operations
- Secure Storage policies
- User-specific uploaded files
- Role-based authorization
- No privileged backend credentials inside the client application

Client-side route protection is intended for application navigation and user experience.

Sensitive authorization must also be enforced at the database and Storage level through Supabase policies and permissions.

---

## Disclaimer

OAA is an independent, fan-inspired software project created for educational and personal development purposes.

*Classroom of the Elite* and related names, concepts, and intellectual property belong to their respective rights holders.

This project is not an official *Classroom of the Elite* application and is not affiliated with or endorsed by its creators, publishers, or rights holders.