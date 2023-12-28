# Stitch-Hive

Stitch-Hive is a comprehensive software solution designed to facilitate personalized clothing services, support local tailors, empower boutique businesses, and streamline the fashion industry. This project aims to connect customers seeking personalized clothing with local tailors and boutiques.

## Problem Statement
In an era dominated by ready-made clothing, there's a challenge in enabling personalized clothing seekers to discover local tailors and boutiques. This project addresses this issue by facilitating the discovery of local tailors for city entrants, empowering small boutiques, unemployed tailors, and boosting the local economy through collaborative initiatives in the fashion industry.

## Key Features

### 1. Feedback Management
- Customers can submit feedback, including ratings (1 to 5), comments, and order IDs.
- Data integrity is maintained by linking feedback, orders, and customers through foreign key constraints.

### 2. Customer
- Stores customer details including full name, email, password, address, and contact information.
- Each customer is uniquely identified by a customer ID.

### 3. Boutique
- Profiles include boutique details such as name, email, location, experience levels, and contact details.
- Enforces data accuracy by verifying non-negative experience levels.
- Each boutique is assigned a unique ID.

### 4. Events
- Fundamental part of the system with attributes like title, description, date, time, location, and contact.
- Mandatory fields are enforced to maintain event data integrity.

### 5. Tailor
- Service providers identified by name, email, password, location, experience level, contact, specialization, and offered services.
- Checks for non-negative experience levels.
- Unique tailor IDs facilitate efficient management.

### 6. Order
- Customers can place orders and track them using unique order IDs, order date, status, item description, and image attachments.
- Foreign key constraints link orders to tailors and customers, maintaining order history.

### 7. Admin
- Administrators manage customer, boutique, event, tailor, order, and feedback data.
- Secure access through unique admin emails and passwords.


## Contributing

Contributions are welcome! If you have suggestions, improvements, or find issues, please open an issue or create a pull request.


