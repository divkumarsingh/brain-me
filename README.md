# Brain-Me 🧠 

**Brain-Me** is a high-performance "Second Brain" application designed to help users aggregate, organize, and interact with digital content from across the web. Instead of losing track of important YouTube tutorials or insightful Twitter threads, Brain-Me provides a centralized, type-safe dashboard to save and view your digital footprints.

Built as part of a full-stack engineering internship, this project focuses on performance, modern UI/UX patterns, and a robust MERN + TypeScript architecture.

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **State & API** | Axios, React Hooks (useRef, forwardRef, useEffect) |
| **Media Rendering** | React-Player, React-Tweet, Iframe Embeds |

---

## ✨ Key Features

* **Centralized Media Dashboard**: A unified grid view for all saved bookmarks, categorized by content type.
* **Intelligent Media Embedding**: 
    * **YouTube**: Seamless video playback using `react-player` with optimized fallback support for standard `iframes`.
    * **Twitter/X**: Native-style tweet rendering using `react-tweet` with specialized URL parsing logic to extract Tweet IDs.
* **Full-Stack Authentication**: Custom-built Signup/Signin flow with secure credential handling and JWT-based protection.
* **Advanced UI Components**: 
    * **Type-Safe Buttons**: A generic, reusable Button component with variant-based styling (Primary/Secondary).
    * **ForwardRef Inputs**: Implementation of `React.forwardRef` to allow parent components to directly interact with custom input fields.
    * **Portal-Based Modals**: High-z-index modals rendered via React Portals to solve stacking context issues and prevent media overlap.
* **Performance Optimization**: Implementation of **lazy loading** and **aspect-ratio containers** to ensure high-speed rendering of media-heavy content.

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/brain-me.git](https://github.com/your-username/brain-me.git)
cd brain-me
