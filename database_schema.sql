-- 사용자 테이블
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(100) NOT NULL,
  profile_image VARCHAR(500),
  provider ENUM('local', 'google', 'kakao', 'naver') DEFAULT 'local',
  provider_id VARCHAR(255),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 분석 기록 테이블
CREATE TABLE analysis_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_url VARCHAR(1000) NOT NULL,
  product_name VARCHAR(500),
  product_brand VARCHAR(200),
  product_price VARCHAR(100),
  product_image VARCHAR(500),
  analysis_result JSON NOT NULL,
  is_bookmarked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_created (user_id, created_at),
  INDEX idx_bookmarked (user_id, is_bookmarked)
);

-- 위시리스트 테이블
CREATE TABLE wishlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  analysis_id INT NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (analysis_id) REFERENCES analysis_history(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_analysis (user_id, analysis_id)
);

-- 사용자 설정 테이블
CREATE TABLE user_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  analysis_alerts BOOLEAN DEFAULT FALSE,
  theme ENUM('light', 'dark', 'auto') DEFAULT 'auto',
  language VARCHAR(10) DEFAULT 'ko',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 분석 공유 테이블
CREATE TABLE shared_analysis (
  id INT PRIMARY KEY AUTO_INCREMENT,
  analysis_id INT NOT NULL,
  share_token VARCHAR(100) UNIQUE NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (analysis_id) REFERENCES analysis_history(id) ON DELETE CASCADE,
  INDEX idx_share_token (share_token),
  INDEX idx_public (is_public)
);

-- 사용량 통계 테이블
CREATE TABLE usage_stats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  analysis_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_date (user_id, date)
); 