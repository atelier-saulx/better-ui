import * as React from "react";
import { Table } from "./";
import { faker } from "@faker-js/faker";

const meta = {
  title: "Components/Table",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

const data = new Array(50).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  avatar: faker.image.avatar(),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  status: faker.lorem.words(1),
}));

export const Default = () => {
  return (
    <div style={{ height: "100svh" }}>
      <Table data={data} />
    </div>
  );
};

// TODO add an example with the ported over useInifniteQuery + real data from based
