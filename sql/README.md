# 🗄️ FocusHub SQL Scripts

This folder contains all SQL scripts for setting up and managing the FocusHub Supabase database.

## 🚀 Initial Setup (Run These First)

### Core Tables
1. **SUPABASE_MEMBERSHIP_SETUP.sql** - Creates memberships table
2. **DASHBOARD_SCHEMA.sql** - Creates dashboard tables (daily_history, task_history, distraction_log)
3. **ANALYTICS_SCHEMA.sql** - Creates analytics tables (events, errors, sessions)

### Alternative Table Creation
- **CREATE_MEMBERSHIPS_TABLE.sql** - Alternative memberships table creation
- **FIX_MEMBERSHIPS_TABLE.sql** - Fix memberships table issues
- **CREATE_USER_MEMBERSHIPS_VIEW.sql** - View creation (optional)
- **CREATE_VIEW_SIMPLE.sql** - Simplified view
- **NO_VIEW_NEEDED.sql** - Direct table access approach

## 👤 User Management

### Grant Admin Access
- **GRANT_ADMIN_WATERSJB.sql** - Make watersjb@gmail.com admin
- **ADD_ADMIN_COLUMN.sql** - Add is_admin column to table

### Grant Premium Access
- **GRANT_JOHN_PREMIUM.sql** - Grant premium to John
- **GRANT_JOHN_PREMIUM_SIMPLE.sql** - Simplified premium grant
- **FIX_JOHNS_MEMBERSHIP.sql** - Fix John's membership record (V20.3)

## 🔧 Admin Operations

- **ADMIN_HELPER_FUNCTIONS.sql** - Utility functions for admin tasks
- **ADMIN_SQL_QUERIES.sql** - Common admin queries
- **SIMPLE_ADMIN_COMMANDS.sql** - Quick admin commands
- **MEMBERSHIP_MANAGEMENT_QUERIES.sql** - Manage user memberships

## 📊 Database Schemas

### Tables Created
1. **memberships** - User plans and admin flags
2. **daily_history** - Daily performance tracking
3. **task_history** - Task completion logs
4. **distraction_log** - Distraction tracking
5. **analytics_events** - User interaction events
6. **analytics_errors** - JavaScript error logs
7. **analytics_sessions** - Session tracking

## ⚡ Quick Commands

### Check if user exists
```sql
SELECT * FROM auth.users WHERE email = 'watersjb@gmail.com';
```

### Check membership
```sql
SELECT * FROM memberships WHERE email = 'watersjb@gmail.com';
```

### Make user admin
```sql
UPDATE memberships 
SET plan = 'premium', is_admin = true
WHERE user_id = 'YOUR_USER_ID';
```

### View all memberships
```sql
SELECT * FROM memberships;
```

## 🚨 Troubleshooting

If you get errors:
1. Check if table exists: `SELECT * FROM memberships LIMIT 1;`
2. Check table structure: See **SQL_TROUBLESHOOTING.md** in docs folder
3. Use Table Editor in Supabase dashboard for manual edits

## 📝 Execution Order

For fresh database setup:
1. Create tables (SUPABASE_MEMBERSHIP_SETUP.sql, DASHBOARD_SCHEMA.sql, ANALYTICS_SCHEMA.sql)
2. Grant admin access (GRANT_ADMIN_WATERSJB.sql)
3. Verify with queries

---

**Total Files:** 17 SQL scripts  
**Last Updated:** January 26, 2026  
**Version:** FocusHub V20.3
