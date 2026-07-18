# Career/Job Posting System - Complete Implementation Guide

## 🎯 Overview
A complete job and internship posting system with admin management and public-facing careers page.

---

## 📋 Features

### Admin Features:
- ✅ Create, edit, and delete job/internship postings
- ✅ Toggle posting status (Active/Closed/Draft)
- ✅ Filter by type (Jobs/Internships)
- ✅ Search postings by title
- ✅ Rich posting details (requirements, responsibilities, salary, deadline)
- ✅ Real-time status updates

### Public Features:
- ✅ View all active job and internship postings
- ✅ Filter by type (All/Jobs/Internships)
- ✅ Detailed view modal for each posting
- ✅ Direct email application with pre-filled subject
- ✅ Application deadline display
- ✅ Responsive design matching site aesthetic

---

## 🗄️ Database Setup

### Step 1: Run SQL Schema
Execute the SQL file in your Supabase SQL Editor:
```
supabase-careers-schema.sql
```

This creates:
- `careers` table with all necessary fields
- Row Level Security (RLS) policies
- Indexes for performance
- Sample data (2 example postings)

### Table Structure:
```sql
careers (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT (job/internship),
    location TEXT NOT NULL,
    employment_type TEXT (full-time/part-time/contract/internship),
    experience_level TEXT (entry/mid/senior/not-applicable),
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    salary_range TEXT,
    application_deadline TIMESTAMP,
    status TEXT (active/closed/draft),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

---

## 📁 Files Created

### Admin Pages:
1. **`src/pages/admin/Careers.tsx`** - List view of all postings
   - Search and filter functionality
   - Status toggle (Active/Closed)
   - Edit and delete actions
   - Type-based filtering

2. **`src/pages/admin/EditCareer.tsx`** - Create/Edit posting form
   - Comprehensive form fields
   - Validation
   - Date picker for deadline
   - Rich text areas for requirements/responsibilities

### Public Pages:
3. **`src/pages/Careers.tsx`** - Public careers page
   - Grid layout of active postings
   - Filter tabs (All/Jobs/Internships)
   - Detail modal with full posting info
   - Email application button
   - CTA section for general applications

### Configuration:
4. **`src/components/admin/AdminLayout.tsx`** - Updated with Careers nav item
5. **`src/App.tsx`** - Added all career routes
6. **`supabase-careers-schema.sql`** - Database schema

---

## 🚀 Routes

### Public Routes:
- `/careers` - Public careers page (view all active postings)

### Admin Routes:
- `/admin/careers` - List all postings
- `/admin/careers/new` - Create new posting
- `/admin/careers/:id` - Edit existing posting

---

## 💼 Usage Guide

### For Admins:

#### Creating a New Posting:
1. Go to Admin → Careers
2. Click "New Posting"
3. Fill in the form:
   - **Required**: Title, Type, Location, Employment Type, Description, Status
   - **Optional**: Experience Level, Salary Range, Deadline, Requirements, Responsibilities
4. Click "Save Posting"

#### Managing Postings:
- **Edit**: Click edit icon on any posting
- **Delete**: Click delete icon (with confirmation)
- **Toggle Status**: Click the status badge to switch between Active/Closed
- **Search**: Use search bar to find by title
- **Filter**: Use type dropdown to filter Jobs/Internships

#### Status Types:
- **Active**: Visible on public careers page
- **Closed**: Not visible, but kept in database
- **Draft**: Not visible, for work-in-progress postings

### For Public Users:

#### Viewing Postings:
1. Visit `/careers`
2. Use filter tabs to view All/Jobs/Internships
3. Click "View Details" on any posting
4. Modal opens with full details

#### Applying:
1. In the detail modal, click "Apply Now"
2. Email client opens with pre-filled:
   - To: contact@vakalt.com
   - Subject: Application for [Position Title]
   - Body: Template application message
3. User completes and sends email

---

## 🎨 Design Features

### Admin Interface:
- Modern SaaS table design
- Type-based color coding (Blue for Jobs, Purple for Internships)
- Hover actions (ghost buttons)
- Status badges with color indicators
- Smooth transitions and animations

### Public Interface:
- Card-based grid layout
- Filter tabs with smooth transitions
- Full-screen modal for details
- Icon-based information display
- Responsive design (mobile-friendly)
- Matches site's black/white/serif aesthetic

---

## 📧 Email Integration

### Application Flow:
When a user clicks "Apply Now":
```
mailto:contact@vakalt.com
?subject=Application for [Position Title]
&body=Dear Hiring Team,%0D%0A%0D%0AI am writing to express my interest in the [Position Title] position.%0D%0A%0D%0A
```

### General Applications:
CTA section at bottom of careers page:
```
mailto:contact@vakalt.com
?subject=General Application
```

---

## 🔒 Security

### Row Level Security (RLS):
- **Public**: Can only view postings with `status = 'active'`
- **Authenticated (Admins)**: Full CRUD access to all postings

### Policies:
```sql
-- Public can view active careers
CREATE POLICY "Public can view active careers"
ON careers FOR SELECT
USING (status = 'active');

-- Authenticated users can manage careers
CREATE POLICY "Authenticated users can manage careers"
ON careers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

---

## 📊 Sample Data

The schema includes 2 sample postings:

1. **Associate Lawyer** (Job)
   - Full-time position
   - Mid-level experience
   - Delhi, India
   - Active status

2. **Legal Intern** (Internship)
   - Internship position
   - Entry-level
   - Delhi, India
   - Active status

---

## 🎯 Field Formatting Tips

### Requirements & Responsibilities:
Use bullet points for better formatting:
```
• LLB/LLM from a recognized university
• 3-5 years of litigation experience
• Strong research and drafting skills
• Excellent communication abilities
```

The public page will display these with proper line breaks and formatting.

### Salary Range Examples:
- `₹5-7 LPA`
- `₹40,000 - ₹60,000 per month`
- `Competitive`
- `As per industry standards`

---

## 🔄 Workflow

### Admin Workflow:
```
Create Posting → Set as Draft → Review → Set as Active → Monitor Applications → Close when filled
```

### User Workflow:
```
Browse Careers → Filter by Type → View Details → Apply via Email
```

---

## 📱 Responsive Design

### Breakpoints:
- **Mobile**: Single column, stacked filters
- **Tablet**: 2-column grid
- **Desktop**: 2-column grid, sticky sidebar in detail modal

### Mobile Optimizations:
- Touch-friendly buttons
- Readable font sizes
- Proper spacing
- Scrollable modals

---

## 🎨 Color Coding

### Job Postings:
- Icon background: Blue (`bg-blue-50`)
- Icon color: Blue (`text-blue-600`)
- Badge: Blue (`bg-blue-50 text-blue-700`)

### Internship Postings:
- Icon background: Purple (`bg-purple-50`)
- Icon color: Purple (`text-purple-600`)
- Badge: Purple (`bg-purple-50 text-purple-700`)

### Status Colors:
- **Active**: Green (`text-green-600 bg-green-50`)
- **Closed**: Gray (`text-gray-600 bg-gray-50`)
- **Draft**: Yellow (`text-yellow-600 bg-yellow-50`)

---

## 🚀 Next Steps (Optional Enhancements)

1. **Application Tracking**: 
   - Create `applications` table
   - Track who applied and when
   - Admin dashboard for applications

2. **Advanced Filtering**:
   - Filter by location
   - Filter by experience level
   - Filter by employment type

3. **Email Notifications**:
   - Auto-notify admin when someone applies
   - Send confirmation to applicant

4. **Analytics**:
   - Track views per posting
   - Track application rate
   - Popular positions dashboard

5. **Social Sharing**:
   - Share posting on LinkedIn
   - Share on Twitter
   - Copy link functionality

6. **Application Form**:
   - In-app application form
   - File upload for resume
   - Store applications in database

---

## 🐛 Troubleshooting

### Postings not showing on public page:
- Check posting status is "active"
- Verify RLS policies are enabled
- Check browser console for errors

### Can't create/edit postings:
- Ensure you're logged in as admin
- Check Supabase authentication
- Verify database permissions

### Email not opening:
- Check browser's default email client
- Try different browser
- Verify mailto: links are not blocked

---

## ✅ Testing Checklist

### Admin Testing:
- [ ] Create new job posting
- [ ] Create new internship posting
- [ ] Edit existing posting
- [ ] Delete posting (with confirmation)
- [ ] Toggle status (Active ↔ Closed)
- [ ] Search functionality
- [ ] Filter by type
- [ ] All fields save correctly
- [ ] Date picker works
- [ ] Validation works (required fields)

### Public Testing:
- [ ] View careers page
- [ ] See only active postings
- [ ] Filter by All/Jobs/Internships
- [ ] Open detail modal
- [ ] View all posting details
- [ ] Click "Apply Now" (email opens)
- [ ] Click "Send Resume" (general application)
- [ ] Responsive on mobile
- [ ] Responsive on tablet

---

## 📝 Notes

- All postings are stored in Supabase
- Only active postings appear on public page
- Admins can see all postings regardless of status
- Email applications go to `contact@vakalt.com`
- Deadline is optional but recommended
- Requirements and responsibilities support multi-line text

---

**Implementation Date:** February 6, 2026  
**Status:** ✅ Complete and Production-Ready  
**Database:** Supabase (PostgreSQL)  
**Authentication:** Supabase Auth
