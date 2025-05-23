# How to Add a New Project

## Step 1: Prepare Images
1. Create a folder: `public/images/Your-Project-Name/`
2. Add these images:
   - Main thumbnail: `thumbnail.png` or `thumbnail.jpg`
   - Additional screenshots (optional): `screenshot1.png`, `screenshot2.png`, etc.

## Step 2: Add Project to JSON
Edit `public/data/projects.json` and add your project to the "projects" array:

```json
{
  "id": 8,
  "title": "Your Amazing Project Title",
  "description": "A brief description of what your project does (1-2 sentences for the card view)",
  "image": "/images/Your-Project-Name/thumbnail.png",
  "tags": ["Python", "Machine Learning", "React", "API"],
  "category": "machine-learning", // Choose: machine-learning, deep-learning, nlp, data-visualization, gen-ai
  "github": "https://github.com/yourusername/your-repo",
  "demo": "https://your-demo-link.com", // or null if no demo
  "linkedinPost": "https://linkedin.com/posts/your-post", // or null
  "youtubeVideo": "https://youtube.com/embed/your-video", // or null
  "fullDescription": "Detailed description with technical details, methodology, results, and impact. Use \\n for line breaks.",
  "additionalImages": [
    { "url": "/images/Your-Project-Name/screenshot1.png", "description": "What this screenshot shows" },
    { "url": "/images/Your-Project-Name/screenshot2.png", "description": "Another feature or result" }
  ]
}
```

## Step 3: Deploy
```bash
npm run deploy
```

## Available Categories:
- `machine-learning`
- `deep-learning` 
- `nlp`
- `data-visualization`
- `gen-ai`

## Image Naming Convention:
- Use descriptive names
- No spaces (use hyphens or underscores)
- Common formats: .png, .jpg, .jpeg
- Recommended size: 800x600px for main images 