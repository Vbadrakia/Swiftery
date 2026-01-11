# Swiftery (Courier Web App)

Short recruiter-friendly summary of the project.

## Snapshot
- Full-stack courier web app: users sign up, place orders, and track deliveries.
- Stack: HTML/CSS/JS frontend, Node/Express backend, MongoDB via Mongoose.
- Status: Active; deployed via local run instructions below.

## Core Features
- Auth: sign up/login, last-login tracking.
- Orders: create, view history, status updates, tracking number.
- Locations: list/search service areas with contact info.
- Tracking: real-time status fetch and display.
- UI: responsive pages for home, login/signup, place order, track order, locations, contact.

## API (quick view)
- POST /api/users/register — create user.
- POST /api/users/login — authenticate.
- POST /api/orders/create — new order.
- GET /api/orders/:id — order details.
- PUT /api/orders/:id/status — update status.
- GET /api/locations — list locations.

## Run Locally
1) Backend
```
cd Backend
npm install
npm start
# expects MONGODB_URI in .env
```
2) Frontend
```
cd Frontend/HomePage
npm install
npm start
# or open index.html with any static server
```

## Structure (brief)
- Backend/app.js — Express server + routes.
- Backend/src/config/database.config.js — Mongo connection.
- Backend/src/models/*.js — user, order, location schemas.
- Frontend/* — HTML/CSS/JS pages (Home, Login, SignUp, PlaceOrder, TrackOrder, Location, Contact), images, and local dev server.

## Why it matters
- Demonstrates end-to-end delivery flow: auth → order → tracking.
- Clean separation: presentation, API, and data layers.
- Ready for quick demo or extension (payments, notifications, role-based access).

## 📝 Usage Example

### Creating an Order

1. User logs in at `/Frontend/Login/index.html`
2. Navigates to `/Frontend/PlaceOrder/place-order.html`
3. Fills out order form with pickup/delivery locations
4. Frontend sends POST request to `/api/orders/create`
5. Backend creates order in MongoDB
6. User gets confirmation with tracking number
7. User can track order at `/Frontend/TrackOrder/track-order.html`

---

## 📚 Additional Documentation

- See [PROJECT_MAP.md](PROJECT_MAP.md) for detailed architecture breakdown
- See [TRACK_ORDER_IMPROVEMENTS.md](TRACK_ORDER_IMPROVEMENTS.md) for enhancement features

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 👥 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Contact

For support, questions, or feedback, please:
- Create an issue on GitHub
- Contact through the website's contact page
- Email: support@swiftery.com

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Built as a full-stack web development project
- Designed for delivery service management
- Incorporates best practices in web development

---

**Last Updated**: January 2026  
**Project Status**: Active Development  
**Version**: 1.0.0
