
# Student Internship Tracker

The Student Internship Tracker simplifies the internship monitoring process by centralizing student submissions and mentor verification. It replaces manual, paper-based tracking with a digital system that improves transparency, accountability, and ease of reporting.




## ✨ Features
* **Task Submission & Verification**: Students upload documentation, while mentors verify submissions and provide structured feedback.

* **Role-based Dashboard**: Custom dashboards for students, mentors, and showing progress, pending tasks, and evaluations.

* **Document Uploads**:  Upload supplementary files such as         documentation, reports, and images.

* **Notifications**: Alerts for deadlines, submission status changes, mentor feedback, and review requests.

* **Secure Authentication**: Login system with role-based access control (students and mentors).

* **User Management** : Profile management for all user roles.



## 🚀Tech Stack

* **Frontend**: Next.js 14 with App Router,React 18, & TypeScript
* **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
* **Styling**: Tailwind CSS with shadcn/ui components
* **Authentication**: Supabase Auth
* **Deployment**: Vercel
## 📋Prerequisites

Before you begin, ensure you have:

* Node.js v22+ installed
* A Supabase account and project
* Git installed on your machine
## 🛠️ Installation

1. **Clone the repository**
``` 
git clone https://github.com/CSci-153-Web-Systems-and-Technologies/batch-2025-student-internship-tracker-web.git
cd batch-2025-student-internship-tracker-web
```
2. **Install Dependencies**
``` 
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup Create a .env.local file in the root directory with the following variables**:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Create the following tables in your Supabase database:

**Profile Table**
```
create table public.profiles (
  id uuid not null,
  full_name text null,
  email text null,
  role text null,
  created_at timestamp without time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_email_key unique (email),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint profiles_role_check check (
    (
      role = any (array['student'::text, 'mentor'::text])
    )
  )
) TABLESPACE pg_default;
```
**Organizations Table**

```
create table public.organizations (
  id uuid not null default gen_random_uuid (),
  name text not null,
  invite_code text not null,
  created_by uuid not null,
  created_at timestamp with time zone not null default now(),
  description text null,
  constraint organizations_pkey primary key (id),
  constraint organizations_invite_code_key unique (invite_code),
  constraint organizations_created_by_fkey foreign KEY (created_by) references auth.users (id)
) TABLESPACE pg_default;
```

**Organization Members Table**

```
create table public.organization_members (
  id uuid not null default gen_random_uuid (),
  org_id uuid not null,
  user_id uuid not null,
  role text not null default 'member'::text,
  joined_at timestamp with time zone null default now(),
  name text not null default ''::text,
  constraint organization_members_pkey primary key (id),
  constraint organization_members_org_id_user_id_key unique (org_id, user_id),
  constraint organization_members_org_id_fkey foreign KEY (org_id) references organizations (id) on delete CASCADE,
  constraint organization_members_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;
```

**Projects Table**
```
create table public.projects (
  id uuid not null default gen_random_uuid (),
  org_id uuid not null,
  name text not null,
  description text null,
  created_by uuid not null,
  created_at timestamp with time zone null default now(),
  constraint projects_pkey primary key (id),
  constraint projects_created_by_fkey foreign KEY (created_by) references profiles (id) on delete set null,
  constraint projects_org_id_fkey foreign KEY (org_id) references organizations (id) on delete CASCADE
) TABLESPACE pg_default;
```

**Task Table**
```
create table public.task (
  id uuid not null default gen_random_uuid (),
  org_id uuid not null,
  title text not null,
  description text not null,
  type public.task_type not null,
  priority public.task_priority not null,
  status public.task_status not null,
  created_by uuid not null default auth.uid (),
  created_at timestamp without time zone not null default now(),
  updated_at timestamp without time zone not null default now(),
  due_date date not null,
  project_id uuid not null,
  file_submissions text[] null,
  assigned_to uuid[] null default '{}'::uuid[],
  mentor_review text null,
  constraint task_new_pkey primary key (id),
  constraint task_new_created_by_fkey foreign KEY (created_by) references profiles (id) on update CASCADE on delete CASCADE,
  constraint task_new_org_id_fkey foreign KEY (org_id) references organizations (id) on update CASCADE on delete CASCADE,
  constraint task_new_project_id_fkey foreign KEY (project_id) references projects (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create trigger update_task_updated_at BEFORE
update on task for EACH row
execute FUNCTION set_updated_at ();
```

**Notification Table**
``` 
create table public.notifications (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  origin text not null,
  type text not null,
  title text null,
  message text not null,
  is_read boolean null default false,
  created_at timestamp with time zone null default now(),
  org_id uuid null,
  constraint notifications_pkey primary key (id),
  constraint notifications_org_id_fkey foreign KEY (org_id) references organizations (id) on delete CASCADE,
  constraint notifications_user_id_fkey foreign KEY (user_id) references organization_members (id)
) TABLESPACE pg_default;
```

**Functions**

*handle_new_user*
```
begin
  insert into public.profiles (id, email, role, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'role',
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
```
*set_updated_at*
```
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;

```
**Enums**
* task_type:	bug, documentation, feature, refactor
* task_priority:	low, medium, high
* project_status:	active, completed, archived
* task_status:	todo, in_progress, completed, verifying, cancelled, revise
* role:	student, mentor

5. **Setup Bucket for file Submission**

```
insert into storage.buckets (id, name, public, updated_at)
values ('student_submissions', 'student_submissions', true, now());
```

6. **Enable RLS Security**

``` 

-- profile
CREATE POLICY "Users can view their own profile"
ON "public"."profiles"
FOR SELECT
TO public
USING (
  auth.uid() = id

-- bucket
CREATE POLICY "Access submissions if user in task org"
ON "student_submissions"
FOR SELECT
USING (
    (bucket_id = 'student_submissions')
    AND ((metadata ->> 'task_id') IS NOT NULL)
    AND EXISTS (
        SELECT 1
        FROM task t
        JOIN organization_members om ON om.org_id = t.org_id
        WHERE t.id = ((metadata ->> 'task_id')::uuid)
          AND om.user_id = auth.uid()
    )
);

CREATE POLICY "Mentor access to submissions"
ON "student_submissions"
FOR SELECT
USING (
    (bucket_id = 'student_submissions')
    AND EXISTS (
        SELECT 1
        FROM organization_members om
        WHERE om.user_id = auth.uid()
          AND om.role = 'mentor'
          AND om.org_id = ((metadata ->> 'organization_id')::uuid)
    )
);

CREATE POLICY "Access submissions if assigned to task"
ON "student_submissions"
FOR SELECT
USING (
    (bucket_id = 'student_submissions')
    AND ((metadata ->> 'task_id') IS NOT NULL)
    AND EXISTS (
        SELECT 1
        FROM task t
        JOIN organization_members om ON om.id = ANY(t.assigned_to)
        WHERE t.id = ((metadata ->> 'task_id')::uuid)
          AND om.user_id = auth.uid()
    )
);


-- storage.object
create policy "Enable insert for authenticated users only"
    on "storage"."objects"
    for insert to authenticated
    with check (true);

CREATE POLICY "Enable delete for authenticated users only"
    ON "storage"."objects"
    FOR DELETE
    TO authenticated
    USING (true);

```





## 🏃‍♂️ Running the Application

1. **Start the development server**
```
npm run dev
# or
yarn dev
# or
pnpm dev
```
## 📖 Usage

**For Mentors**:

* **Creating Account**: Sign up using email/password and verify via email.
* **Creating Organization**: Input Organization Name and Description
* **Joining Organization**: Input Organization's Invite Code.
* **Inviting Students**: Click the Invite button on Sidebar and share the Invite Code
* **Creating Projects**: Input Project Name and Description (optional)
* **Creating Tasks**: Select Project, Input (Title and Description), Select Type, Priority, Student to assign to, Due Date
* **Reviewing Task**s: Click on the Tasks on each Project to view submisssions
* **View Notification**: Check Notifications for any new Submissions from student

**For Student**
* **Creating Account**: Sign up using email/password and verify via email.
* **Joining Organization**: Input Organization's Invite Code.
* **Viewing Tasks**: Check Notification for any assignment or Go to Task Page to view Tasks


## 📁 Project Structure

``` bash
batch-2025-student-internship-tracker-web/
├── app/                          
│   ├── (auth)/                   
│   ├────────────(authenticated)/       
│   └── layout.tsx       ├── organization      
├── components/          ├──────────────── dashboard        
│   ├── ui/              ├── layout.tsx         ├── notification
│   └── ...                                     ├── projects
├── lib/                                                ├── tasks
├── types/                       
├── utils/                       
└── public/                      
```
## Environment Variables
---------------------------------------------------------------------------------
| Variables                     | Descriptions                        | Required|
|-------------------------------|-------------------------------------|---------|
|NEXT_PUBLIC_SUPABASE_URL       |  Your Supabase project URL          |  Yes    |
|NEXT_PUBLIC_SUPABASE_ANON_KEY  |  Your Supabase anonymous key        |  Yes    |
|NEXT_PUBLIC_BASE_URL           | Base URL for QR code generation     |  Yes    |

## 🚀 Deployment
 **Deploy to Vercel**

     1. Push your code to GitHub
     2. Connect your repository to Vercel
     3. Add environment variables in Vercel dashboard
     4. Deploy!
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch: git checkout -b feature-name
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin feature-name
5. Submit a pull request
## 🙏 Acknowledgments
* Next.js for the React framework
* Supabase for the backend infrastructure
* shadcn/ui for the UI components
* Tailwind CSS for styling