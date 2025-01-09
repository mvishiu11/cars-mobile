# Cars - Car Rental Mobile App

Cars is a modern, user-friendly mobile application for browsing, renting, and managing cars, which also allows for interacting in the same way with flats via a partner API. Designed with React Native and Expo, it provides seamless functionality with an intuitive and elegant UI.

---

## Table of Contents

- [Cars - Car Rental Mobile App](#cars---car-rental-mobile-app)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [State Management](#state-management)
    - [Additional Libraries](#additional-libraries)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Steps to Run the Project](#steps-to-run-the-project)
  - [Development Guidelines](#development-guidelines)
  - [License](#license)

---

## Technologies Used

### Frontend
- **React Native**: For cross-platform mobile development.
- **Expo**: To streamline development and deployment.
- **Dripsy**: A responsive design system.
- **React Navigation**: For navigation and routing.
- **react-native-vector-icons**: For beautiful, scalable icons.
- **DateTimePicker**: For selecting pickup and return dates.

### State Management
- **React Context API**: To manage global application state.

### Additional Libraries
- **Toast Messages**: `react-native-toast-message` for real-time user feedback.

---

## Setup and Installation

### Prerequisites
- Node.js (v17 or above)
- Expo CLI (`npm install -g expo-cli`)

### Steps to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/car-rental-app.git
   cd car-rental-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx expo start
   ```

   or 

   ```bash
   npx expo start --lan
   ```

   for LAN access.

4. **Run on your device**:
   - Scan the QR code in the Expo Go app (iOS/Android).
   - Alternatively, run it on an emulator/simulator:
     ```bash
     npx expo start --android
     npx expo start --ios
     ```

## Development Guidelines

1. **Code Style**:
   - Follow ESLint and Prettier guidelines.
   - Maintain consistency in indentation, variable names, and formatting.

2. **Documentation**:
   - All components and functions should have descriptive comments.
   - Use Google-style docstrings where applicable.

3. **Responsive Design**:
   - Use Dripsy for responsive styling.
   - Test layouts on different devices and screen sizes.
   - Ensure that the app is accessible and usable on both iOS and Android.

4. **Error Handling**:
   - Use Toast messages to handle errors and provide feedback to users.

---

## License

This project is licensed under the MIT License.