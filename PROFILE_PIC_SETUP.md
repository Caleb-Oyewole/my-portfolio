# 📸 Quick Setup: Add Your Profile Picture

## Your File Path
```
C:\Users\USER\projects\profile_web\Screenshot_20251111_103436_Canva(1).jpg
```

---

## ⚡ Quick Steps (5 minutes)

### Step 1: Copy Image to Public Folder
```bash
# Navigate to your project
cd C:\Users\USER\projects\profile_web\my-portfolio

# Copy your image to the public folder
# Rename it to something simpler for the web: profile-pic.jpg
```

**OR** using Windows File Explorer:
1. Open File Explorer
2. Navigate to: `C:\Users\USER\projects\profile_web\my-portfolio\public`
3. Copy your `Screenshot_20251111_103436_Canva(1).jpg` there
4. Rename it to: `profile-pic.jpg`

**Final location should be:**
```
C:\Users\USER\projects\profile_web\my-portfolio\public\profile-pic.jpg
```

---

### Step 2: Update Image Reference
Edit `src/app/page.tsx` at line ~92:

**Current:**
```jsx
<img src="/profile.jpg" alt="Caleb Oyewole" className="w-full h-full object-cover" />
```

**Change to:**
```jsx
<img src="/profile-pic.jpg" alt="Caleb Oyewole" className="w-full h-full object-cover" />
```

---

### Step 3: Test it
```bash
npm run dev
# Visit http://localhost:3000
```

Your profile picture should now appear in the circular gradient frame! 🎉

---

## ✨ The Profile Picture Will Automatically

- Display in a **circular frame** with blue gradient border
- Be **responsive** (160×160px on mobile, 192×192px on tablet+)
- Work in **both light and dark modes**
- Have **smooth hover effects**
- Display with **professional styling**

---

## 🎯 That's It!

You're done with the profile picture setup. Move on to enhancing your content and design for a more attractive portfolio.

