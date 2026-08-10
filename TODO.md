# OAA — TODO

**Overall Ability Assessment**

Mobile application inspired by the Overall Ability Assessment system from
*Classroom of the Elite*.

---

# Core Concept

OAA is a continuous personal ability assessment system based on four official
ability areas:

- Academic Ability
- Physical Ability
- Adaptability
- Social Contribution

Overall Ability is derived from these four values.

## Overall Ability Formula

Overall Ability =

(Academic + Adaptability + Physical + Social Contribution × 0.5) / 3.5

This means Social Contribution has half the influence of each of the other
three abilities on the Overall Ability score.

## Assessment Philosophy

OAA combines:

- In-app assessments
- Real-world performance
- Real-world activities
- Verified external results
- Evidence submitted by users
- Progress history
- Training activities

Training does **not** directly increase official OAA scores.

Official scores can only change through:

- Valid in-app assessments
- Verified real-world results
- Verified real-world activities

The system must distinguish between training and assessment:

Training
↓
Improvement
↓
Assessment
↓
Demonstration of ability
↓
Official OAA change

---

# Roles

## User

Can:

- Create an account
- Complete the initial assessment
- View current OAA
- Take official assessments
- Complete training activities
- Register real-world results
- Register real-world activities
- Submit evidence
- Track verification status
- View progress and history
- Manage profile

## Admin

Can:

- View users
- Review verification requests
- View submitted evidence
- Approve real-world results
- Reject real-world results
- Manage assessments
- Manage training activities
- Manage scoring rules
- Review system activity
- Review historical verification actions

---

# OAA Categories

## Academic Ability

Measured primarily through academic performance.

Possible data sources:

- Written OAA assessments
- School grades
- Academic results
- Verified external exams
- Other verified academic performance

---

## Physical Ability

Measured through physical performance.

Possible data sources:

- OAA physical tests
- Sports results
- Physical education performance
- Gym activities
- Athletics
- Clubs
- Competitions
- Other verified physical results

---

## Adaptability

Measured through the user's ability to adapt to their environment and
different situations.

Possible factors:

- Situational assessments
- Improvisation
- Decision making
- Problem solving
- Communication
- Social situations
- Ability to respond to changing conditions
- Real-world challenges
- Verified activities

---

## Social Contribution

Measured through behavior, consistency, participation and contribution to
groups or communities.

Possible factors:

- Participation
- Attendance / consistency
- Team contribution
- Leadership
- Volunteering
- Responsibilities
- Positive behavioral records
- Negative behavioral records
- Community or school contribution
- Verified activities

---

# Overall Ability

Overall Ability is not assessed independently.

It is calculated from:

- Academic Ability
- Physical Ability
- Adaptability
- Social Contribution

Formula:

(Academic + Adaptability + Physical + Social Contribution × 0.5) / 3.5

---

# Score Ranks

- A+ → 96–100
- A  → 86–95
- A- → 81–85
- B+ → 76–80
- B  → 66–75
- B- → 61–65
- C+ → 56–60
- C  → 46–55
- C- → 41–45
- D+ → 36–40
- D  → 26–35
- D- → 21–25
- E+ → 16–20
- E  → 6–15
- E- → 1–5
- F  → 0

Scores must preserve decimal precision internally.

Example:

Academic Score: 78.42
Academic Rank: B+

The displayed rank is derived from the numerical score.

---

# Data Sufficiency

OAA must not invent scores when there is not enough information to evaluate
an ability.

Possible states include:

- Not Evaluated
- Insufficient Data
- Pending Verification
- Evaluated

Overall Ability must not be considered official until the minimum required
data exists for all four categories.

Example:

Academic Ability       B
Physical Ability       C+
Adaptability           Pending
Social Contribution    Insufficient Data

Overall Ability        Not Available

---

# Assessment Sources

Official OAA information can originate from two primary sources.

## In-App Assessments

Assessments performed directly inside OAA.

Examples:

- Written tests
- Timed tests
- Situational assessments
- Decision-making assessments
- Physical test recording

Results that can be objectively evaluated by OAA may be automatically
verified.

## Real-World Results

Performance or activities occurring outside OAA.

Examples:

- School exams
- Sports competitions
- Physical tests
- Projects
- Leadership activities
- Volunteering
- Group activities
- Other relevant achievements

These may require evidence and administrator verification.

---

# Verification States

Real-world submissions can have the following states:

- draft
- pending
- verified
- rejected

Only `verified` results can affect official OAA scores.

Pending results must never modify the official score.

Rejected submissions must preserve the rejection reason.

---

# Main User Flow

Create account
↓
Initial Assessment
↓
Receive first OAA
↓
Dashboard
↓
Training / Assessments / Real-world activities
↓
New results
↓
Verification when required
↓
Score recalculation
↓
Progress history updated
↓
New Overall Ability
↓
Repeat

---

# Navigation

Main mobile navigation:

- Home
- Assess
- Train
- Progress
- Profile

## Home

Shows the user's current OAA status.

## Assess

Contains official assessments and real-world result submission.

## Train

Contains activities intended to improve abilities.

Training does not directly modify official scores.

## Progress

Contains score history, rank changes, trends and assessment history.

## Profile

Contains account information, personal information and settings.

---

# Visual Identity

The application should be visually inspired by the Overall Ability Assessment
system shown in *Classroom of the Elite* while maintaining its own original
assets and implementation.

The interface should feel:

- Academic
- Institutional
- Minimal
- Precise
- Serious
- Clean
- Technological
- Data-focused

## Visual Direction

Prefer:

- White and very light gray backgrounds
- Dark institutional blue
- Medium blue for active elements
- Dark gray / near-black text
- Thin borders
- Clean cards and panels
- Limited corner rounding
- Subtle shadows when necessary
- Strong information hierarchy
- Prominent ability ranks
- Academic-record-style layouts
- Clean statistical visualizations

Avoid:

- Excessive gradients
- Neon colors
- Heavy shadows
- Excessively rounded cards
- Cartoon-like UI
- Excessive gamification
- Visually noisy interfaces

## Typography

Typography should feel similar to an institutional or academic information
system.

Requirements:

- Highly readable on iPhone
- Clear distinction between labels, values and ranks
- Large and prominent OAA ranks
- Consistent numerical typography
- Minimal unnecessary font variation

## Rank Presentation

Ranks such as:

A+
A
A-
B+
B

should be among the strongest visual elements of the application.

The numerical score should remain visible alongside the rank when useful.

Example:

Overall Ability

B+

78.42

---

# Platform Strategy

Primary platform:

- iPhone

Development priority:

1. iPhone
2. Android compatibility

Development environment:

- Arch Linux
- Expo
- React Native
- TypeScript
- Expo Router

Physical-device testing:

- iPhone
- Expo Go during early development
- Development Build when native functionality requires it

The UI must be designed mobile-first.

---

# Version Roadmap

## v0.1 — Foundation

### Project

- [x] Clean Expo project
- [x] Confirm app works on physical iPhone
- [x] Configure project metadata
- [x] Configure app name
- [x] Configure package / bundle identifiers
- [x] Configure basic folder structure

### Navigation

- [x] Configure basic navigation structure
- [x] Create placeholder screens:
  - [x] Home
  - [x] Assess
  - [x] Train
  - [x] Progress
  - [x] Profile
- [x] Confirm bottom navigation works on physical iPhone

### Design System

- [x] Define general OAA visual direction
- [x] Research visual references from the COTE OAA interface
- [x] Define final color palette
- [x] Define typography system
- [x] Define spacing system
- [x] Define border and radius system
- [x] Define shadow system
- [x] Define rank presentation
- [x] Create theme constants
- [x] Style bottom navigation
- [x] Configure status bar appearance

### Base Components

- [x] Create reusable Screen component
- [x] Create reusable Text component / typography system
- [x] Create reusable Card component
- [x] Create reusable Button component
- [x] Create reusable ability/rank display component

### Repository

- [x] Create initial README
- [x] Connect local project to GitHub
- [x] Review `.gitignore`
- [x] Run lint successfully
- [x] Test complete foundation on physical iPhone
- [x] Create first commit
- [x] Push v0.1 foundation to GitHub

### Definition of Done

- App launches successfully on physical iPhone
- Bottom navigation works
- All five main screens can be opened
- Project structure is clean
- Basic OAA design system exists
- Reusable base components exist
- No lint errors
- Repository is connected to GitHub
- Foundation is pushed to GitHub

---

## v0.2 — Authentication & Roles

### Supabase

- [x] Create Supabase project
- [x] Configure Supabase SDK
- [x] Configure environment variables
- [x] Configure Supabase Authentication
- [x] Configure PostgreSQL database
- [x] Configure profiles table
- [x] Configure Row Level Security (RLS)
- [x] Configure authentication redirect URL

### Authentication

- [x] Create authentication layout
- [x] Create registration screen
- [x] Create login screen
- [x] Add email/password registration
- [x] Add email/password login
- [x] Add email verification flow
- [x] Add logout
- [x] Add persistent sessions
- [x] Add authentication loading state
- [x] Add understandable authentication errors

### Users

- [x] Create Supabase profile record
- [x] Store account creation date
- [x] Add roles:
  - [x] user
  - [x] admin
- [x] Detect current user role
- [x] Load application profile from Supabase

### Route Protection

- [x] Protect authenticated routes
- [x] Protect admin routes
- [x] Prevent unauthenticated users from accessing OAA
- [x] Prevent normal users from accessing admin features

### Definition of Done

- New users can register
- Existing users can log in
- Email verification works
- Sessions persist after restarting the app
- Users can log out
- User and admin roles are correctly detected
- Unauthorized users cannot access protected screens
- Authentication works correctly on physical iPhone

---

## v0.3 — User Profile

### Profile Data

- [x] Create profile data model
- [x] Add display name
- [x] Add profile picture
- [x] Add optional personal information required for assessments
- [x] Add birth date
- [x] Add gender
- [x] Add school
- [x] Add grade level
- [x] Add height
- [x] Add weight

### Profile Interface

- [x] Create profile screen
- [x] Create edit profile screen
- [x] Display current profile information
- [x] Display current profile picture
- [x] Add profile image picker
- [x] Add profile editing validation

### Supabase

- [x] Store profile in Supabase PostgreSQL
- [x] Update profile data
- [x] Create profile image Storage bucket
- [x] Upload profile image
- [x] Store profile image path
- [x] Load private profile images with signed URLs
- [x] Configure profile database permissions
- [x] Configure profile Storage policies

### Remaining

- [x] Add account settings
- [x] Add delete account workflow
- [x] Add loading states
- [x] Add error states

### Definition of Done

- User profile is stored in Supabase
- User can edit profile
- Changes persist
- Profile picture can be changed
- Profile picture persists in Supabase Storage
- Profile is displayed correctly throughout OAA
- Account settings are available
- User account can be deleted safely

---

## v0.4 — OAA Core

### Models

- [ ] Create OAA data model
- [ ] Create ability score model
- [ ] Create rank model
- [ ] Create assessment result model
- [ ] Create score source model
- [ ] Create verification status model

### Scoring

- [ ] Create rank conversion utility
- [ ] Implement Overall Ability formula
- [ ] Preserve decimal precision
- [ ] Define score normalization rules
- [ ] Define minimum-data requirements
- [ ] Implement "Insufficient Data"
- [ ] Implement "Not Evaluated"
- [ ] Implement "Pending Verification"

### History

- [ ] Create OAA history model
- [ ] Create OAA snapshot model
- [ ] Create score recalculation service

### Testing

- [ ] Add scoring unit tests
- [ ] Test every rank boundary
- [ ] Test Overall Ability formula
- [ ] Test insufficient-data scenarios
- [ ] Test decimal precision

### Definition of Done

Given:

- Academic Ability
- Physical Ability
- Adaptability
- Social Contribution

OAA correctly calculates:

- Individual numerical scores
- Individual ranks
- Overall Ability score
- Overall Ability rank

No official Overall Ability is generated when required information is
insufficient.

---

## v0.5 — Dashboard

- [ ] Create OAA dashboard
- [ ] Display user identity
- [ ] Display Overall Ability
- [ ] Display numerical Overall score
- [ ] Display Overall rank
- [ ] Display Academic Ability
- [ ] Display Physical Ability
- [ ] Display Adaptability
- [ ] Display Social Contribution
- [ ] Add ability cards
- [ ] Add OAA visualization / radar chart
- [ ] Add recent activity section
- [ ] Add recommended improvement area
- [ ] Add last-updated information
- [ ] Add new-user empty state
- [ ] Add insufficient-data state
- [ ] Add loading state
- [ ] Add pull-to-refresh
- [ ] Match established OAA visual identity

### Definition of Done

The user can open Home and immediately understand:

- Current Overall Ability
- Current category scores
- Current ranks
- Recent changes
- Which area most needs improvement

---

## v0.6 — Initial Assessment

### Flow

- [ ] Create initial assessment onboarding
- [ ] Explain the four OAA abilities
- [ ] Explain how Overall Ability works
- [ ] Add assessment progress tracking
- [ ] Allow assessment to be paused
- [ ] Save partial progress
- [ ] Resume incomplete assessment

### Categories

- [ ] Create Academic initial assessment
- [ ] Create Physical initial assessment
- [ ] Create Adaptability initial assessment
- [ ] Create Social Contribution initial assessment

### Results

- [ ] Normalize assessment results
- [ ] Validate minimum required information
- [ ] Generate first ability scores
- [ ] Generate initial Overall Ability
- [ ] Save initial assessment
- [ ] Create first OAA history snapshot
- [ ] Show initial result summary

### Definition of Done

A new user can complete the onboarding assessment and receive a first valid
OAA result when sufficient information exists.

---

## v0.7 — Assessment System

### Assessment Engine

- [ ] Create generic assessment engine
- [ ] Support multiple question types
- [ ] Support multiple result types
- [ ] Support timed assessments
- [ ] Support automatic scoring
- [ ] Support category-specific scoring
- [ ] Support assessment instructions

### Attempts

- [ ] Store assessment attempts
- [ ] Save start time
- [ ] Save completion time
- [ ] Prevent accidental duplicate submissions
- [ ] Handle interrupted assessments

### Results

- [ ] Save automatically verified results
- [ ] Recalculate affected ability
- [ ] Recalculate Overall Ability
- [ ] Create OAA history snapshot when required
- [ ] Show assessment result summary
- [ ] Show numerical score changes
- [ ] Show rank changes

### Definition of Done

Users can complete official in-app assessments and valid assessment results
correctly update their official OAA.

---

## v0.8 — Real-World Activities

### Submission

- [ ] Create real-world activity submission flow
- [ ] Select OAA category
- [ ] Select activity/result type
- [ ] Add title
- [ ] Add description
- [ ] Add date
- [ ] Add numerical result when applicable
- [ ] Add contextual information

### Evidence

- [ ] Add image evidence support
- [ ] Add screenshot evidence support
- [ ] Store evidence securely
- [ ] Display uploaded evidence before submission

### Verification

- [ ] Implement submission states:
  - [ ] draft
  - [ ] pending
  - [ ] verified
  - [ ] rejected
- [ ] Submit activity for verification
- [ ] Prevent pending results from modifying OAA
- [ ] Apply verified results to OAA
- [ ] Preserve rejected submissions
- [ ] Display rejection reason
- [ ] Allow corrected resubmission when appropriate

### Definition of Done

A user can submit a real-world result with evidence and the result only
affects official OAA scores after successful verification.

---

## v0.9 — Progress & History

### History

- [ ] Create historical OAA snapshots
- [ ] Create assessment history
- [ ] Create verified activity history
- [ ] Create score-change history
- [ ] Create rank-change history

### Visualizations

- [ ] Create Overall Ability graph
- [ ] Create Academic Ability graph
- [ ] Create Physical Ability graph
- [ ] Create Adaptability graph
- [ ] Create Social Contribution graph

### Analysis

- [ ] Add progress summary
- [ ] Show strongest ability
- [ ] Show weakest ability
- [ ] Show largest improvement
- [ ] Show recent changes
- [ ] Add history filters
- [ ] Allow viewing the source of score changes

### Definition of Done

Users can clearly understand:

- How their OAA changed
- When it changed
- Why it changed
- Which assessments or activities caused changes
- Their strongest and weakest areas

---

# v1.0 — First OAA Release

## Complete User Flow

- [ ] Test account creation
- [ ] Test initial assessment
- [ ] Test OAA generation
- [ ] Test dashboard
- [ ] Test official assessments
- [ ] Test real-world submissions
- [ ] Test verification flow
- [ ] Test score recalculation
- [ ] Test progress history
- [ ] Test profile management

## UI / UX

- [ ] Complete UI/UX review
- [ ] Verify OAA visual consistency
- [ ] Test all screens on physical iPhone
- [ ] Test different iPhone screen sizes
- [ ] Test Android compatibility
- [ ] Review Safe Area behavior
- [ ] Review keyboard behavior
- [ ] Improve accessibility

## Reliability

- [ ] Handle offline/network errors
- [ ] Add application loading states
- [ ] Add empty states
- [ ] Add error boundaries
- [ ] Prevent duplicate operations
- [ ] Clean console warnings
- [ ] Clean unused dependencies

## Security

- [ ] Review Firestore security rules
- [ ] Review Firebase Storage security rules
- [ ] Verify role permissions
- [ ] Verify evidence access permissions
- [ ] Verify user data isolation

## Release

- [ ] Update README
- [ ] Complete TODO review
- [ ] Run lint
- [ ] Run tests
- [ ] Create production build test
- [ ] Create release commit
- [ ] Tag v1.0.0

### Definition of Done

A user can:

1. Register
2. Complete an initial assessment
3. Receive an OAA
4. View the OAA dashboard
5. Complete new assessments
6. Submit real-world results
7. See verified results modify official scores
8. Review historical progress
9. Understand why scores changed
10. Manage their profile

The application works reliably on a physical iPhone and the core OAA system
is complete.

---

# Post v1.0

## v1.1 — Training System

### Core

- [ ] Create training catalog
- [ ] Create training session model
- [ ] Create training history
- [ ] Track training completion

### Categories

- [ ] Academic training
- [ ] Physical training
- [ ] Adaptability training
- [ ] Social training

### Recommendations

- [ ] Recommend training based on weakest ability
- [ ] Recommend training based on detailed metrics
- [ ] Show recent training
- [ ] Show training consistency

Training must never directly modify official OAA scores.

Training
↓
Improvement
↓
Assessment
↓
Official score change

---

## v1.2 — Admin Verification

- [ ] Create admin navigation
- [ ] Create admin dashboard
- [ ] Create pending verification queue
- [ ] View submission details
- [ ] View submitted evidence
- [ ] View user context
- [ ] Approve submission
- [ ] Reject submission
- [ ] Add rejection reason
- [ ] Recalculate OAA after approval
- [ ] Create user verification history
- [ ] Create admin action logs
- [ ] Prevent unauthorized admin operations

---

## v1.3 — Assessment Management

- [ ] Create admin assessment editor
- [ ] Create assessments
- [ ] Edit assessments
- [ ] Disable assessments
- [ ] Manage questions
- [ ] Manage answers
- [ ] Manage scoring rules
- [ ] Manage category weights
- [ ] Preview assessments
- [ ] Version assessment content
- [ ] Preserve historical assessment results after edits

---

## v1.4 — Advanced Statistics

- [ ] Add detailed category metrics
- [ ] Add strength analysis
- [ ] Add weakness analysis
- [ ] Add long-term trends
- [ ] Add assessment comparisons
- [ ] Add training vs assessment comparison
- [ ] Add personal records
- [ ] Add detailed score-source analysis

---

# Future Ideas

## Apple / Health

- [ ] HealthKit integration
- [ ] Apple Health data
- [ ] Physical activity import
- [ ] Verified health/fitness metrics where appropriate

## Evidence

- [ ] PDF evidence
- [ ] Additional evidence types
- [ ] Multiple evidence files per submission

## Notifications

- [ ] Push notifications
- [ ] Verification result notifications
- [ ] Scheduled reassessments
- [ ] Assessment reminders

## Social

- [ ] Groups
- [ ] Community features
- [ ] Challenges
- [ ] Optional leaderboards

## Assessment

- [ ] Advanced adaptive assessments
- [ ] Additional physical assessments
- [ ] Additional situational assessments
- [ ] More detailed ability metrics

## Platform

- [ ] Offline support
- [ ] Development Build
- [ ] Production iOS distribution
- [ ] Production Android distribution