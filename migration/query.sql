CREATE USER postgres SUPERUSER;
CREATE DATABASE postgres WITH OWNER postgres;

DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS reservations;



-- Create the Room table
CREATE TABLE IF NOT EXISTS rooms (
  id VARCHAR(255) PRIMARY KEY, -- Use a more appropriate data type for id if needed
  price DECIMAL(10,2) NOT NULL
);

-- Create the Reservation table
CREATE TABLE IF NOT EXISTS reservations (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  room_id VARCHAR(255) NOT NULL,
  checkin_date DATE NOT NULL,
  checkout_date DATE NOT NULL,
  duration_in_days INTEGER,
  price DECIMAL(10,2),
  CONSTRAINT fk_reservation_room FOREIGN KEY (room_id) REFERENCES rooms(id)
);