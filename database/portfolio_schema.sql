-- ========================================
-- Portfolio Database Schema
-- For managing contact messages and inquiries
-- ========================================

-- Create database (if needed)
-- CREATE DATABASE portfolio_db;

-- Connect to database
-- \c portfolio_db;

-- ========================================
-- TABLES
-- ========================================

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    replied BOOLEAN DEFAULT FALSE,
    replied_at TIMESTAMP
);

-- Visitors/Analytics Table
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_visited VARCHAR(255),
    referer VARCHAR(255),
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Statistics Table
CREATE TABLE IF NOT EXISTS project_stats (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(255) UNIQUE,
    project_name VARCHAR(255),
    github_url VARCHAR(255),
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- INDEXES
-- ========================================

-- Index for faster searches on contact_messages
CREATE INDEX IF NOT EXISTS idx_email ON contact_messages (email);

CREATE INDEX IF NOT EXISTS idx_status ON contact_messages (status);

CREATE INDEX IF NOT EXISTS idx_created_at ON contact_messages (created_at);

-- Index for visitor analytics
CREATE INDEX IF NOT EXISTS idx_visited_at ON visitors (visited_at);

CREATE INDEX IF NOT EXISTS idx_page_visited ON visitors (page_visited);

-- ========================================
-- VIEWS (For pgAdmin Dashboard)
-- ========================================

-- View for unread messages
CREATE OR REPLACE VIEW unread_messages AS
SELECT
    id,
    name,
    email,
    message,
    created_at,
    status
FROM contact_messages
WHERE
    status = 'new'
ORDER BY created_at DESC;

-- View for message statistics
CREATE OR REPLACE VIEW message_statistics AS
SELECT
    COUNT(*) as total_messages,
    COUNT(
        CASE
            WHEN status = 'new' THEN 1
        END
    ) as new_messages,
    COUNT(
        CASE
            WHEN status = 'read' THEN 1
        END
    ) as read_messages,
    COUNT(
        CASE
            WHEN replied = TRUE THEN 1
        END
    ) as replied_messages,
    MAX(created_at) as latest_message_date
FROM contact_messages;

-- View for daily message count
CREATE OR REPLACE VIEW daily_messages AS
SELECT DATE(created_at) as message_date, COUNT(*) as count, COUNT(
        CASE
            WHEN status = 'new' THEN 1
        END
    ) as new_count
FROM contact_messages
GROUP BY
    DATE(created_at)
ORDER BY message_date DESC;

-- ========================================
-- FUNCTIONS & PROCEDURES
-- ========================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- INITIAL DATA (OPTIONAL)
-- ========================================

-- Insert sample project statistics
INSERT INTO
    project_stats (
        project_id,
        project_name,
        github_url
    )
VALUES (
        '1',
        'E-Commerce Dashboard',
        'https://github.com/Caleb-Oyewole/project1'
    ),
    (
        '2',
        'AI Chatbot',
        'https://github.com/Caleb-Oyewole/project2'
    ),
    (
        '3',
        'Data Visualization App',
        'https://github.com/Caleb-Oyewole/project3'
    ),
    (
        '4',
        'Backend API Service',
        'https://github.com/Caleb-Oyewole/project4'
    ),
    (
        '5',
        'Mobile App',
        'https://github.com/Caleb-Oyewole/project5'
    ),
    (
        '6',
        'Design System',
        'https://github.com/Caleb-Oyewole/project6'
    ) ON CONFLICT (project_id) DO NOTHING;

-- ========================================
-- PERMISSIONS (For pgAdmin Users)
-- ========================================

-- Create a read-only user for analytics viewing
-- CREATE USER portfolio_viewer WITH PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE portfolio_db TO portfolio_viewer;
-- GRANT USAGE ON SCHEMA public TO portfolio_viewer;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO portfolio_viewer;
-- GRANT SELECT ON ALL VIEWS IN SCHEMA public TO portfolio_viewer;

-- Create a write user for the application
-- CREATE USER portfolio_app WITH PASSWORD 'app_password';
-- GRANT CONNECT ON DATABASE portfolio_db TO portfolio_app;
-- GRANT USAGE ON SCHEMA public TO portfolio_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO portfolio_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO portfolio_app;

-- ========================================
-- NOTES
-- ========================================
-- 1. Update DATABASE_URL in .env.local with your PostgreSQL connection
-- 2. Run this schema file to initialize the database
-- 3. Configure pgAdmin4 to connect to this database
-- 4. Set up pgAdmin4 alerts for new messages
-- 5. All messages will be stored and visible in pgAdmin4 dashboard