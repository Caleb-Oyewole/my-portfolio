# Profile Picture Setup Guide

## 📸 How to Add Your Profile Picture

### Step 1: Prepare Your Image
1. Take a professional headshot or select a profile photo
2. Recommended size: **400x400px** or larger (square aspect ratio)
3. Supported formats: JPG, PNG, WebP
4. File size: Keep under 500KB for better performance

### Step 2: Add Image to Your Project
1. Save your image as `profile.jpg` (or `.png`)
2. Place it in the `public/` folder:
   ```
   my-portfolio/
   └── public/
       └── profile.jpg  ← Your image here
   ```

### Step 3: Update the Code
Edit `src/app/page.tsx` and find the profile picture section (around line 37):

**Replace this:**
```jsx
{/* TODO: Replace with your actual profile picture */}
<svg className="w-24 h-24 md:w-32 md:h-32 text-slate-400 dark:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
</svg>
```

**With this:**
```jsx
<img src="/profile.jpg" alt="Caleb Oyewole" className="w-full h-full object-cover" />
```

### Step 4: Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🎨 Profile Picture Styling

The profile image is automatically styled with:
- ✅ Circular frame with gradient border (blue)
- ✅ Responsive sizing (grows on larger screens)
- ✅ Dark mode support
- ✅ Smooth hover effects

### Optional: Custom Styling
If you want to adjust the profile picture styling, edit `src/app/page.tsx` line 26-40:

```jsx
<div className="relative w-40 h-40 md:w-48 md:h-48">
  {/* Outer gradient circle (change colors here) */}
  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 p-1">
    {/* Results size adjust here: w-40 h-40 md:w-48 md:h-48 */}
```

---

## 🖼️ Recommended Image Services

If you don't have a professional photo yet:
- **Canva** - Free design & photo editing
- **Unsplash** - Free stock photos
- **Pixabay** - Free related photos
- **Professional Photos** - Hire a photographer

---

## 📝 Current Status

- ✅ Profile picture frame created
- ✅ Placeholder SVG ready
- ⏳ **TODO:** Add your actual `profile.jpg` to the `public/` folder
- ⏳ **TODO:** Update image src in page.tsx from SVG to `<img>`

---

## 💡 Pro Tips

1. **Use square images** - Crop your photo to 1:1 ratio
2. **High quality** - Use high-resolution photos (1000x1000px or larger)
3. **Professional look** - Neutral background, good lighting
4. **Test both themes** - Check appearance in light and dark modes
5. **Mobile friendly** - The image is responsive and works on all devices

---

## 🔗 Quick Links to Edit

- **Image source:** `src/app/page.tsx` (line ~37)
- **Image file location:** `public/profile.jpg`
- **Styling:** Responsive (mobile: 160x160, tablet+: 192x192)
- **Frame colors:** Gradient blue (customizable)

---

That's it! Your profile picture will appear in a beautiful circular frame with gradient border. 🎓
