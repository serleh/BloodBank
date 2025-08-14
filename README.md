# BloodBank

> Project Blood Bank is to provide services for the people who are in
> need of blood by getting help from the donors who are interested in donating blood
> for the people.

---

## Project Status

This project is currently under active development.  
Stay tuned for updates and new features.

---

## Goal

To create a full-stack platform where:

- Donors can register and update their information
- Blood seekers can find compatible donors by city and blood group
- Emergency contacts and backup communication options are available when no direct match is found

---

## Technology Used

- **Frontend**: EJS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: Bcrypt

## Planned Features

- [✅ ] Donor registration and login
- [ ✅] Donor profile modification
- [✅ ] Search by blood group & city
- [ ] Emergency contact referral
- [ ] (Planned) SMS/pager-style emergency broadcasting
- [ ] Informational pages (FAQs, donation tips, eligibility)

## How to run the app

1. **Install dependencies**

   npm install

2. **create a .env file**

PORT=3000
DB_STRING=your_database_connection_string_here
SESSION_SECRET=your_secret_key_here

PORT=3000
DB_STRING=your_database_connection_string_here
SESSION_SECRET=your_secret_key_here

3. **Run the app**

npm start
