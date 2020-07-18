/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, middleName, lastName, phone, notes, lastReservation }) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
    this.lastReservation = lastReservation;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT c.id, 
        first_name "firstName",  
        middle_name "middleName",
        last_name "lastName", 
        phone, 
        c.notes,
        r.start_at "date",
        r.num_guests "guests",
        r.notes "rNotes"
      FROM customers c
      LEFT JOIN
        (SELECT *
        FROM reservations re
        ORDER BY re.start_at
        LIMIT 1) r ON c.id = r.customer_id
      ORDER BY last_name, first_name;`
    );
    return results.rows.map(c => {
      return new Customer(c.id, c.firstName, c.middleName, c.lastName, c.phone, c.notes, 
        {"lastResDate": c.date, "lastResGuests": c.guests, "lastResNotes": c.rNotes })
  } );

  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name "firstName",
         middle_name "middleName",  
         last_name "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }
  /** return customer full name */

  get fullName() {
    return this.middleName ? 
      `${this.firstName} ${this.middleName} ${this.lastName}` : 
      `${this.firstName} ${this.lastName}`;
  }

  /** return customer last reservation */

  get last_Reservation() {
    return this.lastReservation ? 
      `${this.lastReservation.date} ${this.lastReservation.guests} ${this.lastReservation.rNotes}` : 
      "";
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, middle_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
        [this.firstName, this.middleName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, middle_name=$2, last_name=$3, phone=$4, notes=$5
             WHERE id=$6`,
        [this.firstName, this.middleName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }

  /** return customer search results */

  static async findByName(name) {
    
    const customer = await db.query(
      `SELECT id, 
         first_name "firstName",  
         middle_name "middleName",  
         last_name "lastName", 
         phone, 
         notes
       FROM customers
       WHERE first_name ILIKE $1 OR last_name ILIKE $1
       ORDER BY last_name, first_name`,
       [name = `%${name}%`]
    );
    
    if (customer === undefined) {
      const err = new Error(`No such customer: ${name}`);
      err.status = 404;
      throw err;
    }

    return customer.rows.map(c => new Customer(c));
  }

  static async bestCustomers(count) {
    const customer = await db.query(
      `SELECT c.id, 
            first_name AS "firstName",  
            middle_name AS "middleName",  
            last_name AS "lastName", 
            phone, 
            c.notes, count(c.id)
      FROM customers c, reservations r
      WHERE c.id = r.customer_id
      GROUP BY c.id
      ORDER BY COUNT(c.id) DESC, last_name, first_name
      LIMIT $1`,
      [count]
    );

    if (customer === undefined) {
      const err = new Error(`No customers found`);
      err.status = 404;
      throw err;
    }
  
    return customer.rows.map(c => new Customer(c));

  }

  
}

module.exports = Customer;
