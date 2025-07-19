# Digorythm - The Everything Store for the World

A cutting-edge luxury tech-wear website featuring 3D interactive models, real-time customization, and immersive animations.

## 🌟 Features

### Design & Aesthetics
- **Dark luxury theme** with black base (#000000), royal blue highlights (#4169E1), and toxic green accents (#39FF14)
- **Modern typography** using Orbitron and Rajdhani fonts
- **Minimalist layout** with dramatic whitespace and clean lines
- **Responsive design** optimized for all devices

### 3D Interactive Elements
- **Hero 3D Model**: Rotating tech-wear jacket with interactive controls
  - 360° rotation toggle
  - Zoom functionality
  - LED feature toggle
- **Customizer Module**: Real-time 3D model updates based on user selections
- **Lab Wireframe**: Animated geometric shapes showcasing design innovation

### Interactive Features
- **Product Grid**: Hover-triggered animations and micro-interactions
- **Real-time Customization**:
  - Base color selection (Black, Royal Blue, Toxic Green)
  - Trim accent options
  - Material choices (Standard, Kevlar Weave, Reflective)
  - Embedded tech options (LED strips, Data tracking)
- **Particle Animation System**: Floating particles with royal blue and toxic green colors
- **Smooth Scrolling Navigation** with section transitions

### Animations & Effects
- **GSAP-powered animations** with ScrollTrigger integration
- **Parallax effects** in the lab section
- **Staggered entrance animations** for text and elements
- **Hover micro-animations** throughout the interface
- **Loading and transition effects** for seamless UX

## 🚀 Technologies Used

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)** - Interactive functionality and animations
- **Three.js** - 3D models and WebGL rendering
- **GSAP** - Advanced animations and scroll triggers
- **Google Fonts** - Orbitron and Rajdhani typography

## 📁 File Structure

```
digorythm-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Media assets directory
│   └── placeholder-videos.txt
└── README.md           # Project documentation
```

## 🎯 Key Sections

### 1. Hero Section
- Full-screen immersive introduction
- 3D rotating jacket model
- Interactive control buttons
- Animated title with staggered text reveal

### 2. Collections
- Product grid with hover animations
- Video previews on hover (when videos are added)
- Click-to-navigate to customizer

### 3. Customizer
- Live 3D model updates
- Color, material, and tech customization
- Real-time price calculation
- Add to cart functionality

### 4. 3D Techwear Lab
- Parallax scrolling effects
- Wireframe 3D animations
- Innovation statistics
- Futuristic design showcase

### 5. About & Contact
- Brand storytelling
- Newsletter subscription with validation
- Social media links
- Footer with tech credits

## 🔧 Setup Instructions

1. **Clone or download** the project files
2. **Open `index.html`** in a modern web browser
3. **For development**: Use a local server (e.g., Live Server in VS Code)
4. **Optional**: Add video files to the `assets/` directory

## 📹 Adding Videos

To enable the product hover videos:

1. Create or source short (3-5 second) demo videos
2. Name them according to the references in HTML:
   - `jacket-demo.mp4`
   - `pants-demo.mp4` 
   - `shoes-demo.mp4`
   - `accessories-demo.mp4`
3. Place them in the `assets/` directory
4. Ensure they're optimized for web (under 5MB each)

## 🎨 Customization

### Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
    --black: #000000;
    --royal-blue: #4169E1;
    --toxic-green: #39FF14;
}
```

### 3D Models
Modify the `createJacketModel()` function in `script.js` to:
- Change model geometry
- Adjust materials and textures
- Add new interactive elements

### Animations
Customize GSAP animations in the `initAnimations()` function:
- Adjust timing and easing
- Add new scroll triggers
- Modify particle behavior

## 🌐 Browser Compatibility

- **Chrome 80+**
- **Firefox 75+**
- **Safari 13+**
- **Edge 80+**

*Note: Requires WebGL support for 3D functionality*

## 📱 Mobile Experience

- Responsive navigation with hamburger menu
- Optimized 3D performance for mobile devices
- Touch-friendly interface elements
- Reduced animation complexity on smaller screens

## 🔮 Future Enhancements

- **Real 3D Models**: Replace geometric shapes with detailed fashion models
- **AR Integration**: Try-on features using WebXR
- **E-commerce Integration**: Complete shopping cart and checkout
- **User Accounts**: Save customizations and preferences
- **Social Sharing**: Share custom designs on social media

## 🎯 Performance Optimization

- **Lazy loading** for videos and images
- **Animation performance** monitoring
- **3D rendering optimization** for various devices
- **Code splitting** for better load times

## 📄 License

This project is created for demonstration purposes. The design and code can be used as a foundation for building similar luxury e-commerce experiences.

---

**Built with passion for the future of digital fashion** ✨
