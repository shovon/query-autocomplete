export default class Query {
  constructor(id, query) {
    this._id = id;
    this._query = query;
  }

  get query() { return this._query; }
  get id() { return this._id; }
}