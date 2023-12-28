const express = require("express");
const cors = require("cors");
const pool = require("./database");
const multer = require("multer"); // line for handling file uploads
const path = require("path"); //  line to work with file paths


const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.post("/register/boutique-owner", async (req, res) => {
    try {
      const {
        b_fullname,
        b_email,
        b_password,
        b_boutique_name,
        b_location,
        b_experience,
        b_contact,
      } = req.body;
  
    
      const query = `
        INSERT INTO boutique (b_fullname, b_email, b_password, b_boutique_name, b_location, b_experience, b_contact)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
  
      await pool.query(query, [
        b_fullname,
        b_email,
        b_password,
        b_boutique_name,
        b_location,
        b_experience,
        b_contact,
      ]);
  
      res.status(201).json({ message: 'Boutique Owner Registration successful' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Boutique Owner Registration failed' });
    }
  });

  app.post('/login/boutique-owner', async (req, res) => {
    try {
      const { b_email, b_password } = req.body;
  
      // Query your database to check if the email and password match
      const result = await pool.query('SELECT * FROM Boutique WHERE b_email = $1 AND b_password = $2', [b_email, b_password]);
  
      if (result.rows.length === 1) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  //customer registeration
  app.post("/register/customer", async (req, res) => {
    try {
      const {
        c_fullname,
        c_email,
        c_password,
        c_address,
        c_contact,
      } = req.body;
  
      const query = `
        INSERT INTO customer (c_fullname, c_email, c_password, c_address, c_contact)
        VALUES ($1, $2, $3, $4, $5)
      `;
  
      await pool.query(query, [
        c_fullname,
        c_email,
        c_password,
        c_address,
        c_contact,
      ]);
  
      res.status(201).json({ message: 'Customer Registration successful' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Customer Registration failed' });
    }
  });
  
  // Customer Login (if needed)
  app.post('/login/customer', async (req, res) => {
    try {
      const { c_email, c_password } = req.body;
  
      // Query your database to check if the email and password match
      const result = await pool.query('SELECT * FROM customer WHERE c_email = $1 AND c_password = $2', [c_email, c_password]);
  
      if (result.rows.length === 1) {
        res.json({ message: 'Customer Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  // Tailor Registration
app.post("/register/tailor", async (req, res) => {
  try {
    const {
      t_fullname,
      t_email,
      t_password,
      t_location,
      t_experience,
      t_contact,
      t_specialization,
      t_services,
    } = req.body;

    const query = `
      INSERT INTO tailor (
        t_fullname,
        t_email,
        t_password,
        t_location,
        t_experience,
        t_contact,
        t_specialization,
        t_services
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await pool.query(query, [
      t_fullname,
      t_email,
      t_password,
      t_location,
      t_experience,
      t_contact,
      t_specialization,
      t_services,
    ]);

    res.status(201).json({ message: 'Tailor Registration successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Tailor Registration failed' });
  }
});

app.post('/login/tailor', async (req, res) => {
  try {
    const { t_email, t_password } = req.body;

    // Query your database to check if the email and password match
    const result = await pool.query('SELECT * FROM tailor WHERE t_email = $1 AND t_password = $2', [t_email, t_password]);

    if (result.rows.length === 1) {
      res.json({ message: 'Tailor Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});


('/add-event', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      price,
    } = req.body;

    const query = `
      INSERT INTO events (title, description, event_date, event_time, location, price)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [
      title,
      description,
      date,
      time,
      location,
      price,
    ]);

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Event addition failed' });
  }
});

// Fetch boutique owner profile by email
app.get('/profile/boutique-owner/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Query your database to get the boutique owner's profile data based on the email
    const result = await pool.query('SELECT * FROM boutique WHERE b_email = $1', [email]);

    if (result.rows.length === 1) {
      const profileData = result.rows[0];
      res.json(profileData);
    } else {
      res.status(404).json({ message: 'Boutique owner not found' });
    }
  } catch (error) {
    console.error('Error fetching boutique owner profile data:', error);
    res.status(500).json({ message: 'Failed to fetch boutique owner profile data' });
  }
});

app.get('/profile/tailor/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Query your database to get the boutique owner's profile data based on the email
    const result = await pool.query('SELECT * FROM tailor WHERE t_email = $1', [email]);

    if (result.rows.length === 1) {
      const profileData = result.rows[0];
      res.json(profileData);
    } else {
      res.status(404).json({ message: 'tailor not found' });
    }
  } catch (error) {
    console.error('Error fetching tailor profile data:', error);
    res.status(500).json({ message: 'Failed to fetch tailor profile data' });
  }
});

app.get('/profile/customer/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Query your database to get the boutique owner's profile data based on the email
    const result = await pool.query('SELECT * FROM customer WHERE c_email = $1', [email]);

    if (result.rows.length === 1) {
      const profileData = result.rows[0];
      res.json(profileData);
    } else {
      res.status(404).json({ message: 'customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer profile data:', error);
    res.status(500).json({ message: 'Failed to fetch customer profile data' });
  }
});

app.post('/add-event', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      contact,
    } = req.body;

    const query = `
      INSERT INTO events (title, description, date, time, location, contact)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [
      title,
      description,
      date,
      time,
      location,
      contact,
    ]);

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Event addition failed' });
  }
});
app.get('/events', async (req, res) => {
  try {
    const query = 'SELECT * FROM events';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

app.get('/tailors', async (req, res) => {
  try {
    // Query your database to fetch tailor data from the "tailor" table
    const query = 'SELECT * FROM tailor'; // Adjust this query based on your table structure
    const result = await pool.query(query);

    // Respond with the fetched tailor data in JSON format
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tailor data:', error);
    res.status(500).json({ message: 'Failed to fetch tailor data' });
  }
});


app.post("/orders", upload.single("image"), async (req, res) => {
  try {
    const { o_status, o_items, t_id, c_id } = req.body;
    const o_image = req.file ? req.file.buffer : null; // Get image data from request

    const query = `
      INSERT INTO orders (o_status, o_items, o_image, t_id, c_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      o_status,
      o_items,
      o_image,
      t_id,
      c_id,
    ]);

    res.status(201).json({
      message: "Order placed successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Order placement failed" });
  }
});

app.get('/getCustomerId', async (req, res) => {
  try {
    const { email } = req.query;

    // Query your database to get the customer's ID based on the email
    const result = await pool.query('SELECT c_id FROM customer WHERE c_email = $1', [email]);

    if (result.rows.length === 1) {
      const customerId = result.rows[0].c_id;
      res.json({ c_id: customerId });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer ID:', error);
    res.status(500).json({ message: 'Failed to fetch customer ID' });
  }
});

app.get('/orders/by-tailor/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Query your database to get the orders for the tailor based on t_email
    const result = await pool.query('SELECT * FROM orders WHERE t_id = (SELECT t_id FROM tailor WHERE t_email = $1)', [email]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tailor orders:', error);
    res.status(500).json({ message: 'Failed to fetch tailor orders' });
  }
});

// Handle updating order status
app.put('/orders/:orderId/update-status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { o_status } = req.body;

    // Update the order status in the database
    const result = await pool.query(
      'UPDATE orders SET o_status = $1 WHERE o_id = $2 RETURNING o_status',
      [o_status, orderId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json({ updatedStatus: result.rows[0].o_status });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});


// Fetch all orders for a customer by c_email
app.get('/orders/by-customer/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const query = `
      SELECT * FROM orders
      WHERE c_id = (SELECT c_id FROM customer WHERE c_email = $1)
    `;

    const result = await pool.query(query, [email]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching orders by customer:', error);
    res.status(500).json({ message: 'Error fetching orders by customer' });
  }
});

// Track an order by o_id
app.get('/orders/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const query = `
      SELECT o_status FROM orders WHERE o_id = $1
    `;

    const result = await pool.query(query, [orderId]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json({ o_status: result.rows[0].o_status });
    }
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ message: 'Error tracking order' });
  }
});

// Add a new route to handle catalog data upload and retrieval
app.route('/catalog/:email')
  .get(async (req, res) => {
    try {
      const { email } = req.params;

      // Query your database to get the tailor's catalog data based on the email
      const result = await pool.query('SELECT cat_image, cat_desc FROM tailor WHERE t_email = $1', [email]);

      if (result.rows.length === 1) {
        const catalogData = result.rows[0];
        res.json(catalogData);
      } else {
        res.status(404).json({ message: 'Tailor not found' });
      }
    } catch (error) {
      console.error('Error fetching tailor catalog data:', error);
      res.status(500).json({ message: 'Failed to fetch tailor catalog data' });
    }
  })
  .post(upload.single('image'), async (req, res) => {
    try {
      const { email } = req.params;
      const { description } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null; // Get image data from request

      // Update the tailor's catalog data in the database
      const result = await pool.query(
        'UPDATE tailor SET cat_image = $1, cat_desc = $2 WHERE t_email = $3 RETURNING cat_image, cat_desc',
        [imageBuffer, description, email]
      );

      if (result.rows.length === 1) {
        const updatedCatalogData = result.rows[0];
        res.json(updatedCatalogData);
      } else {
        res.status(404).json({ message: 'Tailor not found' });
      }
    } catch (error) {
      console.error('Error updating tailor catalog data:', error);
      res.status(500).json({ message: 'Error updating tailor catalog data' });
    }
  });
  app.get('/feedback/by-customer/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      // Query your database to get feedback by customer email
      const result = await pool.query(
        'SELECT * FROM feedback WHERE customer_id = (SELECT c_id FROM customer WHERE c_email = $1)',
        [email]
      );
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching feedback by customer:', error);
      res.status(500).json({ message: 'Failed to fetch feedback by customer' });
    }
  });
  
  app.post('/feedback', async (req, res) => {
    try {
      const { ratings, comments, order_id, customerEmail } = req.body;
  
      // Retrieve the customer's ID based on the provided customer email
      const customerResult = await pool.query(
        'SELECT c_id FROM customer WHERE c_email = $1',
        [customerEmail]
      );
  
      if (customerResult.rows.length === 0) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
  
      const customer_id = customerResult.rows[0].c_id;
  
      // Verify if the provided order ID belongs to the customer
      const orderResult = await pool.query(
        'SELECT o_id FROM orders WHERE o_id = $1 AND c_id = $2',
        [order_id, customer_id]
      );
  
      if (orderResult.rows.length === 0) {
        res.status(403).json({ message: 'Order does not belong to the customer' });
        return;
      }
  
      // If the order belongs to the customer, proceed to insert feedback
      const query = `
        INSERT INTO feedback (ratings, comments, order_id, customer_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
  
      const result = await pool.query(query, [ratings, comments, order_id, customer_id]);
  
      res.status(201).json({
        message: 'Feedback submitted successfully',
        feedback: result.rows[0],
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ message: 'Failed to submit feedback' });
    }
  });
  
app.listen(4000, () => console.log("server on localhost:4000"));

