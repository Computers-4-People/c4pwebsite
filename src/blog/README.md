# Blog System - How to Add Articles

This folder contains the blog system for Computers 4 People and Shield Internet.

## File Structure

```
src/blog/
├── articlesData.js      # Main file where all articles are stored
├── BlogArticle.jsx      # Template for displaying individual articles
└── README.md           # This file
```

## How to Add a New Article

### Step 1: Open `articlesData.js`

This file contains an array of all blog articles. Each article is an object with specific properties.

### Step 2: Add Your Article to the Array

Add a new article object to the `articles` array. Here's the template:

```javascript
{
  id: 'unique-article-id',
  slug: 'url-friendly-slug',
  title: 'Your Article Title Here',
  metaDescription: 'SEO meta description (150-160 characters)',
  excerpt: 'Brief summary shown on the blog listing page (1-2 sentences)',
  author: 'Author Name',
  date: 'YYYY-MM-DD',
  readTime: 'X min read',
  category: 'Category Name',
  tags: ['tag1', 'tag2', 'tag3'],
  image: '/blog/your-image.jpg',
  content: `
Your full article content goes here...

## Use Markdown-Style Formatting

### Subheadings Work Too

Regular paragraphs are automatically styled.

**Bold text** is created with double asterisks.

You can add [links like this](/path-to-page).

Each paragraph should be separated by a blank line.

## Another Section

More content here...
  `
}
```

### Step 3: Article Properties Explained

- **id**: Unique identifier (use slug as ID)
- **slug**: URL-friendly version of title (e.g., "how-to-improve-internet")
- **title**: Full article title
- **metaDescription**: SEO description (appears in Google search results)
- **excerpt**: Short summary for blog listing page
- **author**: Author name (usually "Computers 4 People Team")
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Estimated reading time (e.g., "5 min read")
- **category**: Article category (e.g., "Data Security", "Internet Tips", "Digital Equity")
- **tags**: Array of relevant keywords for SEO
- **image**: Path to featured image (optional, defaults to placeholder)
- **content**: Full article text (supports basic markdown formatting)

### Step 4: Content Formatting

The content field supports basic markdown:

- **Headings**: Use `##` for main sections, `###` for subsections
- **Bold text**: Wrap text in `**double asterisks**`
- **Links**: Use `[link text](/url)` format
- **Paragraphs**: Separate paragraphs with blank lines

Example:
```
## This is a Section Heading

This is a paragraph with some **bold text** and a [link to Shield](/shield).

This is another paragraph.

### This is a Subsection

More content here...
```

### Step 5: Add Featured Image (Optional)

1. Add your image to `/public/blog/`
2. Reference it in the article: `image: '/blog/your-image.jpg'`
3. Recommended size: 1200x630px (good for SEO and social sharing)

### Step 6: Test Your Article

1. Save `articlesData.js`
2. Visit `/blog` to see your article in the listing
3. Click on it to view the full article at `/blog/your-slug`

## SEO Best Practices

### For Better Search Rankings:

1. **Use descriptive titles** with keywords (60-70 characters max)
2. **Write compelling meta descriptions** (150-160 characters)
3. **Use relevant keywords** in title, headings, and first paragraph
4. **Add internal links** to other pages on the site
5. **Choose specific tags** related to your content
6. **Use clear section headings** (helps Google understand structure)

### Good Article Topics for SEO:

**For Computers 4 People:**
- "How to Donate Your Old Computer Safely"
- "Why Data Erasure Matters When Donating Electronics"
- "Windows 11 Requirements: Can Your Old PC Upgrade?"
- "How to Prepare Your Computer for Donation"
- "Digital Divide Statistics 2025"

**For Shield Internet:**
- "Mobile Hotspot vs Home Internet: Which is Right for You?"
- "How to Improve Your Mobile Hotspot Speed"
- "5G Home Internet Explained: Complete Guide"
- "Affordable Internet Options for Low-Income Families"
- "How Much Data Do You Really Need?"

## Example Article

See `articlesData.js` for a complete example article about data erasure.

## Questions?

Contact the development team for help adding articles or if you encounter any issues.
