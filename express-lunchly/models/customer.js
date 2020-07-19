/** Customer for Lunchly */

const db = require("../db");
const moment = require("moment");
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
    this.lastReservation = 
      lastReservation ? 
      lastReservation : 
      {"lastResDate": "", "lastResGuests": "", "lastResNotes": ""};
  }
  
  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT
            c.id, 
            c.first_name "firstName",  
            c.middle_name "middleName",
            c.last_name "lastName", 
            c.phone "phone", 
            c.notes "notes",
            r.start_at "date",
            r.num_guests "guests",
            r.notes "rNotes"
      FROM customers c
      LEFT JOIN (
            SELECT DISTINCT ON (customer_id) *
            FROM reservations r
            ORDER BY customer_id, start_at DESC
      ) r 
      ON r.customer_id = c.id
      ORDER BY c.last_name, c.first_name;`
    );
    
    return results.rows.map(c => {     
      return new Customer(
        { id: c.id, firstName: c.firstName, middleName: c.middleName, lastName: c.lastName, phone: c.phone, notes: c.notes, 
          lastReservation: {
            "lastResDate": c.date ? `${c.date.getFullYear()}${(""+c.date.getMonth()).padStart(2,"0")}${(""+c.date.getDate()).padStart(2,"0")}` : "", 
            "lastResGuests": c.guests ? c.guests : "", 
            "lastResNotes": c.rNotes ? c.rNotes : "" 
          }
        }
      )
    });

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
    console.log(this.lastReservation)
    return this.lastReservation.lastResDate.length ? 
      `${moment(this.lastReservation.lastResDate, "YYYYMMDD").fromNow()}, Guests: ${this.lastReservation.lastResGuests}, Notes: ${this.lastReservation.lastResNotes}` : 
      "";
    // return this.lastReservation.lastResDate
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

  /** return customer search results for most reservations */

  static async bestCustomers(count) {
    const customer = await db.query(

      `SELECT * FROM
      (SELECT
           DISTINCT ON (r.customer_id)
           r.start_at "date",
           r.num_guests "guests",
           r.notes "rNotes",
           r.customer_id "c_id"
         FROM reservations r
         WHERE r.customer_id in (
           SELECT customer_id
           FROM reservations
           GROUP BY customer_id
           ORDER BY COUNT(customer_id)DESC
           LIMIT $1
         )
      ) res
      JOIN
      (SELECT 
        first_name AS "firstName",  
        middle_name AS "middleName",  
        last_name AS "lastName", 
        phone, 
        notes, 
        id
      FROM customers) cust
      ON res.c_id = cust.id`,
      [count]
    );

    if (customer === undefined) {
      const err = new Error(`No customers found`);
      err.status = 404;
      throw err;
    }  
    
    return customer.rows.map(c => {     
      return new Customer(
        { id: c.id, firstName: c.firstName, middleName: c.middleName, lastName: c.lastName, phone: c.phone, notes: c.notes, 
          lastReservation: {
            "lastResDate": c.date ? `${c.date.getFullYear()}${(""+c.date.getMonth()).padStart(2,"0")}${(""+c.date.getDate()).padStart(2,"0")}` : "", 
            "lastResGuests": c.guests ? c.guests : "", 
            "lastResNotes": c.rNotes ? c.rNotes : "" 
          }
        }
      )
    });
  }

  
}

module.exports = Customer;
