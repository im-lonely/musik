export let example;

fetch("./examples/example.json")
  .then((res) => res.json())
  .then((json) => {
    example = json;
  });
