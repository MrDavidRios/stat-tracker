export class FilterPrototype {
  name: string;
  valueOptions: string[];

  constructor(name: string, valueOptions: string[]) {
    this.name = name;
    this.valueOptions = valueOptions;
  }
}

export class FilterValue extends FilterPrototype {
  valueIdx: number;

  constructor(proto: FilterPrototype, valueIdx: number) {
    super(proto.name, proto.valueOptions);

    this.valueIdx = valueIdx;
  }
}

export class Entry {
  value: number;
  filters: FilterValue[];

  date: Date;

  constructor(value: number, filters: FilterValue[], date: Date) {
    this.value = value;
    this.filters = filters;

    this.date = date;
  }
}

export class Statistic {
  statName: string;
  entries: Entry[];

  filters: FilterPrototype[];

  constructor(statName: string, entries: Entry[], filters: FilterPrototype[]) {
    this.statName = statName;
    this.entries = entries;
    this.filters = filters;
  }
}
