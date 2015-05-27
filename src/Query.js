export default class Query {
  constructor(query) {
    this.property = query.property;
    this.comparator = query.comparator;
    this.value = query.value;
  }
}