export let defaults;

fetch("./config/defaults.json")
  .then((res) => res.json())
  .then((json) => {
    defaults = json;
  });
