# Rome With Mike Portal (Official Operations & Mike Tours Calculator)

> **The unified operations, digital manifest, and tour guide fee calculator platform for Rome With Mike.**

A tailored, high-fidelity platform uniting **TourMan** operations management with the official **Mike Tours Calculator** engine, built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## 🏛️ What Is Rome With Mike Portal?

**Rome With Mike Portal** centralizes everything needed to run Rome's premier boutique tour agency:
1. **Multi-Channel OTA Ingestion**: Automatically syncs bookings from **GetYourGuide**, **Viator**, and **Airbnb** via email parsing into live digital manifests.
2. **Integrated Mike Tours Calculator**: The exact spreadsheet calculation engine used by **Mighty Mike (The Boss)** and company guides with role-based privacy, taxi reimbursements, and instant PDF statement generation.
3. **PWA Mobile Manifests & 1-Tap Check-in**: Field-ready interface for guides standing outside the Catacombs, Colosseum, and Pantheon.
4. **Smart Guide Scheduler**: Match certified local guides based on language skills and licenses.
5. **AI WhatsApp Concierge**: Multi-lingual guest communication answering questions regarding meeting points, dress codes, and delays.

---

## 🧮 Integrated Mike Tours Calculator

Located in the app under **"Mike Tours Calculator"** (with `OFFICIAL` badge):

### 1. Dual-View Control
- **Guide Calculator View**: Guides (Alain Piredda, Amanda Karr, Divan Hattingh, etc.) log their monthly tours, pax count, taxi, and expenses with instant fee calculation.
- **Master Admin Dashboard (Mighty Mike / The Boss)**: Overview of all guides' monthly submissions, total pax, expenses, and final net payouts in one master table.

### 2. Exact Formula Engine
- **Catacombs / Hidden Rome**: €45 base + €10 per additional pax (over 2).
- **Catacombs Express / Bones Express**:
  - Unpaired (`Paired = No`): €35 base + €5 per additional pax (over 2).
  - Paired (`Paired = Yes`): €0 base, Fee = `Pax × €5`.
- **Ostia Antica**: €55 base.
- **Private (PVT) Tours** (*Ostia PVT, Catacombs PVT, Hidden Rome PVT, Must See Roman Landmarks PVT, Eat Like the Romans Food Tour PVT*): Flat €125.
- **Ghost Tour Pvt**: Flat €190 (€125 + €65).
- **CatCOMBO (Divan/Mike Combo Tour)**: €22.50 base + `Pax × €10`.
- **Must See Roman Landmarks / Eat Like the Romans Food Tour**: €40 base + €10 per additional pax (over 2).
- **Taxi Reimbursement**: Enabled for *Hidden Rome* & *Hidden Rome PVT* (default €3.00, editable).
- **Net Fee Formula**:  
  $$\text{Net Fee To Be Paid} = (\text{Guide Fee} + \text{Taxi} + \text{Additional Expenses}) - \text{Collected Cash}$$

---

## 🚀 Running the Application

### Development Server (Active)
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
Rome With Mike Portal/
├── src/
│   ├── types/
│   │   ├── index.ts               # Core booking, tour, guide & OTA types
│   │   └── calculator.ts          # Mike Tours calculation formulas & guide roster
│   ├── context/
│   │   └── TourManContext.tsx     # Global reactive state & real-time actions
│   ├── components/
│   │   ├── Navbar.tsx             # Rome With Mike top bar & quick toggles
│   │   ├── LandingPage.tsx        # Public portal showcase & calculator preview
│   │   ├── AppWorkspace.tsx       # Operations suite & sidebar navigation
│   │   ├── NewBookingModal.tsx    # Direct reservation entry
│   │   ├── PWAInstallModal.tsx    # Mobile guide installation guide
│   │   └── views/
│   │       ├── MikeCalculatorView.tsx # Integrated Mike Tours Calculator & Admin View
│   │       ├── DashboardView.tsx      # Real-time KPIs & today's departures
│   │       ├── LiveManifestView.tsx   # 1-Tap mobile manifest & check-in
│   │       ├── BookingsView.tsx       # Centralized bookings pipeline & CSV export
│   │       ├── SchedulerView.tsx      # Smart 1-click guide auto-assignment
│   │       ├── GuidesView.tsx         # Certified guide directory
│   │       ├── FinancialsView.tsx     # 0% commission savings & payout ledger
│   │       ├── AIConciergeView.tsx    # Multi-lingual WhatsApp guest chat
│   │       ├── ChannelsView.tsx       # OTA connectors & email parser debugger
│   │       └── SettingsView.tsx       # Agency settings & forwarding configuration
```
