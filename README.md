---

# Bolt Car Rental – Frontend

This is the frontend application for the **Bolt Car Rental** system. It is built using [Angular](https://angular.dev/), [PrimeNG](https://primeng.org/), and [Tailwind CSS](https://tailwindcss.com/). It communicates with a backend (NestJS + PostGre) to show car availability and manage bookings.

---

## Prerequisites
Node.js (v20.19.3 or newer)

---

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Environment configuration

Edit environment files in `src/environments/` as needed for your backend API URLs and other settings.

### 3. Run the development server

```sh
npm run start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### 4. Build for production

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

---

## Scripts

- `npm run start` – Start the development server
- `npm run build` – Build for production
- `npm run test` – Run unit tests with Karma
---

## Technologies Used

- [Angular 20+](https://angular.dev/)
- [PrimeNG](https://primeng.org/) (UI components)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [RxJS](https://rxjs.dev/) (reactive programming)
- [Lodash](https://lodash.com/) (utility functions)
- [ngx-cookie-service](https://www.npmjs.com/package/ngx-cookie-service) (cookie management)
- [Karma](https://karma-runner.github.io/) & [Jasmine](https://jasmine.github.io/) (testing)

---

## Project Structure

- `src/app/features/` – Feature modules (authentication, car rental, dashboard, etc.)
- `src/app/shares/` – Shared modules (APIs, models, services, constants, etc.)
- `src/environments/` – Environment configuration files
- `src/styles.scss` – Global styles (includes Tailwind)

---

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [PrimeNG Documentation](https://primeng.org/setup)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)

---

Let me know if you want this as a new `README.md` or if you want to further customize any section!
