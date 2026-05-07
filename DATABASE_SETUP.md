# 🗄️ pgAdmin4 Setup Guide for Portfolio Database

## Overview

pgAdmin4 is a powerful, open-source administration and development platform for PostgreSQL. It will be used to manage your portfolio's contact messages database and view all incoming inquiries.

---

## Step 1: Install PostgreSQL & pgAdmin4

### Option A: Local Installation

**Windows:**
1. Download PostgreSQL: https://www.postgresql.org/download/windows/
2. Run installer and remember your password for `postgres` user
3. Download pgAdmin4: https://www.pgadmin.org/download/pgadmin-4-windows/
4. Run the pgAdmin4 installer

**Mac:**
```bash
brew install postgresql@15
brew install pgadmin4
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib pgadmin4
```

### Option B: Docker (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: portfolio_postgres
    environment:
      POSTGRES_USER: portfolio_user
      POSTGRES_PASSWORD: your_secure_password
      POSTGRES_DB: portfolio_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/portfolio_schema.sql:/docker-entrypoint-initdb.d/schema.sql

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: portfolio_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: oyewolecaleb729@gmail.com
      PGADMIN_DEFAULT_PASSWORD: admin_password
    ports:
      - "5050:80"
    depends_on:
      - postgres
    volumes:
      - pgadmin_data:/var/lib/pgadmin

volumes:
  postgres_data:
  pgadmin_data:
```

Run with Docker:
```bash
docker-compose up -d
```

---

## Step 2: Access pgAdmin4

### Local Installation:
- **URL:** http://localhost:5050
- **Email:** oyewolecaleb729@gmail.com
- **Password:** (set during installation)

### Docker:
- **URL:** http://localhost:5050
- **Email:** oyewolecaleb729@gmail.com
- **Password:** admin_password

---

## Step 3: Connect Database in pgAdmin4

1. **Open pgAdmin4** in your browser
2. **Login** with your email and password
3. **Right-click "Servers"** in the left panel
4. **Select "Register" → "Server"**

Fill in:
```
Name: Portfolio Database
Host name: localhost (or your server IP)
Port: 5432
Username: portfolio_user
Password: your_secure_password
Database: portfolio_db
```

5. **Click "Save"**

---

## Step 4: Initialize Database Schema

1. **In pgAdmin4**, navigate to your server
2. **Right-click "Databases"** → **"Create" → "Database"**
3. **Name:** `portfolio_db`
4. **Click "Save"**

5. **Open Query Tool:**
   - Click on `portfolio_db` → **Tools** → **Query Tool**

6. **Paste and execute** the schema from `database/portfolio_schema.sql`:
   ```sql
   -- Copy entire content from portfolio_schema.sql and paste here
   -- Click "Execute"
   ```

---

## Step 5: Configure Environment Variables

Update `.env.local`:

```bash
# PostgreSQL Database Connection
DATABASE_URL=postgresql://portfolio_user:your_secure_password@localhost:5432/portfolio_db

# Optional: For connection pooling
DATABASE_POOL_SIZE=10
DATABASE_IDLE_TIMEOUT=30000

# pgAdmin4 Access (for reference)
PGADMIN_EMAIL=oyewolecaleb729@gmail.com
PGADMIN_URL=http://localhost:5050
```

---

## Step 6: Verify Database Connection

1. **In your portfolio**, fill out the contact form
2. **Submit the form**
3. **Check pgAdmin4:**
   - Expand `portfolio_db` → `Schemas` → `public` → `Tables` → `contact_messages`
   - **Right-click** → **View/Edit Data** → **All Rows**
   - **You should see your message!**

---

## Step 7: Create pgAdmin4 Dashboard & Alerts

### View Unread Messages:

1. **In pgAdmin4**, go to **Tools** → **Query Tool**
2. **Execute:**
```sql
SELECT * FROM unread_messages ORDER BY created_at DESC;
```

### View Message Statistics:

```sql
SELECT * FROM message_statistics;
```

### View Daily Message Count:

```sql
SELECT * FROM daily_messages ORDER BY message_date DESC;
```

---

## Step 8: Setup Email Notifications (Optional)

### Configure Alerts in pgAdmin4:

1. **Click "Alerts"** in left panel
2. **Create New Alert** for contact messages table
3. **When row inserted in `contact_messages`:**
   - Send email notification to `oyewolecaleb729@gmail.com`

---

## Step 9: Update Contact API to Use Database

Your contact API (`src/app/api/contact/route.ts`) now:
- ✅ Validates input
- ✅ Saves to PostgreSQL database
- ✅ Sends Discord/SendGrid notifications
- ✅ Returns success message

**Flow:**
```
User fills form
    ↓
Submit to /api/contact
    ↓
Validate input
    ↓
Save to PostgreSQL (contact_messages table)
    ↓
Send Discord/SendGrid notification
    ↓
Return success response
    ↓
View in pgAdmin4 Dashboard
```

---

## Helpful pgAdmin4 Features

### 1. **Automated Backups**

In pgAdmin4:
- **Right-click Server** → **Backup**
- Set schedule and location
- All messages automatically backed up

### 2. **Query Monitoring**

- **Tools** → **Server Status** → **Sessions**
- Monitor active connections

### 3. **Database Maintenance**

- **Right-click Database** → **Maintenance** → **Vacuum**
- Optimize database performance

### 4. **User Management**

Create different users:
```sql
-- Read-only user
CREATE USER viewer WITH PASSWORD 'password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO viewer;

-- Admin user
CREATE USER admin_user WITH PASSWORD 'password';
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_user;
```

---

## Production Deployment

### Using AWS RDS:

1. **Create RDS PostgreSQL instance:** https://console.aws.amazon.com/rds/
2. **Get connection details**
3. **Update DATABASE_URL** in Vercel environment variables:
```
postgresql://user:password@rds-endpoint:5432/portfolio_db
```

### Using Heroku Postgres:

```bash
heroku addons:create heroku-postgresql:hobby-dev
heroku config:get DATABASE_URL
```

---

## Troubleshooting

### Connection Issues:

```bash
# Test connection
psql -U portfolio_user -d portfolio_db -h localhost -p 5432
```

### Docker Issues:

```bash
# View logs
docker-compose logs postgres

# Restart services
docker-compose restart

# Full reset
docker-compose down -v
docker-compose up -d
```

### pgAdmin4 Not Accessible:

```bash
# Restart pgAdmin container
docker-compose restart pgadmin
```

---

## Security Best Practices

1. **Use strong passwords** for `portfolio_user`
2. **Enable SSL** for database connections:
   ```
   DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
   ```

3. **Restrict access** to pgAdmin4:
   - Use VPN or firewall rules
   - Change default port from 5050

4. **Regular backups**:
   - Set automated daily backups
   - Test restore procedures

5. **Monitor access**:
   - Check Server Status for suspicious queries
   - Review connection logs

---

## API Integration Confirmation

✅ **Database Schema Created**
✅ **Contact Table Ready**
✅ **API Saves Messages**
✅ **pgAdmin4 Dashboard Available**
✅ **Gmail Notifications Ready**

---

## Quick Commands Reference

```bash
# Start database and pgAdmin4
docker-compose up -d

# Stop services
docker-compose down

# View database logs
docker-compose logs postgres

# Access psql CLI
docker-compose exec postgres psql -U portfolio_user -d portfolio_db

# Backup database
docker-compose exec postgres pg_dump -U portfolio_user portfolio_db > backup.sql

# Restore from backup
docker-compose exec -T postgres psql -U portfolio_user portfolio_db < backup.sql
```

---

## 🎉 Setup Complete!

Your portfolio now has:
- ✅ PostgreSQL database running
- ✅ pgAdmin4 dashboard for management
- ✅ Contact messages stored securely
- ✅ Email notifications configured
- ✅ Gmail integration active
- ✅ Full analytics and reporting

**Next: Monitor your messages in pgAdmin4 Dashboard!**

Visit: http://localhost:5050
Email: oyewolecaleb729@gmail.com

