import { verbose } from "sqlite3";

class Database {
	private db = new (verbose().Database)("db.sqlite")

	constructor() {
		if(process.env.DEBUG === "true") {
			this.db.on('trace',  console.log)
		}
	}

	// get one row from database
	async get(sql: string, params?: any[]): Promise<any> {
		return new Promise<any>((resolve) => {
			this.db.get(sql, params, (err, row) => {
				if(err) {
					console.log(err)
					return resolve(undefined)
				} else {
					resolve(row)
				}
			})
		})
	}

	// get some rows from database
	async all(sql: string, params?: any[]): Promise<any[] | undefined> {
		return new Promise<any[] | undefined>((resolve) => {
			this.db.all(sql, params, (err, rows) => {
				if(err) {
					console.log(err)
					return resolve(undefined)
				} else {
					resolve(rows)
				}
			})
		})
	}
}

export default new Database()